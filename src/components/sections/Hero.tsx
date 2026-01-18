"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  // Spring animation config like Midlife
  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-background overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/50 pointer-events-none" />

      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Pre-title Badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0 }}
        >
          <span className="badge badge-accent">
            {t("hero.presents")}
          </span>
        </motion.div>

        {/* Main Title - Midlife-style large typography */}
        <motion.h1
          className="text-display-hero text-foreground mb-8 leading-[1.05]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
          <span className="block">Vibe Camp</span>
          <span className="block text-accent">Seoul</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-body-lg text-muted max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
        >
          <motion.button
            onClick={() => {
              document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("hero.applyNow")}
            <span className="text-lg">→</span>
          </motion.button>

          <motion.button
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("hero.learnMore")}
          </motion.button>
        </motion.div>

        {/* Stats Row - Midlife style */}
        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="text-center">
            <p className="text-display-sm text-foreground font-semibold">2</p>
            <p className="text-caption text-muted mt-1">{t("hero.weeks")}</p>
          </div>
          <div className="w-px h-10 bg-border hidden md:block" />
          <div className="text-center">
            <p className="text-display-sm text-foreground font-semibold">~20</p>
            <p className="text-caption text-muted mt-1">{t("hero.founders")}</p>
          </div>
          <div className="w-px h-10 bg-border hidden md:block" />
          <div className="text-center">
            <p className="text-display-sm text-accent font-semibold">$100K</p>
            <p className="text-caption text-muted mt-1">{t("hero.investment")}</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <span className="text-micro tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            {t("hero.scrollToEnter")}
          </span>
          <motion.div
            className="w-6 h-10 border border-border rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1 h-2 bg-muted rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
