import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // iOS safe area support
};

export const metadata: Metadata = {
  title: "Hashed Vibe Labs",
  description: "8-week builder program for AI-native founders in Seoul",
  keywords: [
    "Hashed",
    "Vibe Labs",
    "AI",
    "Startup",
    "Investment",
    "Accelerator",
    "Seoul",
    "Founder",
    "Builder",
  ],
  authors: [{ name: "Hashed" }],
  openGraph: {
    title: "Hashed Vibe Labs",
    description: "8-week builder program for AI-native founders in Seoul",
    type: "website",
    locale: "ko_KR",
    siteName: "Hashed Vibe Labs",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "Hashed Vibe Labs",
      },
    ],
  },
  metadataBase: new URL("https://hashed-vibe-labs.vercel.app"),
  twitter: {
    card: "summary_large_image",
    title: "Hashed Vibe Labs",
    description: "8-week builder program for AI-native founders in Seoul",
    images: ["/og-image.png?v=2"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {/* Pretendard - Korean font */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        {/* JetBrains Mono - Terminal font */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
