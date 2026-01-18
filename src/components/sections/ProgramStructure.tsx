"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function ProgramStructure() {
  const { t } = useI18n();

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  const phases = [
    {
      date: t("timeline.phase1Date"),
      title: t("timeline.phase1Title"),
      desc: t("timeline.phase1Desc"),
      note: t("timeline.phase1Note"),
      number: "01",
    },
    {
      date: t("timeline.phase2Date"),
      title: t("timeline.phase2Title"),
      desc: t("timeline.phase2Desc"),
      note: t("timeline.phase2Note"),
      number: "02",
    },
    {
      date: t("timeline.phase3Date"),
      title: t("timeline.phase3Title"),
      desc: t("timeline.phase3Desc"),
      note: t("timeline.phase3Note"),
      highlight: true,
      number: "03",
    },
    {
      date: t("timeline.phase4Date"),
      title: t("timeline.phase4Title"),
      desc: t("timeline.phase4Desc"),
      note: t("timeline.phase4Note"),
      number: "04",
    },
  ];

  return (
    <section id="timeline" className="section-padding bg-background-dark">
      <div className="container-narrow">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
        >
          <span className="badge mb-4">Timeline</span>
          <h2 className="text-display-sm text-foreground mb-4">{t("timeline.title")}</h2>
          <p className="text-body-lg text-muted">{t("timeline.subtitle")}</p>
        </motion.div>

        {/* Timeline - Vertical design */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-6">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                className={`relative p-8 border rounded-2xl shadow-soft ${
                  phase.highlight
                    ? "border-accent/30 bg-surface"
                    : "border-border bg-surface"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ ...springTransition, delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: phase.highlight ? "0 8px 30px rgba(195, 237, 161, 0.1)" : "0 8px 30px rgba(0, 0, 0, 0.15)" }}
              >
                {/* Number indicator - hidden on mobile */}
                <div className={`absolute -left-4 top-8 w-8 h-8 rounded-full flex items-center justify-center text-micro font-medium hidden md:flex ${
                  phase.highlight ? "bg-accent text-white" : "bg-surface text-muted"
                }`}>
                  {phase.number}
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-6 md:pl-8">
                  {/* Date */}
                  <div className="md:w-32 flex-shrink-0">
                    <span className={`text-mono font-medium ${
                      phase.highlight ? "text-accent" : "text-muted"
                    }`}>
                      {phase.date}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-title text-foreground mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-body text-muted-light mb-3">{phase.desc}</p>
                    <p className="text-caption text-muted bg-surface-light px-3 py-2 rounded-lg inline-block">{phase.note}</p>
                  </div>
                </div>

                {/* Highlight badge */}
                {phase.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-accent">Key Date</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
