import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Fiha 💖",
  description: "A digital love letter from fuad to Fiha 🌸",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cherry-cream">{children}</body>
    </html>
  );
}
