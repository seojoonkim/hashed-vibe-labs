"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-border rounded-full p-1 shadow-soft">
      <button
        onClick={() => setLanguage("ko")}
        className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full ${
          language === "ko" ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        {language === "ko" && (
          <motion.div
            layoutId="langToggle"
            className="absolute inset-0 bg-surface-dark rounded-full"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10">KO</span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full ${
          language === "en" ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        {language === "en" && (
          <motion.div
            layoutId="langToggle"
            className="absolute inset-0 bg-surface-dark rounded-full"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}
