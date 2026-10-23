import { z } from "zod";
import { EraBandSchema, RoleSchema, LinkSchema, SourceSchema, TypeTagSchema } from "./shared";
import { ClueSchema } from "./clue";

export const GuestSchema = z.object({
  slug: z.string(),
  word: z.string(),
  table: z.string(),
  role: RoleSchema,
  route: z.string(), // how it entered English, e.g. "Old English", "Old French"
  firstUse: z.string(), // raw text, e.g. "late Old English", "about 1200"
  eraBand: EraBandSchema,
  recordText: z.string(),
  gossipText: z.string(),
  testimony: z.string(),
  clue: ClueSchema,
  suspect: z.boolean(),
  links: z.array(LinkSchema),
  object: z.string(), // marginalia placeholder description
  // Layer 2 meaning tags. A guest may carry more than one (spec.md shows king as
  // both "grand" and "contested"). Only 6 of 25 guests have a documented
  // assignment anywhere in the docs; left empty for the rest — see BACKLOG.md.
  typeTags: z.array(TypeTagSchema).optional(),
  sources: z.array(SourceSchema).min(1),
  status: z.enum(["checked", "to-check"]),
  notes: z.array(z.string()).optional(), // bracketed editor notes; never rendered as copy
  // Floater record extras (spec.md: "the guest fields plus cameo lines and the
  // tables where they appear"). Present only when role === "floater".
  cameoLines: z.array(z.string()).optional(),
  seenAt: z.array(z.string()).optional(), // table slugs
});
export type Guest = z.infer<typeof GuestSchema>;
