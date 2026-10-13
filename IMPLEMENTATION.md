# Portfolio implementation / review handoff

Local implementation awaiting independent QA. No push or deployment performed.

## Development and regression checks

- `npm ci`, `npm run build`, `npm run typecheck`, `npm run lint`.
- Start `npm run preview -- --host 127.0.0.1 --port 4173`, then `npm run test:portfolio`.
- Tests use Playwright Core and installed Chrome. Override CHROME_PATH, BASE_URL, EVIDENCE_DIR if needed. Coverage: 320/390/1440px in both themes, navigation, focus, hashes, System/persistence, reduced motion, CV byte equality, overflow, skip link and 404 recovery.
- `node scripts/interactive-contrast.mjs` checks menu, hover/focus and gear text contrast.
- Measurement helpers scripts/measure.mjs and scripts/extra-check.mjs expect the original baseline at ../baseline and preview port 4174; audit-only, not CI requirements.
- `npm run social:preview` regenerates the factual typographic social PNG from the local preview. No stock imagery.

## Source and content boundaries

Palette: https://github.com/morhetz/gruvbox/blob/master/colors/gruvbox.vim — Light soft #f2e5bc; Dark hard #1d2021. Readable accents use official faded/bright colors; low-contrast gray comments deliberately excluded from meaningful small text. Source Code Pro assets and SIL license in public/fonts.

Selected work paraphrases existing Teko and UEB–VNU responsibilities. No new metrics, confidential artifacts or independent verification claims. Existing unverified alert-latency figures omitted from public summaries. Product links explicitly provide context only. Older roles/awards and gear retained in native disclosures.

CV is the exact owner-supplied, publicly authorized PDF; SHA-256 b066a3e254f2e5d163cf60b71070193cfdf500fceda52b1a295a99a06a779ed6. No other Downloads files accessed or copied.

Static page-tree inspection found no Query, toast or tooltip consumers; mounted providers removed, not scaffold packages. Production comparison and page regression checks validate the change. Existing Radix theme dropdown and router retained.

Before public handoff: independent review, deploy through existing Pages workflow, then verify live CV returns application/pdf with this hash and social preview returns image/png. Local checks do not establish production delivery or crawler cache state.
