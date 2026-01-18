"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface Command {
  id: string;
  label: string;
  labelKo: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const { language } = useI18n();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasExecutedRef = useRef(false);

  const commands: Command[] = [
    {
      id: "about",
      label: "/about",
      labelKo: "Vibe Camp 소개",
      icon: "📋",
      action: () => onNavigate("about"),
      shortcut: "1",
    },
    {
      id: "who",
      label: "/who",
      labelKo: "지원 대상",
      icon: "🎯",
      action: () => onNavigate("who"),
      shortcut: "2",
    },
    {
      id: "timeline",
      label: "/timeline",
      labelKo: "일정 및 절차",
      icon: "📅",
      action: () => onNavigate("timeline"),
      shortcut: "3",
    },
    {
      id: "hashed",
      label: "/hashed",
      labelKo: "Hashed 소개",
      icon: "💎",
      action: () => onNavigate("hashed"),
      shortcut: "4",
    },
    {
      id: "apply",
      label: "/apply",
      labelKo: "지원하기",
      icon: "🚀",
      action: () => onNavigate("apply"),
      shortcut: "5",
    },
    {
      id: "lang",
      label: "/lang",
      labelKo: "언어 변경",
      icon: "🌐",
      action: () => {
        // Language toggle is handled elsewhere
        onClose();
      },
      shortcut: "L",
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.labelKo.includes(query)
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex] && !hasExecutedRef.current) {
            hasExecutedRef.current = true;
            filteredCommands[selectedIndex].action();
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, filteredCommands, selectedIndex, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      hasExecutedRef.current = false;
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="command-palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            className="command-palette"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
              <span className="terminal-prompt text-lg">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === "ko" ? "명령어 입력..." : "Type a command..."}
                className="command-palette-input !border-0 !p-0"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {/* Command list */}
            <div className="command-list">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-[var(--muted)]">
                  {language === "ko" ? "명령어를 찾을 수 없습니다" : "No commands found"}
                </div>
              ) : (
                filteredCommands.map((cmd, index) => (
                  <motion.div
                    key={cmd.id}
                    className={`command-item ${index === selectedIndex ? "selected" : ""}`}
                    onClick={() => {
                      if (hasExecutedRef.current) return;
                      hasExecutedRef.current = true;
                      cmd.action();
                      onClose();
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <span className="command-item-icon">{cmd.icon}</span>
                    <span className="command-item-label">
                      <span className="terminal-success">{cmd.label}</span>
                      <span className="text-[var(--muted)] ml-3 text-sm">
                        {language === "ko" ? cmd.labelKo : cmd.label.slice(1)}
                      </span>
                    </span>
                    {cmd.shortcut && (
                      <span className="command-item-shortcut">
                        <kbd className="px-2 py-1 bg-[var(--surface-light)] rounded text-xs">
                          {cmd.shortcut}
                        </kbd>
                      </span>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-[var(--border)] text-xs text-[var(--muted)] flex items-center gap-4">
              <span>
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-light)] rounded mr-1">↑↓</kbd>
                {language === "ko" ? "이동" : "navigate"}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-light)] rounded mr-1">↵</kbd>
                {language === "ko" ? "선택" : "select"}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-light)] rounded mr-1">esc</kbd>
                {language === "ko" ? "닫기" : "close"}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
