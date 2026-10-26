import { seedFloat } from "./seed";

export interface Placement {
  left: number;
  top: number;
  rotate: number;
}

export interface RelativeSlot extends Placement {
  // Caps each slot's card+caption column so neighbouring slots never run
  // into each other — the two columns sit close together (see below), so
  // the inner one is narrower on purpose.
  maxWidth: number;
}

export interface CalloutSlot extends Placement {
  // Per-slot cap on the callout box's width, same purpose as RelativeSlot's
  // maxWidth. All four start at 100 (the value .callout's max-width used to
  // hardcode in page.module.css for every slot alike) — see the Bug A note
  // above CALLOUT_SLOTS for why slot 1 needed this in the first place.
  maxWidth: number;
}

// Candidate slots inside the 342x560 relatives zone (phone coordinate space),
// a single column sitting to the right of the current-page self-tag (left:
// 4, top: 220, vertically centered on the left edge — see .currentTag in
// page.module.css, anchor y=236 in CURRENT_TAG_ANCHOR below). Earlier two-
// column layouts put a card almost directly above the self-tag, which forced
// the connector line into a steep upward arc that cut straight through the
// caption sitting in that same column. Keeping every slot at the same x
// (clear of the self-tag, which ends around x=90) and spread down the
// right-hand side instead means each connector line travels mostly
// sideways, not up through a caption.
//
// Row spacing (190px) is sized for the tallest real card+caption+pointer
// group in the data (card ~32px + gap + a 3-line wrapped caption at this
// maxWidth + gap + a 44px pointer link, worst case kindred→gentle: "they
// compare notes on what counts as \"family\"" plus its across-the-room
// pointer, ~176px tall) — a guest with a shorter caption just leaves more
// air between its cards. An earlier version packed a 4th "overflow column"
// slot beside slot index 1 to fit a rare 4-link guest (kriss-kringle); that
// slot's horizontal offset wasn't wide enough to clear slot 1's own
// maxWidth, so the two cards overlapped. Rather than guess at a width that
// works for every future 4-link guest, placeRelative only ever returns one
// of these 3 slots — a 4th+ relative link has no card at all and falls back
// to a plain pointer-style link (see the word page's overflowRelativeLinks),
// the same treatment already used for across-the-room links with no card.
// Exported (not just used internally) so /dev/layout-editor can read the
// real current numbers instead of a hand-copied duplicate that could drift
// out of sync with this file.
export const RELATIVE_SLOTS: RelativeSlot[] = [
  { left: 119.57, top: 395.72, rotate: 3, maxWidth: 2000 }, // lower
  { left: 114.08, top: 86.7, rotate: -2, maxWidth: 170 }, // upper
  { left: 200.95, top: 220.43, rotate: -3, maxWidth: 170 }, // level with self-tag
];

export const RELATIVE_SLOT_COUNT = RELATIVE_SLOTS.length;

export function placeRelative(guestSlug: string, index: number): RelativeSlot {
  const slot = RELATIVE_SLOTS[index % RELATIVE_SLOTS.length];
  const jitter = seedFloat(`${guestSlug}:relative:${index}`);
  return { ...slot, rotate: slot.rotate + (jitter - 0.5) * 2 };
}

// The relatives zone's box is sized to fit each guest's actual card +
// fallback-link count, not a fixed worst-case height for everyone — a guest
// with 1-2 relative links (most of them) would otherwise leave a large dead
// gap below, sized for kriss-kringle's 4-link worst case. 180 is the same
// conservative per-row clearance baked into RELATIVE_SLOTS' 190px spacing
// (card + wrapped caption + an optional pointer link); 14 is the gap before
// the first fallback link, 40 the gap between stacked fallback links.
export function relativeCardsBottom(cardCount: number): number {
  const rows = Math.min(cardCount, RELATIVE_SLOT_COUNT);
  return rows > 0 ? RELATIVE_SLOTS[rows - 1].top + 180 : 0;
}

export function relativeFallbackTop(cardCount: number): number {
  return relativeCardsBottom(cardCount) + 14;
}

export function relativesZoneHeight(cardCount: number, fallbackCount: number): number {
  const cardsBottom = relativeCardsBottom(cardCount);
  const fallbackTop = relativeFallbackTop(cardCount);
  const fallbackBottom = fallbackCount > 0 ? fallbackTop + (fallbackCount - 1) * 40 + 44 : 0;
  return Math.max(cardsBottom, fallbackBottom, 280) + 20;
}

// Candidate slots for the numbered record-fact callouts around the name.
// Slot 1 sits at left:276 (not the mockup's 288): the name zone's own
// coordinate space maps 1:1 to the 390px phone viewport (nameZoneScale
// bleeds to the page edges), so a callout with the .callout maxWidth of
// 100px needs left + 100 <= ~382 to stay clear of the viewport edge. At
// left:288 a short fact fit, but king's facts never exercised a long
// unbreakable word; kriss-kringle's `Christkindlein: "Christ child"` does,
// and it rendered visibly clipped past the edge (caught during rollout
// verification, not in the single-guest prototype).
// Exported for the same reason as RELATIVE_SLOTS above.
export const CALLOUT_SLOTS: CalloutSlot[] = [
  { left: 2, top: 19.5, rotate: 0, maxWidth: 168 },
  { left: 243, top: 26.5, rotate: 0, maxWidth: 100 },
  { left: 218.5, top: 223, rotate: 0, maxWidth: 100 },
  { left: 20, top: 260, rotate: 0, maxWidth: 100 },
];

export function placeCallout(index: number): CalloutSlot {
  return CALLOUT_SLOTS[index % CALLOUT_SLOTS.length];
}

// Decorative stem-line path for each CALLOUT_SLOTS entry, same order, copied
// from docs/mockups/Word.html. Callers must slice this to the guest's actual
// recordFacts.length — unlike the circle callouts (which only render for
// facts that exist), these paths aren't generated per-guest, so a caller
// that doesn't slice will draw a stem to a callout that isn't there.
export const CALLOUT_STEM_PATHS = [
  "M178 104 C177.5 74.5 149.1 54.93 126.28 47.88",
  "M232 100 C228.8 67.72 241.2 52.88 249.65 51.57",
  "M188 170 C166 199.5 199.5 237 216.5 234.5",
  "M162 172 C140 210 90 240 56 262",
];

// The short caliper/bracket mark next to the name, drawn once per page
// (not per callout) inside the same <g> as CALLOUT_STEM_PATHS. Exported so
// /dev/layout-editor can show and edit it alongside the stems it connects to.
export const NAME_BRACKET_PATH = "M72.3 105.68v58M67 107.55h12.43M64.37 163.22h15.97";

// Red crayon squiggle under the gossip paragraph. Fixed shape, same on every
// guest page — position (not shape) comes from .gossipSquiggle in
// page.module.css.
export const GOSSIP_SQUIGGLE_PATH =
  "M14 24 C10 6 90 2 130 10 C152 16 140 42 76 41 C30 40 6 32 16 16";

// The pushpin icon pinning the testimony card, drawn as 4 separate <path>
// strokes (head ellipse, head highlight, shaft, shaft ticks) rather than one
// path, same order as rendered in page.tsx.
export const PUSHPIN_PATHS = [
  "M1 3.4 C1.2 2 11 2 11.2 3.2 C11.4 5 1 5.4 1 3.4",
  "M1.2 4 L1.4 5.6 C3 7 9 7 10.8 5.6 L11 4",
  "M4.8 6.8 L5.6 30.4 L6.2 33 L6.8 30.4 L7.4 6.8",
  "M5.2 12 l2 -1 M5.3 17 l2 -1 M5.4 22 l2 -1",
];

// The paperclip icon on the testimony card.
export const PAPERCLIP_PATH = "M3 9 C3 2 15 1 15 8 C15 13 9.06 11.14 9 19 M9 25 v0.5";

// Red crayon zigzag under the current-page self-tag.
export const CURRENT_TAG_ZIGZAG_PATH =
  "M1 7l5-5 5 5 5-5 5 5 5-5 5 5 5-5 5 5 5-5 5 5";

// Center of the "current page" self-tag in the relatives zone's 342x560
// coordinate space, matching .currentTag in page.module.css (left: 4px,
// top: 220px). Connector lines start here, one per actual relative link —
// never more, so there's no line pointing at nothing.
const CURRENT_TAG_ANCHOR = { x: 37, y: 236 };

export function connectorPath(cardLeft: number, cardTop: number): string {
  const x2 = cardLeft + 40;
  const y2 = cardTop + 16;
  const { x: x1, y: y1 } = CURRENT_TAG_ANCHOR;
  const midX = (x1 + x2) / 2;
  const midY = Math.max(0, Math.min(y1, y2) - 24);
  return `M${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
}

// Organic, hand-drawn-looking border-radius for a callout circle, varied per
// guest + index rather than a single fixed shape for all 25.
export function calloutBorderRadius(guestSlug: string, index: number): string {
  const pct = (tag: string) =>
    Math.round(45 + seedFloat(`${guestSlug}:radius:${index}:${tag}`) * 10);
  return `${pct("a")}% ${pct("b")}% ${pct("c")}% ${pct("d")}%`;
}
