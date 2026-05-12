import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="roman text-xs text-[var(--cool)] mb-4">About</p>
      <h1 className="editorial text-3xl leading-tight tracking-tight mb-6">
        What this is, and what it isn&apos;t.
      </h1>

      <div className="space-y-6 text-[var(--ink)] leading-relaxed">
        <p>
          Closer Sparring is the drill harness for the{" "}
          <a
            href="https://github.com/Moranetz/closer-curriculum"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--warm)] hover:underline"
          >
            Closer Curriculum
          </a>{" "}
          — a behavioral-mechanics curriculum for sales mastery built on a
          pre-registered Bayesian meta-analysis of 35 closing techniques.
        </p>

        <p>
          Each of the fifteen personas in the library is a decomposed buyer
          model: stated criteria, hidden criteria, contraindicated techniques,
          responsive techniques, status posture, persuasion-knowledge level, a
          narrative arc, a hidden curve ball. You pick a buyer. You pre-register
          which Atlas techniques you intend to deploy. You run a conversation.
          The buyer reacts in character. At the end, you receive a scorecard
          against the curriculum&apos;s Stage-4 rubric.
        </p>

        <div className="hairline-b pb-2 mt-10">
          <p className="roman text-xs">What it is</p>
        </div>
        <ul className="space-y-2 text-sm text-[var(--ink-muted)]">
          <li>
            <span className="marginalia mr-2">i.</span>
            A pre-Stage-6 drill harness. Persona-tagged. Atlas-governed.
          </li>
          <li>
            <span className="marginalia mr-2">ii.</span>
            A calibration instrument — your pre-registered intent vs. what
            actually fired in your turns.
          </li>
          <li>
            <span className="marginalia mr-2">iii.</span>
            A folklore-detector — the technique selector marks
            untested-in-database moves explicitly.
          </li>
        </ul>

        <div className="hairline-b pb-2 mt-10">
          <p className="roman text-xs">What it isn&apos;t</p>
        </div>
        <ul className="space-y-2 text-sm text-[var(--ink-muted)]">
          <li>
            <span className="marginalia mr-2">i.</span>
            A substitute for real-deal exposure. Persona simulation has a
            fidelity ceiling — Stage 6 of the curriculum is real outbound, not
            this.
          </li>
          <li>
            <span className="marginalia mr-2">ii.</span>
            A claim about top-decile capability. Drilling improves Layer 4
            (technique), not Layers 5–7.
          </li>
          <li>
            <span className="marginalia mr-2">iii.</span>
            A multi-user product yet. Sessions are local-only in v0.1; nothing
            leaves your browser.
          </li>
        </ul>

        <div className="hairline-b pb-2 mt-10">
          <p className="roman text-xs">Honest limits</p>
        </div>
        <p className="text-sm text-[var(--ink-muted)]">
          The LLM-driven persona is an approximation. Real-world buyers carry
          schedule pressure, embodied affect, organizational politics, and
          history the persona schema cannot fully encode. A persona &quot;softened
          and committed&quot; in this drill does not mean a real buyer would. Use
          this for technique-recognition and delivery calibration, not for
          predicting deal outcomes.
        </p>

        <div className="hairline-b pb-2 mt-10">
          <p className="roman text-xs">Series</p>
        </div>
        <p className="text-sm text-[var(--ink-muted)]">
          Part of the <em className="editorial">Closer Foundation</em> research
          program. Sister artifacts:
        </p>
        <ul className="space-y-1 text-sm text-[var(--ink-muted)]">
          <li>
            ·{" "}
            <a
              href="https://github.com/Moranetz/closing-evidence-atlas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)]"
            >
              closing-evidence-atlas
            </a>{" "}
            — the empirical foundation
          </li>
          <li>
            ·{" "}
            <a
              href="https://github.com/Moranetz/closer-curriculum"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)]"
            >
              closer-curriculum
            </a>{" "}
            — the pedagogy
          </li>
          <li>
            ·{" "}
            <a
              href="https://github.com/Moranetz/sales-instrument"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)]"
            >
              sales-instrument
            </a>{" "}
            — the outcome ledger
          </li>
        </ul>

        <p className="text-xs text-[var(--ink-soft)] mt-12">
          <span className="roman">v0.1</span> · MIT license · Anthropic Claude
          powers the persona simulation and end-of-session scoring.
        </p>

        <div className="pt-6">
          <Link href="/" className="btn btn-ghost">
            ← Persona index
          </Link>
        </div>
      </div>
    </div>
  );
}
