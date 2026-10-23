# Changelog

## Session 01 — 2026-10-23

- Scaffolded Next.js 16.4.3 (App Router, TypeScript strict, no Tailwind) via `create-next-app`, then merged into the existing repo alongside `CLAUDE.md` and `docs/`.
- Removed the `create-next-app` demo content (`page.tsx` boilerplate, demo SVGs, Geist fonts) in favour of a minimal placeholder, since the real pages come later this session.
- Scope change: the session brief originally excluded the reunion hall landing page. Madhura asked to add it mid-session. Revised scope: all 25 guest word pages + 5 table data records + the hall landing page, still excluding table pages, evidence/auto-pinning, verdict, endings, trail card, motion, and analytics (see BACKLOG.md).
- Added Zod schemas for the data model: `src/lib/schemas/shared.ts` (era band, meaning tag, role, link, source enums/objects), `clue.ts` (step / rumour / decoy / colour clue union), `guest.ts`, `table.ts`.
- Transcribed all 25 guest records and all 5 table records from `docs/content.md` into `src/data/guests/*.json` and `src/data/tables/*.json`, verbatim. Bracketed editor drafts (e.g. kindred's gossip, the three step-testimony drafts, the two decoy testimonies) are kept in each guest's `notes` field, not mixed into the copy fields.
- Added `src/lib/data.ts`, the build-time loader: parses every JSON file through its Zod schema and exposes `getGuest`, `getAllGuestSlugs`, `getTable`, `getAllTableSlugs`, `getAllTables`. A malformed field now fails at `npm run build` with a Zod error naming the exact field and allowed values — verified by deliberately corrupting `king.json`'s `eraBand` (see report) and reverting.
- Verified data integrity with a throwaway script (not committed): every guest link's `slug` resolves to a real guest or is explicitly `null`, and every table's `guests` array agrees with each listed guest's own `table` field. No mismatches found.
