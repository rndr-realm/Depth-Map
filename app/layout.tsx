import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AgentationWidget } from "@/components/AgentationWidget";

// Geist throughout — sans for display/body, mono for code.
const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

const TITLE = "React Depth Parallax — WebGL Depth-Map Parallax for React";
const SHORT_TITLE = "React Depth Parallax";
const DESCRIPTION =
  "A lightweight React component that renders real-time WebGL depth-map parallax effects. Drop in an image and its depth map to get smooth, GPU-accelerated 3D parallax driven by the cursor or device gyroscope.";

export const metadata: Metadata = {
  metadataBase: new URL("https://depth.rndrealm.com/"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "https://depth.rndrealm.com/",
    title: TITLE,
    description: DESCRIPTION,
    // Animated GIF — auto-loops on Discord/Slack/Telegram. (No og:video, since
    // that makes Discord show a click-to-play player instead of the live GIF.)
    images: [
      {
        url: "/og.gif",
        width: 1200,
        height: 630,
        type: "image/gif",
        alt: "Animated demo of a depth-map parallax effect — a photo shifts in 3D as the cursor moves, driven by a grayscale depth map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SHORT_TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  alternates: { canonical: "https://depth.rndrealm.com/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "react-depth-parallax",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: "https://depth.rndrealm.com/",
  description: DESCRIPTION,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Organization",
    name: "Rndr Realm",
    url: "https://x.com/rndr_realm",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        {process.env.NODE_ENV === "development" && <AgentationWidget />}
      </body>
    </html>
  );
}
