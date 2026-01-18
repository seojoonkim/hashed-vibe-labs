import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pulsr-inspired dark palette
        background: {
          DEFAULT: "#211f1f",
          dark: "#1c1c1c",
        },
        foreground: "#fffcec",
        primary: {
          DEFAULT: "#fffcec",
          light: "#ffffff",
        },
        accent: {
          DEFAULT: "#c3eda1",
          light: "#d4f2bc",
          dark: "#a8d88a",
        },
        surface: {
          DEFAULT: "#2a2828",
          light: "#353232",
          dark: "#1c1c1c",
        },
        muted: {
          DEFAULT: "#7e7e7e",
          light: "#9e9e9e",
          dark: "#5e5e5e",
        },
        border: {
          DEFAULT: "rgba(195, 237, 161, 0.3)",
          light: "rgba(195, 237, 161, 0.5)",
          dark: "rgba(195, 237, 161, 0.15)",
        }
      },
      fontFamily: {
        sans: ["'SUIT Variable'", "SUIT", "Poppins", "Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ["Poppins", "'SUIT Variable'", "SUIT", "Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "SF Mono", "Menlo", "monospace"],
      },
      fontSize: {
        // Pulsr-style typography
        "display-xl": ["5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "title": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "subtitle": ["1.25rem", { lineHeight: "1.5", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.65" }],
        "caption": ["0.875rem", { lineHeight: "1.6" }],
        "small": ["0.8125rem", { lineHeight: "1.5" }],
        "micro": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up-delay": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(195, 237, 161, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(195, 237, 161, 0.4)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #c3eda1 0%, #e8f7d8 100%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      spacing: {
        "section": "8rem",
        "section-sm": "5rem",
      },
      boxShadow: {
        "soft": "0 4px 20px rgba(0, 0, 0, 0.3)",
        "card": "0 2px 8px rgba(0, 0, 0, 0.2), 0 16px 32px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 4px 16px rgba(195, 237, 161, 0.1), 0 24px 48px rgba(0, 0, 0, 0.4)",
        "glow": "0 0 40px rgba(195, 237, 161, 0.2)",
        "glow-strong": "0 0 60px rgba(195, 237, 161, 0.3)",
        "button": "0 4px 16px rgba(195, 237, 161, 0.25)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
