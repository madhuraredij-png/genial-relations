// Deterministic pseudo-random layout: turns a seed string into a stable
// float in [0,1) so a guest always lays out the same way on every build,
// without hand-authoring coordinates per guest. See CLAUDE.md "Creative and
// conceptual decisions are Madhura's" — this keeps her out of placing 25
// guests' relatives/callouts by hand while still giving each one a
// consistent, varied look.
function seedFloat(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

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

// Candidate slots inside the 342x330 relatives zone (phone coordinate space),
// a single column sitting to the right of the current-page self-tag (left:
// 4, top: 136, vertically centered on the left edge — see .currentTag in
// page.module.css, anchor y=152 in CURRENT_TAG_ANCHOR below). Earlier two-
// column layouts put a card almost directly above the self-tag, which forced
// the connector line into a steep upward arc that cut straight through the
// caption sitting in that same column. Keeping every slot at the same x
// (clear of the self-tag, which ends around x=90) and spread down the
// right-hand side instead means each connector line travels mostly
// sideways, not up through a caption. The two slots nearest the self-tag's
// own vertical center (index 1) get the gentlest line since their y is
// close to the anchor's y=152. A guest's links fill these slots in order;
// each slot's rotation gets +/-1deg of stable jitter so cards don't look
// machine-stamped. Supports up to 4 place-card links — no guest in the data
// has more than that today.
const RELATIVE_SLOTS: RelativeSlot[] = [
  { left: 130, top: 16, rotate: 3, maxWidth: 160 }, // upper
  { left: 130, top: 150, rotate: -2, maxWidth: 160 }, // level with self-tag
  { left: 130, top: 250, rotate: -3, maxWidth: 160 }, // lower
  { left: 250, top: 150, rotate: 2, maxWidth: 85 }, // overflow column, level with self-tag
];

export function placeRelative(guestSlug: string, index: number): RelativeSlot {
  const slot = RELATIVE_SLOTS[index % RELATIVE_SLOTS.length];
  const jitter = seedFloat(`${guestSlug}:relative:${index}`);
  return { ...slot, rotate: slot.rotate + (jitter - 0.5) * 2 };
}

// Candidate slots for the numbered record-fact callouts around the name.
const CALLOUT_SLOTS: Placement[] = [
  { left: 20, top: 30, rotate: 0 },
  { left: 288, top: 46, rotate: 0 },
  { left: 212, top: 222, rotate: 0 },
  { left: 20, top: 260, rotate: 0 },
];

export function placeCallout(index: number): Placement {
  return CALLOUT_SLOTS[index % CALLOUT_SLOTS.length];
}

// Decorative stem-line path for each CALLOUT_SLOTS entry, same order, copied
// from docs/mockups/Word.html. Callers must slice this to the guest's actual
// recordFacts.length — unlike the circle callouts (which only render for
// facts that exist), these paths aren't generated per-guest, so a caller
// that doesn't slice will draw a stem to a callout that isn't there.
export const CALLOUT_STEM_PATHS = [
  "M150 104 C130 80 100 64 74 58",
  "M232 100 C250 80 270 70 290 64",
  "M188 170 C190 200 200 214 214 226",
  "M162 172 C140 210 90 240 56 262",
];

// Center of the "current page" self-tag in the relatives zone's 342x330
// coordinate space, matching .currentTag in page.module.css (left: 4px,
// top: 136px). Connector lines start here, one per actual relative link —
// never more, so there's no line pointing at nothing.
const CURRENT_TAG_ANCHOR = { x: 37, y: 152 };

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
