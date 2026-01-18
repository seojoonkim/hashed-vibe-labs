"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function WhoShouldApply() {
  const { t } = useI18n();

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  const idealItems = [
    t("whoShould.ideal1"),
    t("whoShould.ideal2"),
    t("whoShould.ideal3"),
    t("whoShould.ideal4"),
  ];

  const notIdealItems = [
    t("whoShould.notIdeal1"),
    t("whoShould.notIdeal2"),
    t("whoShould.notIdeal3"),
  ];

  return (
    <section className="section-padding bg-background-dark">
      <div className="container-narrow">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
        >
          <span className="badge badge-accent mb-4">Eligibility</span>
          <h2 className="text-display-sm text-foreground">
            {t("whoShould.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Ideal Applicants */}
          <motion.div
            className="p-8 bg-surface border border-accent/20 rounded-2xl shadow-soft h-fit"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springTransition, delay: 0.1 }}
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(195, 237, 161, 0.1)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent text-lg">✓</span>
              <h3 className="text-title text-foreground">{t("whoShould.idealTitle")}</h3>
            </div>
            <ul className="space-y-4">
              {idealItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 text-body text-muted-dark"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                >
                  <span className="text-accent mt-1 flex-shrink-0">·</span>
                  <span className="leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not Ideal */}
          <motion.div
            className="p-8 bg-surface border border-border rounded-2xl shadow-soft h-fit"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springTransition, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-surface text-muted text-lg">—</span>
              <h3 className="text-title text-muted">{t("whoShould.notIdealTitle")}</h3>
            </div>
            <ul className="space-y-4">
              {notIdealItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 text-body text-muted"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                >
                  <span className="mt-1 flex-shrink-0">·</span>
                  <span className="leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
