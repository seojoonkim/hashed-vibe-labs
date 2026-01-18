"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function WhyNow() {
  const { t } = useI18n();

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        {/* Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
        >
          <span className="badge mb-4">Timing</span>
          <h2 className="text-display-sm text-foreground mb-6">{t("whyNow.title")}</h2>
          <p className="text-body-lg text-muted max-w-xl mx-auto">{t("whyNow.subtitle")}</p>
        </motion.div>

        {/* Past vs Now Comparison - Pulsr card style */}
        <motion.div
          className="grid md:grid-cols-2 gap-5 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
          {/* Past */}
          <motion.div
            className="p-8 bg-surface border border-border rounded-2xl shadow-soft"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-muted" />
              <p className="text-micro text-muted uppercase tracking-widest">{t("whyNow.past")}</p>
            </div>
            <p className="text-body-lg text-muted font-mono line-through opacity-60">{t("whyNow.pastFlow")}</p>
          </motion.div>

          {/* Now */}
          <motion.div
            className="p-8 bg-surface border border-accent/30 rounded-2xl shadow-soft"
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(195, 237, 161, 0.12)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <p className="text-micro text-accent uppercase tracking-widest">{t("whyNow.now")}</p>
            </div>
            <p className="text-body-lg text-foreground font-mono font-medium">{t("whyNow.nowFlow")}</p>
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.2 }}
        >
          <p className="text-body-lg text-muted leading-relaxed">
            {t("whyNow.description")}
          </p>
        </motion.div>

        {/* Key Message - Featured card Pulsr style */}
        <motion.div
          className="relative text-center p-10 md:p-14 bg-accent rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.3 }}
        >
          <div className="relative z-10">
            <p className="text-body-lg text-background/70 mb-4">
              {t("whyNow.keyMessage")}
            </p>
            <p className="text-headline md:text-display-sm text-background font-semibold mb-4">
              {t("whyNow.keyMessageHighlight")}
            </p>
            <p className="text-body text-background/60">
              {t("whyNow.keyMessageEnd")}
            </p>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-accent-light opacity-80" />
        </motion.div>

        {/* Footer Message */}
        <motion.p
          className="text-body-lg text-foreground text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("whyNow.designed")}
        </motion.p>
      </div>
    </section>
  );
}
