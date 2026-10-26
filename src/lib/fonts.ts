import {
  Uncial_Antiqua,
  EB_Garamond,
  IM_Fell_English,
  Bodoni_Moda,
  Fraunces,
  Inconsolata,
  Reenie_Beanie,
} from "next/font/google";
import type { EraBand } from "./schemas/shared";

// Layer 1 era fonts: one family per era band, picked from a guest's first_use.
// See docs/spec.md "Typography system" and CLAUDE.md "Typography".
// Old English was Jacquard 24 through the illustration-prototype session;
// Madhura swapped it for Uncial Antiqua (an insular-majuscule style closer
// to actual Anglo-Saxon manuscript lettering) after reviewing the king
// prototype — see CHANGELOG.md.
export const uncialAntiqua = Uncial_Antiqua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-uncial-antiqua",
  display: "swap",
});

export const ebGaramond = EB_Garamond({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const imFellEnglish = IM_Fell_English({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-im-fell-english",
  display: "swap",
});

export const bodoniModa = Bodoni_Moda({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  display: "swap",
});

export const fraunces = Fraunces({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body faces: Inconsolata for record/body text, Reenie Beanie for the pencil hand.
export const inconsolata = Inconsolata({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
});

export const reenieBeanie = Reenie_Beanie({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-reenie-beanie",
  display: "swap",
});

export const eraFonts = [uncialAntiqua, ebGaramond, imFellEnglish, bodoniModa, fraunces];
export const bodyFonts = [inconsolata, reenieBeanie];

// Era band -> font family, per docs/spec.md "Layer 1: era -> font family"
export const eraFontClassName: Record<EraBand, string> = {
  "old-english": uncialAntiqua.className,
  "1200-1499": ebGaramond.className,
  "1500-1699": imFellEnglish.className,
  "1800-1899": bodoniModa.className,
  "1900-onward": fraunces.className,
};

export const eraFontLabel: Record<EraBand, string> = {
  "old-english": "Uncial Antiqua",
  "1200-1499": "EB Garamond",
  "1500-1699": "IM Fell English",
  "1800-1899": "Bodoni Moda",
  "1900-onward": "Fraunces",
};
