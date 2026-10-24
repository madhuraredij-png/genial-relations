import type { ReactNode } from "react";

// Splits text on recordText's existing *word* convention (verbatim in the data
// files) and renders the marked spans as <em>, without altering the copy.
export function withItalics(text: string): ReactNode[] {
  const parts = text.split(/\*([^*]+)\*/);
  return parts.map((part, i) =>
    i % 2 === 1 ? <em key={i}>{part}</em> : part
  );
}

// Splits recordText into its sentences for pairing with recordFacts captions.
// Verbatim: no wording changes, only a split at existing sentence boundaries.
export function splitSentences(text: string): string[] {
  return text.split(/(?<=\.)\s+/);
}
