import { z } from "zod";

// King's line: 6 numbered steps back to *gene-. See docs/content.md "King's line".
export const StepClueSchema = z.object({
  kind: z.literal("step"),
  stepNumber: z.number().int().min(1).max(6),
  locatedIn: z.enum(["record", "testimony"]),
  summary: z.string(),
});
export type StepClue = z.infer<typeof StepClueSchema>;

// A step that arrives as gossip, confirmed once the named guest's record settles it.
// No separate "confirmed" copy exists in docs/content.md — only the state changes.
export const RumourClueSchema = z.object({
  kind: z.literal("rumour"),
  stepNumber: z.number().int().min(1).max(6),
  isDecoy: z.literal(false),
  summary: z.string(),
  confirmedBy: z.string(), // guest slug whose record settles this rumour
});
export type RumourClue = z.infer<typeof RumourClueSchema>;

// A look-alike rumour outside the 6-step chain. docs/content.md "Decoys" gives the
// debunking text and source verbatim, so both are required here (unlike RumourClue).
export const DecoyClueSchema = z.object({
  kind: z.literal("rumour"),
  isDecoy: z.literal(true),
  summary: z.string(),
  flipText: z.string(),
  flipSourceUrl: z.url(),
});
export type DecoyClue = z.infer<typeof DecoyClueSchema>;

// Testimony exists but pins nothing: checked, and deliberately colour only.
// docs/content.md: Gingerly, Germ, Genie and Kriss Kringle "stay as family colour."
export const ColourClueSchema = z.object({
  kind: z.literal("colour"),
});
export type ColourClue = z.infer<typeof ColourClueSchema>;

export const ClueSchema = z
  .union([StepClueSchema, RumourClueSchema, DecoyClueSchema, ColourClueSchema])
  .nullable();
export type Clue = z.infer<typeof ClueSchema>;
