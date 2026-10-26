import { z } from "zod";

// Layer 1: a guest's era band, computed from first_use. Drives the font family.
// See docs/spec.md "Typography system" and CLAUDE.md "Typography".
export const EraBandSchema = z.enum([
  "old-english",
  "1200-1499",
  "1500-1699",
  "1800-1899",
  "1900-onward",
]);
export type EraBand = z.infer<typeof EraBandSchema>;

// Layer 2: meaning tags (fixed list). Not applied to rendering yet — see BACKLOG.md.
export const TypeTagSchema = z.enum([
  "small",
  "grand",
  "gentle",
  "plain",
  "contested",
  "obsolete",
]);
export type TypeTag = z.infer<typeof TypeTagSchema>;

export const RoleSchema = z.enum(["host", "guest", "floater"]);
export type Role = z.infer<typeof RoleSchema>;

export const LinkTypeSchema = z.enum(["blood", "gossip", "across-the-room"]);
export type LinkType = z.infer<typeof LinkTypeSchema>;

export const LinkSchema = z.object({
  type: LinkTypeSchema,
  label: z.string(),
  slug: z.string().nullable(),
});
export type Link = z.infer<typeof LinkSchema>;

export const SourceSchema = z.object({
  label: z.string(),
  url: z.url(),
});
export type Source = z.infer<typeof SourceSchema>;
