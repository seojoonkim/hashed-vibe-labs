"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { t, language, setLanguage } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: language === "ko" ? "소개" : "About", href: "#about" },
    { label: language === "ko" ? "평가 기준" : "Criteria", href: "#criteria" },
    { label: language === "ko" ? "일정" : "Timeline", href: "#timeline" },
    { label: language === "ko" ? "투자" : "Investment", href: "#investment" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-lg font-semibold text-foreground tracking-tight"
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Hashed<span className="text-accent">.</span>
            </motion.a>

            {/* Desktop Nav - Minimal like Midlife */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-[0.9375rem] text-muted hover:text-foreground transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-500 ease-smooth group-hover:w-full" />
                </motion.button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
              {/* Language Toggle - Minimal */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <button
                  onClick={() => setLanguage("ko")}
                  className={`px-2 py-1 transition-all duration-300 rounded ${
                    language === "ko"
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  KO
                </button>
                <span className="text-border/60">·</span>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-1 transition-all duration-300 rounded ${
                    language === "en"
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Apply Button - Pulsr style */}
              <motion.button
                onClick={() => scrollToSection("#apply")}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-accent text-background text-sm font-medium rounded-lg shadow-button transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("nav.apply")}
                <span className="text-sm">→</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Menu"
              >
                <motion.span
                  className="w-5 h-[1.5px] bg-foreground block origin-center"
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="w-5 h-[1.5px] bg-foreground block"
                  animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-5 h-[1.5px] bg-foreground block origin-center"
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full screen like Midlife */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-full flex flex-col justify-center px-8">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block text-display-sm font-semibold text-foreground py-3 hover:text-accent transition-colors"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <motion.div
                className="mt-16 pt-8 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center gap-6 mb-10">
                  <button
                    onClick={() => setLanguage("ko")}
                    className={`text-lg transition-colors ${
                      language === "ko" ? "text-foreground font-medium" : "text-muted"
                    }`}
                  >
                    한국어
                  </button>
                  <span className="text-border">·</span>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`text-lg transition-colors ${
                      language === "en" ? "text-foreground font-medium" : "text-muted"
                    }`}
                  >
                    English
                  </button>
                </div>

                <motion.button
                  onClick={() => scrollToSection("#apply")}
                  className="w-full py-4 bg-accent text-background text-lg font-medium rounded-lg shadow-button"
                  whileTap={{ scale: 0.98 }}
                >
                  {t("nav.apply")} →
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
