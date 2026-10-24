# CLAUDE.md — Genial Relations

The product is **Genial Relations** (renamed from the working title "Word Birthdays" on 2026-10-23). Use the new name in all UI, metadata, docs and the repo (`genial-relations`). Genial the guest (academics' table) keeps his name; don't confuse the two.

Read this file at the start of every session.

## What this is

A browser-based hypertext mystery set at a family reunion of words. 25 guests descend from one root, \*gene- ("give birth, beget"). Readers visit five tables, follow gossip and family ties from word to word, collect testimony as evidence, and answer one question at the head table: **is King kin?** Every joke rests on a sourced etymology.

Owner: Madhura Redij, a designer learning to build production-quality software. This is her first Claude Code project.

## Source of truth (highest first)

1. Madhura's newest instruction in the session.
2. This file (the locked decisions below override any doc they contradict).
3. Data files in `src/data/` (once created, they are canonical for content).
4. The screen mockups in `docs/mockups/` (exported from Madhura's Screens canvas), for layout and visual style. If one you need is missing, ask her for it.
5. `docs/content.md` (until content is converted to JSON), then `docs/spec.md`, then `docs/prd.md`.

The docs were updated on 2026-10-23 for the decisions below, but they may still lag this file. Where they disagree with this file, this file wins. Flag the disagreement in your report; don't silently pick one.

## Locked decisions

**Stack**
- Next.js (App Router), TypeScript in strict mode.
- Styling: CSS Modules per component + design tokens as CSS custom properties in one global file. No Tailwind, no component libraries.
- Data: JSON files in `src/data/`, validated with Zod at build time. A missing or malformed field fails the build.
- Motion: the Motion library (motion.dev). Must respect `prefers-reduced-motion`.
- Fonts: `next/font` only; open licences only (Google Fonts / OFL).
- Progress: `localStorage` only. No accounts, no database, no backend in v1.
- Hosting: Vercel, deployed from a GitHub repository.
- Analytics: Vercel Web Analytics plus two custom events: `reached_verdict`, `downloaded_trail_card`.
- Allowed dependencies: next, react, react-dom, typescript, zod, motion, @vercel/analytics, and dev tooling Next.js installs by default. Ask before adding anything else.

**Launch scope (4 consecutive build days)**
- P0 from `docs/prd.md` (R1–R8), plus: floater cameos, trail card, typography layers 1–2, motion moments.
- Not in launch: snippet rotation (each table shows a fixed snippet), the invitation feature, typography layer 3, the swapped-place-card gag, the case-study page.
- Phone (390) and desktop (1440) both ship at launch (decided 2026-10-23). Build each screen phone first, then its desktop layout, in the same session. The desktop word page is D3a two-column (Desktop-WordA2 board; decided 2026-10-23).
- Development runs in Claude Code on the web (cloud sessions); Madhura installs nothing locally. She reviews work on Vercel preview URLs, so every pushed branch must build. Take screenshots with whatever headless browser the session already has; don't add one to `package.json` without asking. Work on a branch and open a pull request; Madhura merges to `main` after checking the preview. Never push to `main` directly. Give her click-by-click steps for anything she must do in GitHub or Vercel.
- If day 4 ends with work unfinished, ship what is done and move the rest to `BACKLOG.md`.

**The mystery**
- One suspect: King. The reader traces King's line back to \*gene- step by step, then answers "Is King kin?": Kin, Not kin or Not proven.
- \*gene- is a silent portrait in the hall. Its page (`Portrait`) holds the record only; no one speaks for it.
- Six steps make the case (see "King's line" in `docs/content.md`). Five are found through tables, where the snippet hints at the guest who holds a step. One sits only in a record, with no snippet pointing to it.
- Auto-pinning: opening a guest's page that holds a clue pins it to the evidence row. The reader never chooses what to pin.
- Steps pin on torn paper. Rumours (gossip at the Latin and French tables) pin on lined pencil paper and flip when a record settles them: confirmed, or struck through as "only sounds alike" (decoys).
- The verdict card shows the case file (all pinned clues, in the order found) and the question. The reader reads and answers.
- The record supports Not proven. Endings: 1 (Not proven) then 6 (You). No other endings in v1.
- Gingerly, Germ, Genie and Kriss Kringle are ordinary guests, not suspects.
- The head-table host is **Kindred** (formerly Kin). Never use "Kin" as a guest name.
- Still open (ask, don't decide): unchecked rumours at the verdict, case-file order, what the counter counts and when the verdict unlocks, and whether Gene stays.

**Trail card**
- Generic link preview (one static image for the whole site) + a downloadable trail-card image generated in the browser. No serverless functions.
- It shows the five tables, the reader's route as a red crayon zigzag, the pinned clues, and the verdict stamp. Each scrap shows the step and who held it (e.g. "*cynn* ← \*gene- · puny").

**Typography**
- Layer 1, era bands from `first_use` (a guest's name only):
  - Old English → Uncial Antiqua (changed from Jacquard 24, 2026-10-23: Jacquard 24's cross-stitch/pixel letterforms read as a rendering bug rather than a deliberate style once seen on the king prototype; Uncial Antiqua's insular-majuscule letterforms are closer to actual Anglo-Saxon manuscript lettering)
  - 1200–1499 → EB Garamond (placeholder; may change)
  - 1500–1699 → IM Fell English
  - 1800–1899 → Bodoni Moda
  - 1900 onward → Fraunces
- Layer 2, meaning tags (fixed list): small, grand, gentle, plain, contested, obsolete. Each tag changes at most two properties. Tags never break minimum size or contrast.
- Names on one table vary in size, weight and style within their era font.
- Body text: Inconsolata. Pencil hand (gossip, testimony, table names, notes): Reenie Beanie.

**Visual system** (match the mockups)
- Paper: off-white `#F7F4EE` with a crumpled texture. Text is black `#141414`; pencil text is grey `#6E6E6E` with a grain texture.
- Drawings (tables, objects, fasteners) are navy `#23306E` lines, wobbly and organic.
- Marks are crayon-textured and rotate colours (red `#D23A2A`, green `#2E8B3E`, blue `#2A6FDB`, yellow `#E8B923`, orange `#E8792B`). The shape carries the meaning:
  - zigzag = trail, visited card, the page you're on
  - circle = record fact, numbered callout, chosen verdict
  - wavy underline = gossip, pointer
  - question mark = the suspect (King only)
  - manicule = the snippet points here
- Place cards: folded paper with a back flap and shadow, name only.
- Tables: slightly oval, no chairs, each different in shape, tilt and setting.
- Evidence: torn paper pinned with a pushpin (verdict card), thumbtack (hall, tables) or nail (word pages). Uncollected evidence is a faded scrap.
- Floaters: words on torn paper, scattered at random between tables. Tapping one opens a paper card with their line and a link.
- No explanatory labels such as "Evidence", "Testimony" or "Relatives". The objects and grouping carry the meaning.

**Content**
- 25 guests, head table + 4 tables + 4 floaters (see `docs/content.md`). Ingenious stays at the academics' table.
- Excluded words never appear: genocide, eugenics, miscegenation.
- Marginalia: one object per guest, drawn by Madhura, with an expressive face. No drawn figures or creatures anywhere; the manicule is the one hand allowed. Use dashed `[object · guest]` placeholders until drawings exist.

## Screens

| Screen | Phone (390) | Desktop (1440) |
| --- | --- | --- |
| Reunion hall (landing) | All 5 tables in one screen, invitation and evidence below | Wide room, invitation and evidence below |
| Table page | Table with place cards; snippet stays inside the table | Same, evidence column on the right |
| Word page | Name drawing + meanings, gossip, testimony, relatives, buttons centred | D3a two-column (Desktop-WordA2 board): match the export, buttons centred at the bottom |
| Verdict | King, the case file (steps and rumours), then the question | King and question left, case file right |
| Portrait (\*gene-) | Framed portrait and the root's record | Not drawn yet |
| Endings | Comparison, ending 1, your place card, ending 6 | Two columns |
| Trail card | 600×750 image | Same image |

Desktop pages fit one 1440×900 viewport, except the hall.

## Content rules (non-negotiable)

- Never write, rewrite or "improve" copy: record text, gossip, testimony, snippets, endings, invitation text. Copy comes from the data files or `docs/content.md`, verbatim. If copy is missing or looks wrong, stop and ask.
- Drafted copy awaiting Madhura's review (see the checklist at the top of `docs/content.md`): step testimonies, snippet hints, rumours and decoys, Kindred's record and gossip, Gene's record. Use the drafts verbatim; she will edit them in the data files. Copy with no draft yet (e.g. the portrait's record) stays a bracketed placeholder.
- Never invent a fact: no dates, routes, relatives or meanings that aren't in the data.
- Creative and conceptual decisions are Madhura's. Offer options; don't decide.

## Accessibility and layout

- Phone first: every page must work at 360px wide.
- Every margin object, place card and floater has a text label for screen readers.
- Ink (record), pencil (gossip) and crayon marks are told apart by style and shape as well as colour.
- All motion is skipped or reduced when `prefers-reduced-motion` is set.
- Touch targets are at least 44×44px.

## How to work with Madhura (teaching mode)

- Before each phase, explain in one or two plain sentences what is about to change and why this approach over the obvious alternative.
- Define each technical term the first time it appears, in one line.
- Keep explanations in the chat report, not as long comments in code. Code comments stay short.
- Plan first. If a change touches more than a few files, list them and wait for approval.
- Small commits, one idea each, with clear messages.
- End every session with "What I learned this session": 3–5 bullets, each pointing to the file and line where the concept appears.

## Bugs and fixes

- Find the root cause before proposing a fix. Check documented framework or browser behaviour first.
- No speculative patch cycles: if the first fix fails, stop and report.

## Docs to keep current

- `CHANGELOG.md`: what changed, per session.
- `BACKLOG.md`: anything deferred, with why.
- `BUGS.md`: known issues, with steps to reproduce.
- Update this file when a decision changes, and say so in the report.

## Reporting (every session, last)

- What was done, file by file.
- What was not done, and why.
- How each "works" claim was verified (command, test, screenshot), and what was not verified.
- Assumptions made and any deviation from the prompt.
- Anything that looked wrong but was left alone.
- If you are unsure whether something worked, say so. Do not report success without evidence.
