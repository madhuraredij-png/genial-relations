import type { Metadata } from "next";
import { eraFonts, bodyFonts } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genial Relations",
  description: "A family reunion of words descended from *gene-.",
};

const fontVariables = [...eraFonts, ...bodyFonts]
  .map((font) => font.variable)
  .join(" ");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
