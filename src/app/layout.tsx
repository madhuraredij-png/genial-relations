import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genial Relations",
  description: "A family reunion of words descended from *gene-.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
