"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/hashedofficial", icon: "𝕏" },
    { name: "LinkedIn", url: "https://linkedin.com/company/hashed", icon: "in" },
  ];

  return (
    <footer className="relative py-20 px-6 bg-surface-dark">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Logo & Brand */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Hashed<span className="text-accent">.</span>
            </h3>
            <p className="text-body-sm text-muted">
              {t("footer.tagline")}
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-muted hover:text-accent hover:border-accent transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">{link.icon}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-caption text-muted">
              {t("footer.copyright")}
            </p>
            <p className="text-caption text-muted-dark mt-1">
              Vibe Camp Seoul
            </p>
          </motion.div>
        </div>

        {/* Bottom divider line */}
        <motion.div
          className="mt-16 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-micro text-muted-dark text-center">
            Built with passion for the next generation of founders
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
