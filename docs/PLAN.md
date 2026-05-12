# closer-sparring — Per-Repo Ultraplan (Stub)

> A local-first LLM-driven practice agent with persona library + real-time scoring. The capability multiplier of the Closer Foundation series.

**Status:** Stub plan. Detailed phases blocked on Detector-G2 (scoring engine ready).

Parent: `~/Developer/closer-foundation/SERIES_PLAN.md`. See: `closing-evidence-atlas/PLAN.md`, `close-detector/PLAN.md`.

---

## 0 · Why this is a stub

This project's persona library is calibrated against the Atlas's survivor list (which techniques to drill against) and uses the Detector for real-time scoring of the user's moves. Sparring's Phase 0 starts only after both upstream gates clear.

---

## 1 · Scope target

**In scope:**
- Local-first practice harness (capture, replay, score, coach). No data egress.
- Persona library: 12 buyer archetypes (CFO / CRO / VP-Eng / Founder / Procurement / etc.) calibrated against Atlas survivors and real coded transcripts (where licensable).
- Adaptive difficulty: agent escalates buyer hostility / stalling as user's fidelity score rises.
- Real-time scoring via the Detector model.
- Post-session replay analysis with coached improvement targets.
- Mutual close plan / MEDDIC slot tracking baked in.
- Frontier-model-powered (Claude / GPT) but with prompt-engineered persona-locked behavior.

**Out of scope:**
- Real-time voice / TTS — text-only practice initially.
- Multi-user / cloud sync — strictly local-first.
- Competitive leaderboards or social features.
- Adversarial-buyer red-teaming as a research target.

---

## 2 · Phase outline (sketch)

| Phase | Trigger | Deliverable |
| --- | --- | --- |
| 0 — Persona spec | Detector-G2 done | Persona-library spec with literature citations + Atlas-survivor mapping |
| 1 — Engine build | Phase 0 done | Conversation engine with persona-locking + objection-pattern fidelity |
| 2 — Persona library | Phase 1 done | 12 calibrated buyer personas; fidelity validated against coded transcripts |
| 3 — Scoring integration | Phase 2 done | Real-time Detector-powered MITI/SPIN/MEDDIC scoring per turn |
| 4 — Adaptive difficulty | Phase 3 done | Difficulty curve based on user fidelity; replay analysis |
| 5 — Public release | After Sparring-G2 | Repo public; LinkedIn post #25 |

---

## 3 · Anticipated stack

- TypeScript / Electron OR SwiftUI (Mel's existing iOS toolchain) — TBD at Phase 0
- Local SQLite for session storage
- Encrypted-at-rest with macOS Keychain integration
- Claude API (Mel has key) or GPT API for persona simulation
- Detector model running locally via `transformers` / `mlc-llm` for real-time scoring

Decision deferred to Phase 0: Electron vs. SwiftUI. SwiftUI matches Mel's preferred iOS stack and her thesis (local-first); Electron is faster to demo. Recommendation pending Sparring-G0 design review.

---

## 4 · Dependency graph

- **Persona library calibration** ← Atlas (which techniques to reward) + coded transcripts (which buyer behaviors are realistic).
- **Scoring** ← Detector (real-time tagging of user's deployed techniques).
- **Difficulty curve** ← Detector + Atlas (escalate when user demonstrates Atlas-survivor moves).

---

## 5 · Pre-public-shipping checklist

To be specified at Phase 0 of sparring. Will mirror Atlas's checklist plus product-specific items: privacy policy (what's recorded, what's stored, what's never sent), opt-in consent flow, recordable-conversation hygiene, Apple App Store readiness if going that path.

---

## 6 · Approval gates

- **Sparring-G1** — after persona library: Mel reviews persona fidelity against literature.
- **Sparring-G2** — before public release: Mel does a dogfooding session.
