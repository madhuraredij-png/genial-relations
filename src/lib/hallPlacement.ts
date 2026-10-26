import { seedFloat } from "./seed";

export const HALL_VIEWBOX = { width: 390, height: 770 };

export interface HallTableSlot {
  slug: string;
  center: { x: number; y: number };
  radius: { x: number; y: number };
}

// Fixed layout of the 5 tables on the hall page, positions and sizes
// copied from the ovals drawn in docs/mockups/Main.html -- same approach
// as CALLOUT_SLOTS/RELATIVE_SLOTS in placement.ts. There are always
// exactly these 5 tables, so this is a hand-authored map, not a generated
// one (unlike the per-guest scatter within each oval, below, which does
// need to handle a varying guest count).
export const HALL_TABLE_SLOTS: HallTableSlot[] = [
  { slug: "head-table", center: { x: 193, y: 172 }, radius: { x: 100, y: 64 } },
  { slug: "old-money", center: { x: 99, y: 368 }, radius: { x: 68, y: 46 } },
  { slug: "academics", center: { x: 260, y: 376 }, radius: { x: 48, y: 40 } },
  { slug: "back-with-an-accent", center: { x: 105, y: 589 }, radius: { x: 70, y: 47 } },
  { slug: "kids-table", center: { x: 255, y: 609 }, radius: { x: 44, y: 43 } },
];

export interface FloaterSlot {
  slug: string;
  left: number;
  top: number;
}

// Fixed scatter positions for the 4 floaters, same source as
// HALL_TABLE_SLOTS above -- there are always exactly these 4 floaters
// (CLAUDE.md: "4 floaters"), so this is a lookup, not a generator.
export const FLOATER_SLOTS: FloaterSlot[] = [
  { slug: "genie", left: 58, top: 214 },
  { slug: "germ", left: 300, top: 228 },
  { slug: "gingerly", left: 196, top: 478 },
  { slug: "pregnant", left: 58, top: 728 },
];

export interface NameStyle {
  fontSize: number;
  fontWeight?: number;
  fontStyle?: "italic";
  textTransform?: "uppercase";
  letterSpacing?: string;
}

// CLAUDE.md Typography: "Names on one table vary in size, weight and
// style within their era font." Not tied to typeTags -- most guests don't
// have one assigned yet (see the comment on Guest.typeTags in
// schemas/guest.ts) -- so this is its own small, fixed set of looks,
// picked per-guest by seedFloat so it's stable across builds rather than
// hand-styling 25 names.
const NAME_VARIANTS: NameStyle[] = [
  { fontSize: 16, fontWeight: 600 },
  { fontSize: 13, fontStyle: "italic" },
  { fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em" },
  { fontSize: 12 },
];

export function nameStyleVariant(guestSlug: string): NameStyle {
  const index = Math.floor(seedFloat(`${guestSlug}:hall-style`) * NAME_VARIANTS.length);
  return NAME_VARIANTS[index];
}
