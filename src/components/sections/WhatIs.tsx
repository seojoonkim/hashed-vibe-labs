"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function WhatIs() {
  const { t } = useI18n();

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  return (
    <section id="about" className="section-padding bg-background-dark">
      <div className="container-narrow">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
        >
          <span className="badge badge-accent mb-4">About</span>
          <h2 className="text-display-sm text-foreground">
            {t("whatIs.title")}
          </h2>
        </motion.div>

        {/* Not Accelerator */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
          <p className="text-body-lg text-muted leading-relaxed mb-6">
            {t("whatIs.notAccelerator")}
          </p>
          <p className="text-body-lg text-foreground leading-relaxed">
            {t("whatIs.description")}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="divider my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Observe Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.2 }}
        >
          <p className="text-body-lg text-muted mb-4">
            {t("whatIs.observe")}
          </p>
          <p className="text-headline text-foreground">
            {t("whatIs.observeHighlight")}
          </p>
        </motion.div>

        {/* Comparison Cards - Pulsr style */}
        <motion.div
          className="grid md:grid-cols-2 gap-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.3 }}
        >
          {/* Not This */}
          <motion.div
            className="p-6 bg-surface border border-border rounded-2xl shadow-soft"
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-light text-muted text-sm">✕</span>
              <span className="text-muted line-through text-body-lg">{t("whatIs.notPitchDeck")}</span>
            </div>
          </motion.div>

          {/* Yes This */}
          <motion.div
            className="p-6 bg-surface border border-accent/30 rounded-2xl shadow-soft"
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(195, 237, 161, 0.12)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 text-accent text-sm">✓</span>
              <span className="text-foreground font-medium text-body-lg">{t("whatIs.yesUrl")}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
