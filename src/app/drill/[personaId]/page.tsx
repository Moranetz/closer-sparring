import Link from "next/link";
import { notFound } from "next/navigation";
import { getPersona, TRACK_LABEL } from "@/lib/personas";
import { TECHNIQUES, FOLKLORE_RISK_LABEL, ATLAS_VERDICT_LABEL } from "@/lib/techniques";
import DrillStartForm from "./DrillStartForm";

interface Params {
  params: Promise<{ personaId: string }>;
}

export default async function DrillSetup({ params }: Params) {
  const { personaId } = await params;
  const persona = getPersona(personaId);
  if (!persona) notFound();

  const responsive = persona.likelyResponsiveTechniques
    .map((id) => TECHNIQUES.find((t) => t.id === id))
    .filter(Boolean);

  const contraindicated = persona.contraindicatedTechniques
    .map((id) => TECHNIQUES.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Back nav */}
      <Link
        href="/"
        className="text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] inline-flex items-center gap-2 mb-8"
      >
        ← Persona index
      </Link>

      {/* Persona header */}
      <div className="hairline-b pb-6 mb-8">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="roman text-[var(--cool)] tracking-[0.15em] text-sm">
            Track {persona.track.slice(1)} — {TRACK_LABEL[persona.track]}
          </span>
        </div>
        <h1 className="editorial text-3xl leading-tight tracking-tight mb-3">
          {persona.role}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--ink-muted)]">
          <span>
            <span className="text-[var(--ink-soft)]">Seniority:</span>{" "}
            {persona.seniority}
          </span>
          <span>·</span>
          <span>
            <span className="text-[var(--ink-soft)]">Authority:</span>{" "}
            {persona.buyingAuthority}
          </span>
          <span>·</span>
          <span>
            <span className="text-[var(--ink-soft)]">Threshold:</span>{" "}
            {persona.spendAuthorityThreshold}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 mb-12">
        {/* Persona detail */}
        <div className="space-y-6">
          <div>
            <p className="roman text-xs mb-2">Stated decision criteria</p>
            <p className="text-[var(--ink)] leading-relaxed">
              {persona.decisionCriteriaStated}
            </p>
          </div>

          <div>
            <p className="roman text-xs mb-2">Typical objections</p>
            <ul className="text-sm text-[var(--ink-muted)] space-y-1">
              {persona.typicalObjections.map((o, i) => (
                <li key={i} className="flex gap-2">
                  <span className="marginalia">{romanize(i + 1)}.</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="roman text-xs mb-2">Narrative arc</p>
            <p className="text-sm text-[var(--ink-muted)] leading-relaxed editorial italic">
              {persona.narrativeArc}
            </p>
          </div>

          <p className="marginalia text-xs">
            Hidden criteria + curve ball are not shown — earn them in the drill.
          </p>
        </div>

        {/* Persona-tag rail */}
        <div className="space-y-4 text-xs">
          <div className="card p-4">
            <p className="roman text-[0.65rem] mb-3">State vector</p>
            <Row label="Valence" value={`${persona.valence >= 0 ? "+" : ""}${persona.valence} / -3..+3`} />
            <Row label="Certainty" value={`${persona.certainty} / 5`} />
            <Row label="Agency" value={`${persona.agency} / 5`} />
            <Row label="Persuasion-knowledge" value={persona.persuasionKnowledge} />
            <Row label="Status posture" value={persona.statusPosture} />
            <Row label="Readability" value={persona.readability} />
          </div>

          <div className="card p-4 border-[var(--risk-high)]/30">
            <p className="roman text-[0.65rem] text-[var(--risk-high)] mb-2">
              Contraindicated
            </p>
            <ul className="space-y-1 text-[var(--ink-muted)]">
              {contraindicated.map((t) => (
                <li key={t!.id}>· {t!.name}</li>
              ))}
            </ul>
          </div>

          <div className="card p-4 border-[var(--warm)]/30">
            <p className="roman text-[0.65rem] text-[var(--warm)] mb-2">
              Responsive (when deployed correctly)
            </p>
            <ul className="space-y-1 text-[var(--ink-muted)]">
              {responsive.map((t) => (
                <li key={t!.id}>· {t!.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Drill-setup form (client component) */}
      <DrillStartForm
        personaId={persona.id}
        techniques={TECHNIQUES.map((t) => ({
          id: t.id,
          name: t.name,
          cluster: t.cluster,
          atlasVerdict: t.atlasVerdict,
          folkloreRisk: t.folkloreRisk,
          verdictLabel: ATLAS_VERDICT_LABEL[t.atlasVerdict],
          riskLabel: FOLKLORE_RISK_LABEL[t.folkloreRisk],
        }))}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 hairline-b last:border-b-0">
      <span className="text-[var(--ink-soft)]">{label}</span>
      <span className="text-[var(--ink)]">{value}</span>
    </div>
  );
}

function romanize(n: number): string {
  const r = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
  return r[n - 1] ?? String(n);
}
