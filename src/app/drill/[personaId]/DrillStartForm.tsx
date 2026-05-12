"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSession, newSessionId } from "@/lib/storage";

interface TechniqueLite {
  id: string;
  name: string;
  cluster: string;
  atlasVerdict: string;
  folkloreRisk: string;
  verdictLabel: string;
  riskLabel: string;
}

export default function DrillStartForm({
  personaId,
  techniques,
}: {
  personaId: string;
  techniques: TechniqueLite[];
}) {
  const router = useRouter();
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);

  function toggle(id: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function start() {
    if (busy) return;
    setBusy(true);
    const sessionId = newSessionId();
    saveSession({
      id: sessionId,
      personaId,
      intendedTechniques: Array.from(picked),
      turns: [],
      startedAt: Date.now(),
    });
    router.push(`/drill/${personaId}/session/${sessionId}`);
  }

  // Group by cluster.
  const clusters = Array.from(new Set(techniques.map((t) => t.cluster)));

  return (
    <div className="hairline-t pt-8">
      <p className="roman text-xs mb-1">Pre-register your intent</p>
      <h2 className="editorial text-xl mb-2 tracking-tight">
        Which Atlas techniques do you intend to deploy?
      </h2>
      <p className="text-sm text-[var(--ink-muted)] mb-6 max-w-3xl">
        Pick 1–4. The scorecard compares what you intended against what
        actually fired in your turns. Picking nothing is allowed — it&apos;s
        also a calibration test.
      </p>

      <div className="space-y-6 mb-8">
        {clusters.map((cluster) => (
          <div key={cluster}>
            <p className="roman text-[0.65rem] text-[var(--cool)] mb-3">
              {cluster}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {techniques
                .filter((t) => t.cluster === cluster)
                .map((t) => {
                  const on = picked.has(t.id);
                  const isFolkloreHigh = t.folkloreRisk === "high";
                  const isFailed = t.atlasVerdict === "replication-failed";
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggle(t.id)}
                      className={`text-left p-3 border transition-all rounded-sm ${
                        on
                          ? "border-[var(--warm)] bg-[rgba(232,184,138,0.08)]"
                          : "border-[var(--hairline)] hover:border-[var(--hairline-strong)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-sm leading-snug">{t.name}</span>
                        {on && (
                          <span className="text-[var(--warm)] text-xs">✓</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[0.65rem]">
                        <span
                          className={`${
                            isFailed
                              ? "text-[var(--risk-high)]"
                              : t.atlasVerdict === "well-studied"
                              ? "text-[var(--cool)]"
                              : "text-[var(--ink-soft)]"
                          }`}
                        >
                          {t.verdictLabel}
                        </span>
                        {(isFolkloreHigh || isFailed) && (
                          <span className="text-[var(--risk-high)]">
                            · {t.riskLabel}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--ink-soft)]">
          <span className="roman">№</span> {picked.size} selected
        </p>
        <button onClick={start} disabled={busy} className="btn btn-primary">
          {busy ? "Starting…" : "Start drill →"}
        </button>
      </div>
    </div>
  );
}
