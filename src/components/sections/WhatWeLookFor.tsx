"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function WhatWeLookFor() {
  const { t } = useI18n();

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  const notFocusItems = [t("howEvaluate.notFocus1"), t("howEvaluate.notFocus2")];

  const observeItems = [
    t("howEvaluate.observe1"),
    t("howEvaluate.observe2"),
    t("howEvaluate.observe3"),
    t("howEvaluate.observe4"),
    t("howEvaluate.observe5"),
  ];

  return (
    <section id="criteria" className="section-padding bg-background">
      <div className="container-narrow">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
        >
          <span className="badge badge-accent mb-4">Criteria</span>
          <h2 className="text-display-sm text-foreground">
            {t("howEvaluate.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* What we don't focus on */}
          <motion.div
            className="p-8 bg-surface border border-border rounded-2xl shadow-soft"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springTransition, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-muted" />
              <p className="text-micro text-muted uppercase tracking-widest">{t("howEvaluate.notFocus")}</p>
            </div>
            <ul className="space-y-4">
              {notFocusItems.map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-body text-muted">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-light text-muted-light text-xs flex-shrink-0">✕</span>
                  <span className="line-through opacity-60">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What we observe */}
          <motion.div
            className="p-8 bg-surface border border-accent/20 rounded-2xl shadow-soft"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springTransition, delay: 0.2 }}
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(195, 237, 161, 0.1)" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <p className="text-micro text-accent uppercase tracking-widest">{t("howEvaluate.observe")}</p>
            </div>
            <ul className="space-y-4">
              {observeItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 text-body text-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.06 }}
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 text-accent text-xs flex-shrink-0">✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Core Question - Featured card */}
        <motion.div
          className="relative text-center p-10 md:p-14 bg-accent rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.3 }}
        >
          <div className="relative z-10">
            <p className="text-body text-background/70 mb-4">{t("howEvaluate.coreQuestion")}</p>
            <p className="text-headline md:text-display-sm text-background font-semibold">
              {t("howEvaluate.coreQuestionHighlight")}
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-accent-light opacity-80" />
        </motion.div>
      </div>
    </section>
  );
}
