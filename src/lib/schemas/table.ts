import { z } from "zod";

export const TableSchema = z.object({
  slug: z.string(),
  name: z.string(),
  route: z.string(), // how this table's guests entered English
  event: z.string(), // the table's running scene, from docs/content.md
  guests: z.array(z.string()).min(1), // guest slugs, seating order
  setupLines: z.array(z.string()).min(1), // all variants stored; the page picks none
  pointerLines: z.record(z.string(), z.array(z.string()).min(1)), // guestSlug -> variants
});
export type Table = z.infer<typeof TableSchema>;
