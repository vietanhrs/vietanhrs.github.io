# Ghostty-inspired terminal portfolio

React/Vite portfolio with a semantic, always-expanded transcript. `src/lib/portfolio.ts` preserves the former portfolio records; `src/pages/Index.tsx` owns the terminal layout and a strictly allowlisted client-side jump/theme input. No shell, eval, fetching or remote execution. Default dark; Light and persisted System selection remain available. All typography uses self-hosted Source Code Pro Medium (500).

## Verification

`npm run build`, `npm run typecheck`, `npm run lint`; start `npm run preview -- --host 127.0.0.1 --port 4175`, then `npm run test:portfolio`. Tests use local Chrome and accept BASE_URL / EVIDENCE_DIR. Earlier revision scripts remain historical, not current acceptance gates.

## Assets

Original hand-composed ASCII interpretation of the Rust gear/R, decorative and not an affiliation claim; no external ASCII artwork copied. Source Code Pro files and OFL license retained in public/fonts. Gruvbox Light soft #f2e5bc / Dark hard #1d2021; official semantic hues, with light green darkened to #54620d to meet normal-text contrast. Ghostty screenshot referenced for visual vocabulary only, not embedded or transcribed. Social image generated locally from actual profile DOM with scripts/social-preview.mjs.

CV remains `/Tran_Viet_Anh_CV___Fullstack_Software_Engineer.pdf`, SHA256 `b066a3e254f2e5d163cf60b71070193cfdf500fceda52b1a295a99a06a779ed6`. Existing GitHub Pages workflow unchanged. No publication in the implementation handoff.
