# Backlog

Deferred items, with why.

## From session 01

- **Typography Layer 2 (meaning tags) and Layer 3 (variable axes).** This session renders names in era font only. Tag-driven size/weight/spacing and Fraunces variable axes are not wired up yet. Reason: out of this session's explicit scope.
- **`senses` field on the guest schema.** `spec.md`'s data model calls for a `senses` array (meanings over time, oldest first), which means splitting each guest's prose `recordText` into discrete bullets — an interpretive edit, not a verbatim copy. Madhura chose to defer this (2026-10-23) rather than review 25 splits this session. The schema keeps `senses` optional for when the numbered-callout name treatment is built.
- **Table pages.** The hall's table names (e.g. "Old money") would normally open a table page with the round-table layout, snippet, and place cards. Out of scope this session; table names render as plain text in the hall.
- **Auto-pinning, the evidence row, the verdict card, endings 1 and 6, the trail card.** All explicitly out of scope this session. The step/rumour/colour clue data exists in the schema and guest JSON so a future session can build the pinning mechanic without re-deriving it from `docs/content.md`.
- **Motion (the Motion library).** Not installed or used this session; CLAUDE.md allows it but nothing here needs it yet.
- **Vercel Web Analytics + custom events (`reached_verdict`, `downloaded_trail_card`).** No verdict or trail card exists yet, so there's nothing to track. Add `@vercel/analytics` when those features land.
- **Floater placement logic** ("scattered at random between tables"). Floater guest pages exist, but the hall doesn't yet place them with randomized positioning — out of scope this session (motion/placement polish).
- **Marginalia artwork.** All 25 objects stay as dashed `[object · guest]` placeholders per content.md, pending Madhura's drawings.
- **Layer 2 `typeTags` for 19 of 25 guests.** `spec.md` states "Madhura approves tags," and only 6 guests have a documented tag anywhere in the docs: puny (small), king (grand, contested — the schema allows more than one, since king is the one documented example with two), gentle/genteel (gentle), naive/kind (plain). The schema field (`guest.ts`) is `typeTags: z.array(TypeTagSchema).optional()` so it can be populated guest-by-guest once Madhura assigns the rest; left absent for the other 19 rather than guessed.
- **`senses` field, still deferred** (see above) — now that all 25 guests have JSON records, the 25 `recordText` → `senses` splits are ready to do in one pass whenever Madhura wants to review them.
