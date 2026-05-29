# TASKS.md — Evolution Round 1

## Status Legend
- [ ] Todo
- [/] In Progress
- [x] Completed

## Evolution Tasks

### 1. Architecture (T01)
- [x] **T01-ARCH: Context Separation**
    - [x] Move audio logic to a separate utility.
    - [x] Refine state persistence logic to avoid redundant saves.
    - [x] Add explicit types for all state transitions.

### 2. UI/UX & Transitions (T02-T03)
- [x] **T02-UX: Cinematic Transitions**
    - [x] Add CSS animations for the "Era Portal" in `App.tsx`.
    - [x] Implement a smoother fade-in for the `NarrativeEngine`.
- [x] **T03-UI: Vibrant Glassmorphism**
    - [x] Update modal styles in `NarrativeEngine.tsx` with intensified blurs and prism-like borders.
    - [x] Standardize the "Vibe" across `CitadelDashboard` and `NexusInterface`.

### 3. AI & Content (T04)
- [x] **T04-AI: Prompt Engineering**
    - [x] Refine the image generation prompt in `NarrativeEngine.tsx` for higher "AAA" quality.
    - [x] Add style keywords (e.g., "Unreal Engine 5 render style", "hyper-realistic textures").

## Integration Tasks
- [x] **T05-INT: Final Round Verification**
    - [x] Verify persistence with new state logic.
    - [x] Check performance on transition animations.

---

## Evolution Round 2 (Current)

### 1. Audio & Immersion (T06)
- [x] **T06-AUDIO: Procedural Music**
    - [x] Create `musicUtils.ts` with WebAudio oscillators.
    - [x] Implement `AmbienceManager` in `App.tsx` for era-specific loops.

### 2. Specialized UI Modules (T07)
- [x] **T07-UI: Citadel & Nexus Overhaul**
    - [x] Apply `glass-vibrant` to `CitadelDashboard.tsx`.
    - [x] Refactor `NexusInterface.tsx` with prism-style sliders and boards.

### 3. Social Information Flow (T08)
- [x] **T08-ECHO: Multiplayer Insights**
    - [x] Integrate "Simulation Echoes" component into `NarrativeEngine.tsx`.
    - [x] Add subtle tooltip animations for choice stats.

---

## Integration Tasks
- [x] **T09-FIN: Global Evolution Synthesis**
    - [x] Finalize walkthrough.md with Round 2 achievements.
    - [x] Update BRAIN.md with new features.
