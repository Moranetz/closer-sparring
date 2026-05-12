"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, saveSession } from "@/lib/storage";
import type { Session, SessionTurn } from "@/lib/types";

interface Props {
  sessionId: string;
  personaId: string;
  personaRole: string;
  personaTrack: string;
  personaTrackLabel: string;
  techniqueIndex: Record<string, { name: string; cluster: string }>;
}

export default function SessionClient({
  sessionId,
  personaId,
  personaRole,
  personaTrack,
  personaTrackLabel,
  techniqueIndex,
}: Props) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [endingSession, setEndingSession] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = getSession(sessionId);
    if (!s) {
      setError("Session not found in local storage. Start a new drill.");
      return;
    }
    setSession(s);
  }, [sessionId]);

  // Auto-scroll on new turn.
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [session?.turns.length, busy]);

  async function send() {
    if (!session || !input.trim() || busy) return;
    const operatorText = input.trim();
    setInput("");
    setBusy(true);
    setError(null);

    const operatorTurn: SessionTurn = {
      role: "operator",
      text: operatorText,
      timestamp: Date.now(),
    };
    const nextSession = {
      ...session,
      turns: [...session.turns, operatorTurn],
    };
    setSession(nextSession);
    saveSession(nextSession);

    try {
      const res = await fetch("/api/persona-turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId,
          conversationHistory: session.turns,
          operatorTurn: operatorText,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Persona API failed (${res.status})`);
      }
      const data = await res.json();
      const personaTurn: SessionTurn = {
        role: "persona",
        text: data.text,
        timestamp: Date.now(),
      };
      const afterPersona = {
        ...nextSession,
        turns: [...nextSession.turns, personaTurn],
      };
      setSession(afterPersona);
      saveSession(afterPersona);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
    } finally {
      setBusy(false);
    }
  }

  async function endSession() {
    if (!session || endingSession) return;
    setEndingSession(true);
    setError(null);
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId,
          intendedTechniques: session.intendedTechniques,
          turns: session.turns,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Scoring API failed (${res.status})`);
      }
      const data = await res.json();
      const ended: Session = {
        ...session,
        endedAt: Date.now(),
        scorecard: data.scorecard,
      };
      saveSession(ended);
      router.push(`/drill/${personaId}/session/${sessionId}/review`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      setEndingSession(false);
    }
  }

  if (error && !session) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="editorial text-2xl mb-4">{error}</p>
        <Link href="/" className="btn btn-ghost">
          ← Back to persona index
        </Link>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-[var(--ink-muted)]">
        Loading session…
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Session header */}
      <div className="hairline-b pb-4 mb-6 flex items-baseline justify-between gap-4">
        <div>
          <p className="roman text-[var(--cool)] text-xs mb-1">
            Track {personaTrack.slice(1)} — {personaTrackLabel}
          </p>
          <h1 className="editorial text-2xl leading-tight tracking-tight">
            {personaRole}
          </h1>
        </div>
        <div className="text-xs text-[var(--ink-soft)] text-right">
          <p className="mb-1">
            <span className="roman">№</span> {session.turns.length} turns
          </p>
          {session.intendedTechniques.length > 0 && (
            <p>
              Intent:{" "}
              {session.intendedTechniques
                .map((id) => techniqueIndex[id]?.name ?? id)
                .join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Chat transcript */}
      <div
        ref={scrollerRef}
        className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto scroll-smooth-y pr-2"
      >
        {session.turns.length === 0 && (
          <p className="text-[var(--ink-soft)] text-sm py-12 text-center max-w-md mx-auto">
            <span className="marginalia">§</span> Open the conversation. The
            persona will respond in character per its narrative arc.
          </p>
        )}
        {session.turns.map((turn, i) => (
          <div
            key={i}
            className={`flex ${
              turn.role === "operator" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[78%] px-4 py-3 rounded-sm ${
                turn.role === "operator" ? "bubble-operator" : "bubble-persona"
              }`}
            >
              <p className="text-[0.65rem] text-[var(--ink-soft)] mb-1 uppercase tracking-wider">
                {turn.role === "operator" ? "Operator (you)" : "Buyer"}
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {turn.text}
              </p>
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex justify-start">
            <div className="bubble-persona max-w-[78%] px-4 py-3 rounded-sm text-sm text-[var(--ink-soft)] italic">
              <span className="marginalia">Buyer is thinking…</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-[var(--risk-high)] mb-4">{error}</p>
      )}

      {/* Input + actions */}
      <div className="hairline-t pt-4 space-y-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Your turn — open, ask, label, summarize, anchor, close…"
          rows={3}
          disabled={busy || endingSession}
          className="w-full p-3 text-sm rounded-sm resize-none"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-[var(--ink-soft)]">
            <span className="marginalia">⌘+Enter</span> to send
          </p>
          <div className="flex gap-2">
            <button
              onClick={endSession}
              disabled={busy || endingSession || session.turns.length < 2}
              className="btn btn-ghost"
            >
              {endingSession ? "Scoring…" : "End + score session"}
            </button>
            <button
              onClick={send}
              disabled={busy || endingSession || !input.trim()}
              className="btn btn-primary"
            >
              {busy ? "Sending…" : "Send →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
