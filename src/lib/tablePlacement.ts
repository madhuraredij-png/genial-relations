import { seedFloat } from "./seed";

// The table drawing (outline + two accent arcs), copied verbatim from the
// only table export that exists, docs/mockups/Table.html, in its own
// 390-wide phone coordinate space -- same approach as NAME_BRACKET_PATH in
// placement.ts. CLAUDE.md asks for every table to differ in shape and tilt,
// but only one table was ever drawn as a mockup, so every table reuses this
// one shape and gets its own procedural tilt (tableTilt below) rather than
// a second hand-drawn oval invented to fill the gap. If Madhura draws more
// table shapes later, swap this for a per-table lookup the same way
// CALLOUT_STEM_PATHS is keyed by slot.
export const TABLE_OUTLINE_PATH =
  "M16 226 C14 132 98 60 196 62 C294 64 376 132 375 222 C374 314 294 390 194 389 C94 388 18 330 18 218";
export const TABLE_NEAR_EDGE_PATH =
  "M20 262 C42 342 112 404 196 406 C280 407 352 356 372 266";
export const TABLE_HIGHLIGHT_PATH = "M24 232 C22 144 104 80 196 80";

export const TABLE_VIEWBOX = { width: 390, height: 420 };

// Center and radii of the oval traced by TABLE_OUTLINE_PATH above, used to
// distribute place cards around its edge.
const CENTER = { x: 196, y: 225 };
// x is pulled in from the drawn oval's own 178 half-width: a card can wrap
// to 2 lines (see .placeCard in page.module.css, max-width 94px, so a
// half-width of ~47px) but still needs enough margin from the 390-wide
// canvas's edges that it doesn't clip at a 360px viewport (CLAUDE.md: every
// page must work at 360px wide) -- caught via kindergarten/wunderkind, the
// longest guest names at this table. 104 keeps both the leftmost card
// (center 92, left edge ~45) and the rightmost (center 300, right edge
// ~347) inside a 360px viewport with margin to spare.
const RADIUS = { x: 104, y: 163 };

export interface CardPlacement {
  left: number;
  top: number;
  rotate: number;
}

// A few degrees of stable per-table rotation, so tables don't all sit at
// the same angle on the page -- the "tilt" CLAUDE.md asks for, without
// inventing a new shape per table (see TABLE_OUTLINE_PATH above).
export function tableTilt(tableSlug: string): number {
  return (seedFloat(`${tableSlug}:tilt`) - 0.5) * 8; // +/-4deg
}

// Distributes `count` cards evenly around an oval's edge, starting at the
// top and going clockwise -- the circular counterpart to RELATIVE_SLOTS in
// placement.ts, which uses a fixed set of named slots instead because a
// word page's relatives column always has the same shape. A table's guest
// count varies (3-5 in the current data), so this computes slot positions
// instead of hand-authoring one array per count. Takes an explicit
// center/radius so both the full-size table page (placeAroundTable below)
// and the hall page's small table clusters (hallPlacement.ts) can share
// the same math instead of duplicating it.
export function placeOnOval(
  seedKey: string,
  index: number,
  count: number,
  center: { x: number; y: number },
  radius: { x: number; y: number }
): CardPlacement {
  const angle = -90 + (360 / count) * index;
  const rad = (angle * Math.PI) / 180;
  const left = center.x + radius.x * Math.cos(rad);
  const top = center.y + radius.y * Math.sin(rad);
  const jitter = seedFloat(`${seedKey}:card:${index}`);
  const rotate = (jitter - 0.5) * 10; // +/-5deg, same scale as placeRelative's jitter
  return { left, top, rotate };
}

export function placeAroundTable(
  tableSlug: string,
  index: number,
  count: number
): CardPlacement {
  return placeOnOval(tableSlug, index, count, CENTER, RADIUS);
}
