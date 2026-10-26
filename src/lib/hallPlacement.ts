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

// Desktop has its own hand-drawn arrangement in Desktop-Main.html -- not a
// scaled-up version of the phone one (same as Desktop-Table.html vs
// Table.html). A naive CSS `transform: scale()` of the phone layout was
// tried first and looked wrong: the phone map is a single narrow column of
// stacked ovals, so scaling it just makes a narrow column sit in the
// middle of a wide screen, instead of spreading across it the way the
// mockup actually does. These numbers are the oval centers/radii measured
// directly from Desktop-Main.html's own SVG paths.
export const DESKTOP_VIEWBOX = { width: 1440, height: 900 };

export const HALL_TABLE_SLOTS_DESKTOP: HallTableSlot[] = [
  { slug: "head-table", center: { x: 714, y: 254 }, radius: { x: 246, y: 122 } },
  { slug: "old-money", center: { x: 270.5, y: 530 }, radius: { x: 173.5, y: 102 } },
  { slug: "academics", center: { x: 1172, y: 497 }, radius: { x: 164, y: 92 } },
  { slug: "back-with-an-accent", center: { x: 497, y: 765 }, radius: { x: 181, y: 85 } },
  { slug: "kids-table", center: { x: 1012, y: 767 }, radius: { x: 160, y: 79 } },
];

export const FLOATER_SLOTS_DESKTOP: FloaterSlot[] = [
  { slug: "genie", left: 110, top: 120 },
  { slug: "germ", left: 1170, top: 150 },
  { slug: "gingerly", left: 690, top: 470 },
  { slug: "pregnant", left: 60, top: 770 },
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

// Same per-guest variant tier as nameStyleVariant (same seed, same index),
// just at the larger font sizes Desktop-Main.html actually uses (measured
// ~1.45x the phone ones) -- a guest that reads "bold and biggest" on phone
// reads that way on desktop too, not a different random look per
// breakpoint.
const NAME_VARIANTS_DESKTOP: NameStyle[] = [
  { fontSize: 23, fontWeight: 600 },
  { fontSize: 19, fontStyle: "italic" },
  { fontSize: 15, textTransform: "uppercase", letterSpacing: "0.12em" },
  { fontSize: 17 },
];

export function nameStyleVariantDesktop(guestSlug: string): NameStyle {
  const index = Math.floor(seedFloat(`${guestSlug}:hall-style`) * NAME_VARIANTS_DESKTOP.length);
  return NAME_VARIANTS_DESKTOP[index];
}
