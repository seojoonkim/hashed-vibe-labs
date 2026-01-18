"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function WhyHashed() {
  const { t } = useI18n();

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  const provides = [
    {
      title: t("whyHashed.provide1Title"),
      items: [
        t("whyHashed.provide1Desc1"),
        t("whyHashed.provide1Desc2"),
      ],
      icon: "01",
    },
    {
      title: t("whyHashed.provide2Title"),
      items: [
        t("whyHashed.provide2Desc1"),
        t("whyHashed.provide2Desc2"),
      ],
      icon: "02",
    },
    {
      title: t("whyHashed.provide3Title"),
      items: [
        t("whyHashed.provide3Desc1"),
        t("whyHashed.provide3Desc2"),
        t("whyHashed.provide3Desc3"),
      ],
      icon: "03",
    },
    {
      title: t("whyHashed.provide4Title"),
      items: [
        t("whyHashed.provide4Desc1"),
        t("whyHashed.provide4Desc2"),
        t("whyHashed.provide4Desc3"),
      ],
      icon: "04",
    },
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
          <span className="badge mb-4">Partner</span>
          <h2 className="text-display-sm text-foreground mb-8">
            {t("whyHashed.title")}
          </h2>
        </motion.div>

        {/* Intro */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
          <p className="text-body-lg text-muted leading-relaxed mb-6">
            {t("whyHashed.intro")}
          </p>
          <p className="text-body-lg text-foreground leading-relaxed">
            {t("whyHashed.approach")}
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

        {/* What Hashed Provides */}
        <div className="mb-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springTransition, delay: 0.2 }}
          >
            <h3 className="text-headline text-foreground mb-3">
              {t("whyHashed.providesTitle")}
            </h3>
            <p className="text-body text-muted max-w-lg mx-auto">
              {t("whyHashed.providesIntro")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {provides.map((item, index) => (
              <motion.div
                key={item.title}
                className="p-8 bg-surface border border-border rounded-2xl shadow-soft hover:shadow-card transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ ...springTransition, delay: 0.1 + index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                {/* Number badge */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 text-accent text-micro font-medium">
                    {item.icon}
                  </span>
                  <h4 className="text-title text-foreground">
                    {item.title}
                  </h4>
                </div>

                {/* Items */}
                <ul className="space-y-3">
                  {item.items.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-body-sm text-muted-light">
                      <span className="text-accent mt-1 flex-shrink-0">·</span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Note */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-caption text-muted bg-surface-light px-4 py-2 rounded-lg inline-block">
            {t("whyHashed.note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
