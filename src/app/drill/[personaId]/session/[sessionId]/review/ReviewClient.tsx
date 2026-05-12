"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "@/lib/storage";
import type { Session } from "@/lib/types";

interface Props {
  sessionId: string;
  personaId: string;
  personaRole: string;
  personaTrack: string;
  personaTrackLabel: string;
  personaCriteriaHidden: string;
  personaHiddenCurveBall: string;
  contraindicated: string[];
  responsive: string[];
  techniqueIndex: Record<string, string>;
}

export default function ReviewClient({
  sessionId,
  personaId,
  personaRole,
  personaTrack,
  personaTrackLabel,
  personaCriteriaHidden,
  personaHiddenCurveBall,
  contraindicated,
  responsive,
  techniqueIndex,
}: Props) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(getSession(sessionId) ?? null);
  }, [sessionId]);

  if (!session) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-[var(--ink-muted)]">
        Loading session…
      </div>
    );
  }

  if (!session.scorecard) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="editorial text-2xl mb-4">No scorecard on this session.</p>
        <Link href={`/drill/${personaId}/session/${sessionId}`} className="btn btn-ghost">
          ← Back to drill
        </Link>
      </div>
    );
  }

  const sc = session.scorecard;
  const techName = (id: string) => techniqueIndex[id] ?? id;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="hairline-b pb-6 mb-8">
        <p className="roman text-xs text-[var(--cool)] mb-2">
          Track {personaTrack.slice(1)} — {personaTrackLabel} · Scorecard
        </p>
        <h1 className="editorial text-3xl leading-tight tracking-tight mb-2">
          {personaRole}
        </h1>
        <p className="marginalia text-xs">
          Stage-4 drill rubric · LLM-graded · 1-rater, inter-rater κ untested
        </p>
      </div>

      {/* Composite + 3 dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-10">
        <Score label="Composite" value={sc.composite} max={10} accent="warm" />
        <Score label="Delivery" value={sc.deliveryCleanness} max={10} />
        <Score label="Recognition" value={sc.recognitionCorrectness} max={10} />
        <Score label="Persona-match" value={sc.personaResponseMatch} max={10} />
      </div>

      {/* Diagnostic notes */}
      <Section title="Reviewer notes">
        <p className="text-sm text-[var(--ink)] leading-relaxed editorial italic">
          {sc.notes}
        </p>
      </Section>

      {/* Technique grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Section title="Observed deployed">
          {sc.techniquesObservedDeployed.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)] italic">
              No Atlas techniques tagged in transcript.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {sc.techniquesObservedDeployed.map((id) => (
                <li key={id} className="text-[var(--ink)]">
                  <span className="text-[var(--ink-soft)] mr-2">·</span>
                  {techName(id)}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Intended, not deployed">
          {sc.techniquesIntendedNotDeployed.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)] italic">
              Every intended technique fired.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {sc.techniquesIntendedNotDeployed.map((id) => (
                <li key={id} className="text-[var(--ink-muted)]">
                  <span className="text-[var(--ink-soft)] mr-2">·</span>
                  {techName(id)}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Unintentional deployments">
          {sc.techniquesUnintentionalDeployed.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)] italic">
              No drift — what fired was intended.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {sc.techniquesUnintentionalDeployed.map((id) => (
                <li key={id} className="text-[var(--warm)]">
                  <span className="text-[var(--ink-soft)] mr-2">·</span>
                  {techName(id)}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Contraindicated deployments" tone="risk">
          {sc.contraindicatedDeployed.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)] italic">
              No contraindicated technique fired against this persona.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {sc.contraindicatedDeployed.map((id) => (
                <li key={id} className="text-[var(--risk-high)]">
                  <span className="mr-2">!</span>
                  {techName(id)}
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      {/* Failure-mode flags */}
      {sc.failureModesFlagged.length > 0 && (
        <Section title="Failure modes flagged">
          <ul className="space-y-1.5 text-sm text-[var(--ink-muted)]">
            {sc.failureModesFlagged.map((m, i) => (
              <li key={i}>
                <span className="marginalia mr-2">{i + 1}.</span>
                {m}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Hidden criteria reveal */}
      <div className="hairline-t pt-6 mt-10">
        <p className="roman text-xs mb-3 text-[var(--cool)]">
          The buyer&apos;s hidden cards
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-[var(--ink-soft)] mb-1">
              What actually decided their buy
            </p>
            <p className="text-sm text-[var(--ink)] editorial italic">
              {personaCriteriaHidden}
            </p>
            <p
              className={`text-xs mt-2 ${
                sc.personaHiddenCriteriaSurfaced
                  ? "text-[var(--warm)]"
                  : "text-[var(--ink-soft)]"
              }`}
            >
              <span className="roman">§</span>{" "}
              {sc.personaHiddenCriteriaSurfaced
                ? "You surfaced this in the drill."
                : "Not surfaced. Earn it via elicitation next time."}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--ink-soft)] mb-1">Hidden curve ball</p>
            <p className="text-sm text-[var(--ink-muted)]">
              {personaHiddenCurveBall}
            </p>
          </div>
        </div>
      </div>

      {/* Reference rail — contraindicated/responsive */}
      <div className="hairline-t pt-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div>
          <p className="roman mb-2 text-[var(--risk-high)]">
            Contraindicated against this persona
          </p>
          <ul className="text-[var(--ink-muted)] space-y-0.5">
            {contraindicated.map((id) => (
              <li key={id}>· {techName(id)}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="roman mb-2 text-[var(--warm)]">
            Responsive — when deployed correctly
          </p>
          <ul className="text-[var(--ink-muted)] space-y-0.5">
            {responsive.map((id) => (
              <li key={id}>· {techName(id)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="hairline-t pt-6 mt-10 flex flex-wrap gap-3">
        <Link href={`/drill/${personaId}`} className="btn btn-ghost">
          Drill this persona again
        </Link>
        <Link href="/" className="btn btn-ghost">
          ← All personas
        </Link>
      </div>
    </div>
  );
}

function Score({
  label,
  value,
  max,
  accent,
}: {
  label: string;
  value: number;
  max: number;
  accent?: "warm";
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="card p-4">
      <p className="roman text-[0.65rem] mb-2 text-[var(--ink-soft)]">{label}</p>
      <p
        className={`editorial text-3xl tracking-tight ${
          accent === "warm" ? "text-[var(--warm)]" : "text-[var(--ink)]"
        }`}
      >
        {value.toFixed(1)}
        <span className="text-[var(--ink-soft)] text-sm ml-1">/ {max}</span>
      </p>
      <div className="mt-3 h-[2px] bg-[var(--hairline)]">
        <div
          className={accent === "warm" ? "bg-[var(--warm)]" : "bg-[var(--cool)]"}
          style={{ width: `${pct}%`, height: "100%" }}
        />
      </div>
    </div>
  );
}

function Section({
  title,
  tone,
  children,
}: {
  title: string;
  tone?: "risk";
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p
        className={`roman text-[0.7rem] mb-3 ${
          tone === "risk" ? "text-[var(--risk-high)]" : "text-[var(--ink-soft)]"
        }`}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
