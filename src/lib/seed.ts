// Deterministic pseudo-random layout: turns a seed string into a stable
// float in [0,1) so a page always lays out the same way on every build,
// without hand-authoring coordinates per guest/table. See CLAUDE.md
// "Creative and conceptual decisions are Madhura's" -- this keeps her out
// of placing things by hand while still giving each one a consistent,
// varied look. Shared by placement.ts (callouts, relative cards) and
// tablePlacement.ts (table tilt, place-card jitter).
export function seedFloat(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}
