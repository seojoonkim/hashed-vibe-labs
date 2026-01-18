"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function InvestmentStructure() {
  const { t } = useI18n();

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  const stats = [
    {
      value: t("investment.teams"),
      label: t("investment.teamsLabel"),
      desc: t("investment.teamsDesc"),
    },
    {
      value: t("investment.amount"),
      label: t("investment.amountLabel"),
      desc: t("investment.amountDesc"),
      highlight: true,
    },
    {
      value: t("investment.type"),
      label: t("investment.typeLabel"),
      desc: t("investment.typeDesc"),
    },
  ];

  return (
    <section id="investment" className="section-padding bg-background">
      <div className="container-narrow">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
        >
          <span className="badge badge-accent mb-4">Investment</span>
          <h2 className="text-display-sm text-foreground mb-4">{t("investment.title")}</h2>
          <p className="text-body-lg text-muted">{t("investment.keyMessage")}</p>
        </motion.div>

        {/* Stats Grid - Pulsr style cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`relative p-8 rounded-2xl text-center ${
                stat.highlight
                  ? "bg-surface border-2 border-accent shadow-card"
                  : "bg-surface border border-border shadow-soft"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...springTransition, delay: index * 0.1 }}
              whileHover={{ y: -6, boxShadow: stat.highlight ? "0 16px 40px rgba(195, 237, 161, 0.15)" : "0 16px 40px rgba(0, 0, 0, 0.2)" }}
            >
              {/* Highlight indicator */}
              {stat.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-accent text-micro">Featured</span>
                </div>
              )}

              {/* Value */}
              <div className={`text-display mb-4 ${
                stat.highlight ? "text-accent" : "text-foreground"
              }`}>
                {stat.value}
              </div>

              {/* Label */}
              <p className="text-micro text-muted uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-body-sm text-muted">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Message - Featured banner */}
        <motion.div
          className="relative p-10 bg-accent rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.3 }}
        >
          <div className="relative z-10 text-center">
            <p className="text-body-lg text-background leading-relaxed max-w-2xl mx-auto font-medium">
              {t("investment.footer")}
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-accent-light opacity-80" />
        </motion.div>
      </div>
    </section>
  );
}
