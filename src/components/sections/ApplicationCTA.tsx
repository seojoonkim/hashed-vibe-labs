"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PROGRAM_DATA } from "@/lib/constants";

export default function ApplicationCTA() {
  const { t } = useI18n();

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  return (
    <section id="apply" className="section-padding bg-background">
      <div className="container-narrow max-w-2xl">
        <motion.div
          className="relative p-10 md:p-14 bg-surface border border-border rounded-3xl shadow-card overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
        >
          {/* Background gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />

          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <motion.span
              className="badge badge-accent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springTransition, delay: 0.1 }}
            >
              Apply Now
            </motion.span>
            <motion.h2
              className="text-display-sm text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springTransition, delay: 0.15 }}
            >
              {t("apply.title")}
            </motion.h2>
            <motion.p
              className="text-body-lg text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              {t("apply.targetDesc")}
            </motion.p>
          </div>

          {/* Deadline - Featured card */}
          <motion.div
            className="text-center mb-12 p-8 bg-accent rounded-2xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.25 }}
          >
            <p className="text-caption text-background/70 mb-3">{t("apply.deadline")}</p>
            <p className="text-headline md:text-display-sm text-background font-semibold">{t("apply.deadlineDate")}</p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="divider my-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Submission Items */}
          <motion.div
            className="mb-10 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.3 }}
          >
            <p className="text-micro text-muted mb-5 text-center uppercase tracking-widest">{t("apply.submission")}</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 p-4 bg-surface-light rounded-xl">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 text-accent text-xs flex-shrink-0">1</span>
                <span className="text-body text-muted-light">{t("apply.submission1")}</span>
              </li>
              <li className="flex items-start gap-4 p-4 bg-surface-light rounded-xl">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 text-accent text-xs flex-shrink-0">2</span>
                <span className="text-body text-muted-light">{t("apply.submission2")}</span>
              </li>
            </ul>
          </motion.div>

          {/* No Long Essays */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.35 }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-accent/10 border border-accent/20 rounded-full">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent text-background text-xs">✓</span>
              <span className="text-body-sm text-foreground">{t("apply.noEssay")}</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.4 }}
          >
            <motion.button
              onClick={() => window.open(PROGRAM_DATA.applyUrl, "_blank")}
              className="group inline-flex items-center gap-3 px-12 py-5 bg-accent text-background font-semibold text-lg rounded-lg shadow-button hover:shadow-lg transition-all uppercase tracking-wide"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("apply.applyButton")}
              <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
