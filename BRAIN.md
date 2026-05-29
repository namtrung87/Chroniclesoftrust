# BRAIN.md — The Chronicles of Trust

## Project Overview
An educational ethical adventure game where players traverse history as a "Temporal Archivist" to restore the balance of human society through ethical decision-making.

## Core Mechanics
- **Timeline Progression**: 6+ Historical Eras (10,000 BCE to 2150 CE).
- **Ethical Frameworks**: Scenarios based on Virtue Ethics, Utilitarianism, Deontology, etc.
- **Balance System**: Managing Ecological (ECO), Social (SOC), and Environmental (ENV) resources.
- **Collection**: Recovering "Ethical Shards" (Principles).
- **AI Visuals**: Dynamic generation of era-specific backgrounds and character scenes using Gemini.

## Tech Stack
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Lucide Icons + Vibrant Glassmorphism (SOTA)
- **AI**: @google/genai (Gemini 3 Flash/Pro)
- **Audio**: Procedural Ambient Engine (musicUtils.ts)
- **State**: React Context API
- **Storage**: LocalStorage (`ethical_archivist_v2_storage`)

## Business Rules Hardcoded
1. **Decision Impact**: Every choice has a defined `statImpact` and potentially a `reward` (shard).
2. **Progression**: Levels are sequential (0 to 7).
3. **Storage**: Game state must persist across sessions.
4. **AI Fallback**: If API quota is exhausted, the app must show fallback visuals or indicate status.

## Current Status
- State: Evolution Round 2 complete. Vibe Auto-Heal Protocol executed successfully. System harmony restored with standardized glassmorphism and integrated procedural audio feedback (SOTA 2026).
