# ARCHITECTURE.md — The Chronicles of Trust

## System Overview
A client-side React SPA focused on narrative immersion and state-driven progression.

## Component Map
- `App.tsx`: Root container, layout orchestration, global backgrounds.
- `GameContext.tsx`: Central state machine using `useState` and `useCallback`.
- `NarrativeEngine.tsx`: The "Heart" of the game. Processes scenarios, handles AI visual generation, and manages the decision/feedback loop.
- `Sidebar.tsx`: Persistent navigation and player status display.
- `constants.tsx`: Static data registry for scenarios, assets, and icons.

## Data Flow
1. **Init**: `App` loads → `GameProvider` restores state from `LocalStorage`.
2. **Level Loading**: `NarrativeEngine` detects `currentLevel` change → Triggers AI image generation → Shows "Neural Link" loading screen.
3. **Decision**: Player clicks choice → `NarrativeEngine` updates `Balance` and `History` in `GameContext` → Shows Feedback Modal.
4. **Progression**: Player clicks "Next Era" → `GameContext` increments `currentLevel` → Loop repeats.

## AI Integration Strategy
- **Client-Side Generation**: Uses `VITE_AI_API_KEY` for direct browser-to-Gemini communication.
- **Model**: `gemini-3-flash-preview` for rapid visual synthesizing.
- **Output**: Base64 encoded images displayed via data URLs.

## Key State (types.ts)
- `Balance`: { eco: number, soc: number, env: number }
- `GameState`: { currentLevel, balance, collectedShards, history, isGlitching }
