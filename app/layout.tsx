import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AgentationWidget } from "@/components/AgentationWidget";

// Geist throughout — sans for display/body, mono for code.
const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "react-depth-parallax — depth that follows your cursor",
  description:
    "A lightweight, WebGL-powered depth-map parallax effect for React. One shared GPU context, zero dependencies beyond React.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <AgentationWidget />}
      </body>
    </html>
  );
}
