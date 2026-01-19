import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Hashed Vibe Labs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1a1a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "monospace",
          padding: "60px",
        }}
      >
        {/* #HASHED */}
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: "bold",
            color: "#e07a5f",
            letterSpacing: "0.1em",
            marginBottom: "10px",
          }}
        >
          #HASHED
        </div>

        {/* VIBE LABS */}
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: "bold",
            color: "#e07a5f",
            letterSpacing: "0.1em",
            marginBottom: "40px",
          }}
        >
          VIBE LABS
        </div>

        {/* 1st Batch 2026: Seoul Edition */}
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#e07a5f",
            marginBottom: "30px",
            opacity: 0.9,
          }}
        >
          — 1st Batch 2026: Seoul Edition —
        </div>

        {/* Taglines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "20px",
            color: "#b8b8b8",
            lineHeight: 1.6,
          }}
        >
          <span>We look at speed, not ideas.</span>
          <span>We look at output, not explanations.</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
