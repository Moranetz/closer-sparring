import Link from "next/link";
import { PERSONAS, TRACK_LABEL, TRACK_DESCRIPTION } from "@/lib/personas";
import type { Track } from "@/lib/types";

const TRACKS: Track[] = ["T1", "T2", "T3", "T4", "T5"];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero — hard premise opening per voice doctrine */}
      <section className="max-w-3xl mb-16">
        <p className="roman text-[0.7rem] tracking-[0.2em] mb-5">
          A drill harness
        </p>
        <h1 className="editorial text-4xl sm:text-5xl leading-[1.1] mb-6 tracking-tight">
          Drill the moves you intend.{" "}
          <span className="text-[var(--ink-soft)]">
            Find out which ones survived contact with the buyer.
          </span>
        </h1>
        <p className="text-[var(--ink-muted)] text-base leading-relaxed mb-3">
          Pick one of fifteen schema-tagged buyers. Pick the Atlas technique you
          intend to deploy. Run the conversation. The buyer reacts in character
          to the moves they&apos;re constructed to be guarded against or responsive
          to. End-of-session, you get a scorecard against the curriculum&apos;s
          Stage-4 rubric — delivery, recognition, persona-response-match,
          contraindicated-deployments, hidden-criteria-surfaced.
        </p>
        <p className="text-[var(--ink-soft)] text-sm">
          <span className="roman">§</span>{" "}
          LLM-driven personas are approximations. Real-world transfer is
          Stage&nbsp;6 work, not Stage&nbsp;4.
        </p>
      </section>

      {/* Tracks — five primary-track sections */}
      <section className="space-y-12">
        {TRACKS.map((track) => {
          const inTrack = PERSONAS.filter((p) => p.track === track);
          return (
            <div key={track}>
              <div className="hairline-b pb-3 mb-6 flex items-baseline gap-4">
                <span className="roman text-[var(--cool)] tracking-[0.15em]">
                  Track {track.slice(1)}
                </span>
                <h2 className="editorial text-2xl tracking-tight">
                  {TRACK_LABEL[track]}
                </h2>
                <span className="marginalia hidden md:inline ml-auto text-right text-xs max-w-md">
                  {TRACK_DESCRIPTION[track]}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {inTrack.map((persona, idx) => (
                  <Link
                    key={persona.id}
                    href={`/drill/${persona.id}`}
                    className="card card-hover p-5 transition-colors block"
                  >
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="roman text-[0.65rem] text-[var(--ink-soft)]">
                        {romanize(idx + 1)}
                      </span>
                      <span className="pill text-[var(--warm)] border-[var(--warm)]">
                        {persona.persuasionKnowledge}
                      </span>
                    </div>
                    <h3 className="editorial text-lg leading-tight mb-2 tracking-tight">
                      {persona.role}
                    </h3>
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed mb-4">
                      <span className="text-[var(--ink-soft)]">Stated:</span>{" "}
                      {persona.decisionCriteriaStated}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-[var(--ink-soft)]">
                        valence{" "}
                        <span className="text-[var(--ink)]">
                          {persona.valence >= 0 ? "+" : ""}
                          {persona.valence}
                        </span>
                      </span>
                      <span className="text-[var(--ink-soft)]">·</span>
                      <span className="text-[var(--ink-soft)]">
                        readability{" "}
                        <span className="text-[var(--ink)]">
                          {persona.readability}
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function romanize(n: number): string {
  return ["i", "ii", "iii", "iv", "v"][n - 1] ?? String(n);
}
