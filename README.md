# Closer Sparring

> Drill harness for the [Closer Curriculum](https://github.com/Moranetz/closer-curriculum). Fifteen schema-tagged buyer personas. Atlas-governed technique inventory. End-of-session scorecard against the curriculum's Stage-4 rubric. Local-only sessions. Part of the Closer Foundation.

**Status:** v0.1 pre-release. Persona simulation is LLM-driven (Claude); fidelity is approximate.

---

## What it does

1. Pick one of 15 buyer personas across the five primary tracks (Enterprise / Founder-led / Transactional / Negotiator / Research-operator).
2. Pre-register which Atlas techniques you intend to deploy.
3. Run a live conversation against the persona. The persona reacts in character — it gets guarded against contraindicated techniques and softens to responsive techniques.
4. End the session. Claude scores you against the Stage-4 rubric — delivery cleanness × recognition correctness × persona-response match.
5. The persona's hidden criteria and curve ball are revealed.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Anthropic Claude (`claude-opus-4-5`) — persona simulation + scoring
- localStorage persistence (sessions never leave your browser)
- Vercel-ready

## Run locally

```bash
cp .env.example .env.local        # add your ANTHROPIC_API_KEY
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

```bash
vercel
# Set ANTHROPIC_API_KEY in Project Settings → Environment Variables
```

## How the persona schema works

Each persona is a decomposed buyer model — see `src/lib/personas.ts`. Fields:

- `decisionCriteriaStated` / `decisionCriteriaHidden` — what they say vs. what actually decides
- `contraindicatedTechniques` — Atlas techniques that backfire against this persona
- `likelyResponsiveTechniques` — Atlas techniques that work when deployed correctly
- `persuasionKnowledge` — how well the persona detects technique density
- `narrativeArc` — how a 30-min discovery typically moves with this persona
- `hiddenCurveBall` — the surprise the operator should be prepared for

Personas are the **single source of truth** mirrored from `closer-curriculum/curriculum/personas/PERSONAS.md`. Updating one means updating both.

## How scoring works

End-of-session scoring sends the full transcript + persona schema + your pre-registered intent to Claude, which returns a structured `Scorecard`:

- `deliveryCleanness` (0-10) — execution quality
- `recognitionCorrectness` (0-10) — right move at right moment
- `personaResponseMatch` (0-10) — did the persona actually move
- `composite` = product / 100
- `techniquesObservedDeployed` — Atlas-IDs Claude tagged in your transcript
- `techniquesIntendedNotDeployed` — what you said you'd do but didn't
- `techniquesUnintentionalDeployed` — what fired that you didn't pre-register
- `contraindicatedDeployed` — red flag (techniques the persona is constructed against)
- `personaHiddenCriteriaSurfaced` — did you earn the hidden criterion through elicitation
- `failureModesFlagged` — L1-L7 failure modes from the curriculum

## Honest limits

- **LLM-driven persona ≠ real buyer.** Schedule pressure, embodied affect, organizational politics, history — none of it survives the schema. A persona "committing" in this drill does not mean a real buyer would.
- **Single-grader scoring.** Claude scores; inter-rater κ untested.
- **Stage 4, not Stage 6.** This is technique-delivery practice. Real-deal exposure (Stage 6 of the curriculum) is what actually validates transfer.
- **Local-only persistence.** Sessions don't survive browser data wipes. No auth in v0.1.

## License

MIT — see `LICENSE`.

## Series

Part of the **Closer Foundation** research program.

- [`closing-evidence-atlas`](https://github.com/Moranetz/closing-evidence-atlas) — Bayesian meta-analysis of 35 closing techniques.
- [`closer-curriculum`](https://github.com/Moranetz/closer-curriculum) — the pedagogy this drills against.
- [`sales-instrument`](https://github.com/Moranetz/sales-instrument) — pre-registered outreach A/B test; outcome-ledger reference architecture.
- [`close-detector`](https://github.com/Moranetz/close-detector) — transcript technique tagger (stub).

## Stub-era docs

Original Phase-0 stub plan in [`docs/`](docs/).
