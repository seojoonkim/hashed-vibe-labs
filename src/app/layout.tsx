import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // iOS safe area support
};

export const metadata: Metadata = {
  title: "Hashed Vibe Camp | AI-Native Founder Early Selection System",
  description:
    "AI-native 파운더를 매우 이른 단계에서 식별하고, 확신이 서는 팀에 직접 투자하는 조기 선발 시스템",
  keywords: [
    "Hashed",
    "Vibe Camp",
    "AI",
    "Startup",
    "Investment",
    "Accelerator",
    "Seoul",
    "Founder",
  ],
  authors: [{ name: "Hashed" }],
  openGraph: {
    title: "Hashed Vibe Camp | AI-Native Founder Early Selection System",
    description:
      "AI-native 파운더를 매우 이른 단계에서 식별하고, 확신이 서는 팀에 직접 투자하는 조기 선발 시스템",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hashed Vibe Camp",
    description: "AI-Native Founder Early Selection System",
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
