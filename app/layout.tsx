import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AgentationWidget } from "@/components/AgentationWidget";

// Geist throughout — sans for display/body, mono for code.
const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

const TITLE = "react-depth-parallax — depth that follows your cursor";
const DESCRIPTION = "WebGL depth-map parallax for React.";

export const metadata: Metadata = {
  metadataBase: new URL("https://depth-demo-indol.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "https://depth-demo-indol.vercel.app",
    title: TITLE,
    description: DESCRIPTION,
    // Animated GIF — auto-loops on Discord/Slack/Telegram. (No og:video, since
    // that makes Discord show a click-to-play player instead of the live GIF.)
    images: [
      { url: "/og.gif", width: 1200, height: 630, type: "image/gif", alt: TITLE },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    // static PNG — most reliable still on X
    images: ["/og.png"],
  },
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
