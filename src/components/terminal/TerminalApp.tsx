"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import type { TerminalLine } from "@/types/terminal";
import { HASHED_ASCII, VIBELABS_ASCII, BATCH_SUBTITLE } from "@/data/asciiArt";
import {
  ANIMATION_SPEED, HERO_STEP_DELAY, ASCII_LINE_DELAY,
  SECTION_ORDER, MENU_COMMANDS, LOADING_MESSAGES, FOUNDER_EMAIL,
} from "@/data/terminalConfig";
import { useCountdown } from "@/hooks/useCountdown";
import { getSectionContent } from "@/data/sectionContent";
import { TerminalLineComponent } from "./TerminalLine";
import { LoadingSpinner, ThinkingIndicator } from "./LoadingSpinner";
import ApplyForm from "./ApplyForm";
import CheckSubmission from "./CheckSubmission";

export default function TerminalApp() {
  const { language, setLanguage } = useI18n();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(1); // Start at 1 since hero is [0]
  const [showHero, setShowHero] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroStep, setHeroStep] = useState(0); // For sequential hero animation
  const [asciiLineIndex, setAsciiLineIndex] = useState(0); // For line-by-line ASCII animation
  const [taglineIndex, setTaglineIndex] = useState(0); // For line-by-line tagline animation
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1); // Track current section (-1 = hero)
  const [loadingState, setLoadingState] = useState<{ isLoading: boolean; sectionId: string; messageIndex: number } | null>(null);
  const [isThinking, setIsThinking] = useState(false); // "Thinking..." indicator before loading
  const [heroLoadingStep, setHeroLoadingStep] = useState(0); // 0: not started, 1: thinking, 2: loading messages, 3: done
  const [commandInput, setCommandInput] = useState(""); // For /submit command input in apply section
  const [isApplyMode, setIsApplyMode] = useState(false); // Apply form mode
  const [isCheckMode, setIsCheckMode] = useState(false); // Check submission mode
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);
  const heroAnimatedRef = useRef(false);
  const isTypingRef = useRef(false); // Ref for immediate typing state check
  const abortRef = useRef(false); // Ref for aborting current output
  const countdown = useCountdown();

  const isKo = language === "ko";

  const generateId = () => lineIdRef.current++;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Auto-scroll when lines change - ensures DOM is updated before scrolling
  const prevLinesLengthRef = useRef(0);
  useEffect(() => {
    // Only scroll when lines are added (not removed)
    if (lines.length > prevLinesLengthRef.current) {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTo({
          top: terminalBodyRef.current.scrollHeight,
          behavior: "instant"
        });
      }
    }
    prevLinesLengthRef.current = lines.length;
  }, [lines.length]);

  // Manual scroll helper for non-line-addition scrolls (loading states, etc.)
  const scrollToBottom = useCallback(() => {
    // Use requestAnimationFrame to ensure DOM has updated before scrolling
    requestAnimationFrame(() => {
      if (terminalBodyRef.current) {
        // On mobile, scroll to a position slightly above the bottom so loading appears higher
        const offset = isMobile ? 80 : 0;
        terminalBodyRef.current.scrollTo({
          top: terminalBodyRef.current.scrollHeight - offset,
          behavior: "instant"
        });
      }
    });
  }, [isMobile]);

  // Add lines with typing effect
  const addLines = useCallback(async (newLines: Omit<TerminalLine, "id">[], delay = ANIMATION_SPEED) => {
    isTypingRef.current = true;
    setIsTyping(true);
    for (let i = 0; i < newLines.length; i++) {
      // Check if aborted - just stop, don't reset abortRef (let caller handle it)
      if (abortRef.current) {
        isTypingRef.current = false;
        setIsTyping(false);
        return;
      }

      const line = newLines[i];
      const lineId = generateId();

      // Add line with typing cursor, remove cursor from all previous lines
      // Auto-scroll is handled by useEffect watching lines.length
      setLines(prev => [
        ...prev.map(l => ({ ...l, isTyping: false })),
        { ...line, id: lineId, isTyping: true }
      ]);

      await new Promise(resolve => setTimeout(resolve, delay));

      // Check abort again after delay
      if (abortRef.current) {
        // Remove typing cursor before exiting
        setLines(prev => prev.map(l => l.id === lineId ? { ...l, isTyping: false } : l));
        isTypingRef.current = false;
        setIsTyping(false);
        return;
      }
    }
    // Remove cursor from the last line when done
    setLines(prev => prev.map(l => ({ ...l, isTyping: false })));
    // Auto-scroll is handled by useEffect, no manual scroll needed
    isTypingRef.current = false;
    setIsTyping(false);
  }, [scrollToBottom]);

  // Reset terminal to initial state
  const resetTerminal = useCallback(() => {
    setIsMenuOpen(false);
    setLines([]);
    setShowHero(true);
    setHeroStep(0);
    setHeroLoadingStep(0);
    setAsciiLineIndex(0);
    setTaglineIndex(0);
    setCurrentSectionIndex(-1);
    heroAnimatedRef.current = false;
    lineIdRef.current = 0;
  }, []);

  // Handle responsive - reset terminal when switching to mobile
  const prevIsMobileRef = useRef<boolean | null>(null);
  useEffect(() => {
    const checkMobile = () => {
      const nowMobile = window.innerWidth < 768;
      // Reset terminal when switching between mobile/desktop
      if (prevIsMobileRef.current !== null && prevIsMobileRef.current !== nowMobile) {
        resetTerminal();
      }
      prevIsMobileRef.current = nowMobile;
      setIsMobile(nowMobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [resetTerminal]);

  // Open menu
  const openMenu = (initialIndex?: number) => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      // Calculate x position to align with ">" symbol
      // Desktop: max-w-900px centered + px-6 (24px) padding
      // Mobile: px-4 (16px) padding
      const containerWidth = Math.min(900, window.innerWidth);
      const containerLeft = (window.innerWidth - containerWidth) / 2;
      const paddingLeft = isMobile ? 16 : 24;
      const xPos = isMobile ? rect.left + paddingLeft : containerLeft + paddingLeft;
      setMenuPosition({ x: xPos, y: rect.top });
    }
    // Set to provided index or calculate next section index
    if (initialIndex !== undefined) {
      setSelectedMenuIndex(initialIndex);
    } else {
      // Default: go to next section
      const nextSectionIndex = currentSectionIndex + 1;
      if (nextSectionIndex < SECTION_ORDER.length) {
        const nextSectionId = SECTION_ORDER[nextSectionIndex];
        const menuIndex = MENU_COMMANDS.findIndex(c => c.id === nextSectionId);
        if (menuIndex !== -1) {
          setSelectedMenuIndex(menuIndex);
        } else {
          setSelectedMenuIndex(0);
        }
      } else {
        setSelectedMenuIndex(0);
      }
    }
    setIsMenuOpen(true);
  };

  // Close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Hero sequential animation (steps 0-3: ssh, connecting, connected+system, /home)
  useEffect(() => {
    if (!showHero || heroStep !== 0 || heroAnimatedRef.current) return;
    heroAnimatedRef.current = true;
    setIsTyping(true); // Show "Processing..." during hero animation

    let step = 0;

    const animate = () => {
      if (step <= 3) { // Only animate up to step 3 (> [0] /home)
        setHeroStep(step);
        scrollToBottom();
        step++;
        setTimeout(animate, HERO_STEP_DELAY);
      } else {
        // After step 3, trigger hero loading animation
        setHeroLoadingStep(1);
      }
    };

    setTimeout(animate, HERO_STEP_DELAY);
  }, [showHero, heroStep, scrollToBottom]);

  // Hero loading animation (after > [0] /home is shown)
  useEffect(() => {
    if (heroLoadingStep === 0) return;

    const messages = LOADING_MESSAGES.home;
    const langMessages = language === "ko" ? messages.ko : messages.en;

    const runLoading = async () => {
      // Step 1: Show "Thinking..."
      setIsThinking(true);
      scrollToBottom();
      await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED * 3));
      setIsThinking(false);

      // Step 2: Show loading messages
      for (let i = 0; i < langMessages.length; i++) {
        setLoadingState({ isLoading: true, sectionId: "home", messageIndex: i });
        scrollToBottom();
        const delay = i === langMessages.length - 1 ? ANIMATION_SPEED * 2 : ANIMATION_SPEED * 4;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      setLoadingState(null);

      // Step 3: Continue hero animation (step 4+)
      setHeroLoadingStep(3);
      setHeroStep(4);

      // Continue remaining steps
      setTimeout(() => setHeroStep(5), HERO_STEP_DELAY);
      setTimeout(() => setHeroStep(6), HERO_STEP_DELAY * 2);
    };

    if (heroLoadingStep === 1) {
      runLoading();
    }
  }, [heroLoadingStep, language, scrollToBottom]);

  // ASCII art line-by-line animation
  const totalAsciiLines = HASHED_ASCII.length + VIBELABS_ASCII.length;
  const totalTaglines = 6; // batch subtitle + 4 taglines + countdown
  useEffect(() => {
    if (heroStep < 5) return;
    if (asciiLineIndex >= totalAsciiLines) return;

    const timer = setTimeout(() => {
      setAsciiLineIndex(prev => prev + 1);
      // Scroll as ASCII lines are added
      scrollToBottom();
    }, ASCII_LINE_DELAY);

    return () => clearTimeout(timer);
  }, [heroStep, asciiLineIndex, totalAsciiLines, scrollToBottom]);

  // Tagline line-by-line animation (after ASCII completes)
  useEffect(() => {
    if (asciiLineIndex < totalAsciiLines) return;
    if (taglineIndex >= totalTaglines) {
      // Hero animation complete
      setIsTyping(false);
      return;
    }

    const timer = setTimeout(() => {
      setTaglineIndex(prev => prev + 1);
      // Scroll as taglines are added
      scrollToBottom();
    }, ANIMATION_SPEED * 3); // Slower for readability

    return () => clearTimeout(timer);
  }, [asciiLineIndex, taglineIndex, totalAsciiLines, totalTaglines, scrollToBottom]);

  // Show loading animation
  const showLoading = useCallback(async (sectionId: string): Promise<boolean> => {
    const messages = LOADING_MESSAGES[sectionId];
    if (!messages) return true;

    const langMessages = language === "ko" ? messages.ko : messages.en;

    // Show "Thinking..." first
    setIsThinking(true);
    scrollToBottom();
    await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED * 3));

    if (abortRef.current) {
      setIsThinking(false);
      setLoadingState(null);
      return false;
    }
    setIsThinking(false);

    // Show each loading message with animation
    for (let i = 0; i < langMessages.length; i++) {
      if (abortRef.current) {
        setLoadingState(null);
        return false;
      }
      setLoadingState({ isLoading: true, sectionId, messageIndex: i });
      scrollToBottom();
      // Last message (Done!) shows briefly, others show longer
      const delay = i === langMessages.length - 1 ? ANIMATION_SPEED * 2 : ANIMATION_SPEED * 4;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    setLoadingState(null);
    return true;
  }, [language, scrollToBottom]);

  // Handle command selection
  const handleCommand = async (commandId: string) => {
    const command = MENU_COMMANDS.find(c => c.id === commandId);
    if (!command) return;

    closeMenu();

    // If currently outputting, abort and show interrupt message
    const wasOutputting = isTypingRef.current || isTyping || loadingState?.isLoading || isThinking;
    if (wasOutputting) {
      // Signal abort
      abortRef.current = true;

      // Immediately stop all states
      isTypingRef.current = false;
      setIsTyping(false);
      setIsThinking(false);
      setLoadingState(null);

      // Wait for any pending async operations to see abort flag
      await new Promise(resolve => setTimeout(resolve, 150));

      // Reset abort flag
      abortRef.current = false;

      // Clear all typing cursors and add interrupt message with clear separation
      setLines(prev => [
        ...prev.map(l => ({ ...l, isTyping: false })),
        { id: generateId(), type: "blank" as const, content: "" },
        { id: generateId(), type: "system" as const, content: language === "ko" ? "^C 중단됨" : "^C Interrupted" },
        { id: generateId(), type: "blank" as const, content: "" },
      ]);

      // Wait for React to process state update
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Handle clear command - reset to hero
    if (commandId === "clear") {
      resetTerminal();
      return;
    }

    // Handle language change - reset and switch language
    if (commandId === "lang") {
      const newLang = language === "ko" ? "en" : "ko";
      setLanguage(newLang);
      resetTerminal();
      return;
    }

    // Handle check submission - show check mode directly
    if (commandId === "check") {
      setIsCheckMode(true);
      return;
    }

    // Update current section index
    const sectionIndex = SECTION_ORDER.indexOf(commandId);
    if (sectionIndex !== -1) {
      setCurrentSectionIndex(sectionIndex);
    }

    // Remove previous "blink" lines (Press Enter to continue...)
    setLines(prev => prev.filter(line => line.type !== "blink"));

    // Add command line (skip extra blank if we just added interrupt message)
    const commandLines: Omit<TerminalLine, "id">[] = wasOutputting
      ? [{ type: "command", content: `> ${command.command}` }]
      : [{ type: "blank", content: "" }, { type: "command", content: `> ${command.command}` }];

    await addLines(commandLines, ANIMATION_SPEED);

    // Check if aborted during command line addition
    if (abortRef.current) return;

    // Scroll to bottom before loading animation
    scrollToBottom();

    // Show loading animation
    const loadingCompleted = await showLoading(commandId);
    if (!loadingCompleted) return;

    // Add blank line after loading
    await addLines([{ type: "blank", content: "" }], ANIMATION_SPEED);
    if (abortRef.current) return;

    // Get section content
    const sectionLines = getSectionContent(commandId, language);
    await addLines(sectionLines, ANIMATION_SPEED);

    // Update selectedMenuIndex to point to the next section for the status bar hint
    const currentIdx = SECTION_ORDER.indexOf(commandId);
    if (currentIdx !== -1) {
      if (currentIdx + 1 < SECTION_ORDER.length) {
        // More sections to go - point to next section
        const nextSectionId = SECTION_ORDER[currentIdx + 1];
        const nextMenuIndex = MENU_COMMANDS.findIndex(c => c.id === nextSectionId);
        if (nextMenuIndex !== -1) {
          setSelectedMenuIndex(nextMenuIndex);
        }
      } else {
        // Last section completed - point to [0] /home
        setSelectedMenuIndex(0);
      }
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Ignore all keyboard events when in apply mode
      if (isApplyMode || isCheckMode) return;

      // Menu navigation when open
      if (isMenuOpen) {
        // Number key shortcuts (0-9)
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          const num = parseInt(e.key);
          const matchingCommand = MENU_COMMANDS.find(cmd => cmd.command.startsWith(`[${num}]`));
          if (matchingCommand) {
            handleCommand(matchingCommand.id);
          }
          return;
        }

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedMenuIndex((prev) =>
              prev < MENU_COMMANDS.length - 1 ? prev + 1 : 0
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedMenuIndex((prev) =>
              prev > 0 ? prev - 1 : MENU_COMMANDS.length - 1
            );
            break;
          case "Enter":
            e.preventDefault();
            handleCommand(MENU_COMMANDS[selectedMenuIndex].id);
            break;
          case "Escape":
            e.preventDefault();
            closeMenu();
            break;
        }
        return;
      }

      // Number key shortcuts (1-9) - open menu with cursor on that item
      if (/^[1-9]$/.test(e.key)) {
        e.preventDefault();
        const num = parseInt(e.key);
        const commandIndex = MENU_COMMANDS.findIndex(cmd => cmd.command.startsWith(`[${num}]`));
        if (commandIndex !== -1) {
          setSelectedMenuIndex(commandIndex);
          setIsMenuOpen(true);
        }
        return;
      }

      // Enter, Space, or / : Open menu with cursor on next section
      if (e.key === "Enter" || e.key === " " || e.key === "/") {
        e.preventDefault();
        openMenu(); // openMenu automatically calculates next section
        return;
      }

      if (e.key.toLowerCase() === "l") {
        setLanguage(language === "ko" ? "en" : "ko");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, language, setLanguage, selectedMenuIndex, currentSectionIndex, isApplyMode, isCheckMode]);

  // Format countdown
  const countdownStr = countdown.total > 0
    ? `${String(countdown.days).padStart(2, "0")}d ${String(countdown.hours).padStart(2, "0")}h ${String(countdown.minutes).padStart(2, "0")}m ${String(countdown.seconds).padStart(2, "0")}s`
    : "Closed";

  return (
    <div className={`min-h-[100dvh] h-[100dvh] bg-[#0d0d0d] text-[#d8d8d8] font-mono flex flex-col overflow-hidden ${isMobile ? 'pb-[env(safe-area-inset-bottom)]' : 'p-[10px]'} text-sm relative`}>
      {/* Terminal window with border and glow effect */}
      <motion.div
        className={`flex-1 flex flex-col overflow-hidden overflow-x-hidden bg-[#1a1a1a] ${isMobile ? '' : 'border border-[#333] rounded-lg'}`}
        animate={!isMobile ? {
          boxShadow: [
            '0 0 40px 10px rgba(224, 122, 95, 0.04), 0 0 80px 40px rgba(224, 122, 95, 0.02)',
            '0 0 50px 15px rgba(224, 122, 95, 0.08), 0 0 100px 50px rgba(224, 122, 95, 0.04)',
            '0 0 40px 10px rgba(224, 122, 95, 0.04), 0 0 80px 40px rgba(224, 122, 95, 0.02)'
          ]
        } : undefined}
        transition={!isMobile ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
      {/* Terminal Header - Fixed */}
      <div className={`flex-shrink-0 bg-[#252525] border-b border-[#333] ${isMobile ? '' : 'rounded-t-lg'}`}>
        <div className={`${isMobile ? 'px-4' : 'max-w-[900px] mx-auto w-full px-6'} py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            {/* Terminal title */}
            <span className="text-[#888] text-sm ml-2">
              hashed — vibe-labs-seoul-2026
            </span>
          </div>
          {/* Countdown on desktop - only render when mounted to avoid hydration mismatch */}
          {!isMobile && countdown.mounted && countdown.total > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#666]">{isKo ? "마감까지" : "Deadline"}</span>
              <span className="text-terminal-accent">{countdownStr}</span>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content area */}
      <div
        className="overflow-y-auto overflow-x-hidden flex-1"
        ref={terminalBodyRef}
        style={{ overflowAnchor: "none" }}
        onClick={() => isMenuOpen && closeMenu()}
      >
        <div className={`${isMobile ? 'px-4' : 'max-w-[900px] mx-auto w-full px-6'} pt-6`}>
          {/* Hero Section - Claude Code Style */}
          {showHero && (
            <div className="flex flex-col">
              {/* Terminal connection messages */}
              <div className="text-[#666] text-sm mb-4 space-y-1">
                {heroStep >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="text-[#27c93f]">$</span> ssh vibelabs@hashed.com
                  </motion.div>
                )}
                {heroStep >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="text-[#888]">{isKo ? "연결 중..." : "Connecting to"}</span> <span className="text-terminal-accent">vibelabs.hashed.com</span><span className="text-[#888]">...</span>
                  </motion.div>
                )}
                {heroStep >= 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="text-[#27c93f]">✓</span> <span className="text-[#888]">{isKo ? "연결 완료" : "Connection established"}</span> <span className="text-[#666]">({isKo ? "지연시간" : "latency"}: 2ms)</span>
                  </motion.div>
                )}
                {heroStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#888] mt-1"
                  >
                    <span className="text-[#888]">[system]</span> node v20.11.0 | next 14.2.35 | seoul-kr-1
                  </motion.div>
                )}
              </div>

              {/* Blank line before [0] /home */}
                {heroStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="h-5"
                  />
                )}
                {heroStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#888]"
                  >
                    <span className="text-[#27c93f]">{">"}</span> [0] /home
                  </motion.div>
                )}
                {/* Blank line after [0] /home */}
                {heroStep >= 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="h-5"
                  />
                )}
                {heroStep >= 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-[#4ade80]">user@vibelabs</span>
                    <span className="text-[#888]">:</span>
                    <span className="text-[#60a5fa]">~</span>
                    <span className="text-[#888]">$ </span>
                    <span className="text-[#d8d8d8]">cat home.md</span>
                  </motion.div>
                )}
                {/* Blank line after cat home.md */}
                {heroStep >= 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="h-5"
                  />
                )}

              {/* Welcome box border - salmon/coral color, 2px no rounded */}
              {heroStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-2 border-terminal-accent px-4 py-3 mb-8 self-start"
                >
                  <div className="flex items-center gap-2 text-terminal-accent">
                    <span>✱</span>
                    <span>where vibes become rocket products.</span>
                  </div>
                </motion.div>
              )}

              {/* Big ASCII art - HASHED & VIBE LABS (line by line) */}
              {heroStep >= 5 && (
                <div className="overflow-hidden hide-scrollbar">
                  <div className={`text-terminal-accent leading-none whitespace-pre font-mono mb-1 overflow-hidden hide-scrollbar ${isMobile ? 'text-[9px]' : 'text-xs sm:text-sm'}`} style={{ lineHeight: '1.2' }}>
                    {HASHED_ASCII.map((line, i) => (
                      i < asciiLineIndex && (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="overflow-hidden"
                        >
                          {line}
                        </motion.div>
                      )
                    ))}
                  </div>
                  <div className={`text-terminal-accent leading-none whitespace-pre font-mono mb-2 overflow-hidden hide-scrollbar ${isMobile ? 'text-[9px]' : 'text-xs sm:text-sm'}`} style={{ lineHeight: '1.2' }}>
                    {VIBELABS_ASCII.map((line, i) => {
                      const globalIndex = HASHED_ASCII.length + i;
                      return globalIndex < asciiLineIndex && (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="overflow-hidden"
                        >
                          {line}
                        </motion.div>
                      );
                    })}
                  </div>
                  {/* Batch subtitle below ASCII */}
                  {taglineIndex >= 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-terminal-accent font-mono mt-4 text-sm"
                    >
                      {BATCH_SUBTITLE}
                    </motion.div>
                  )}
                  {/* Taglines below batch subtitle - one line at a time */}
                  <div className="font-mono mt-3 text-sm text-[#d8d8d8]">
                    {taglineIndex >= 2 && (
                      <motion.div
                        key="tagline-1"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start"
                      >
                        <span className="mr-2 flex-shrink-0 text-[#555]" style={{ fontSize: '0.45em', position: 'relative', top: '0.15em' }}>●</span>
                        <span>{isKo ? "아이디어가 아닌, 속도를 봅니다." : "We look at speed, not ideas."}</span>
                      </motion.div>
                    )}
                    {taglineIndex >= 3 && (
                      <motion.div
                        key="tagline-2"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start"
                      >
                        <span className="mr-2 flex-shrink-0 text-[#555]" style={{ fontSize: '0.45em', position: 'relative', top: '0.15em' }}>●</span>
                        <span>{isKo ? "설명이 아닌, 결과물을 봅니다." : "We look at output, not explanations."}</span>
                      </motion.div>
                    )}
                    {taglineIndex >= 4 && (
                      <motion.div
                        key="tagline-3"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 flex items-start"
                      >
                        <span className="mr-2 flex-shrink-0 text-[#555]" style={{ fontSize: '0.45em', position: 'relative', top: '0.15em' }}>●</span>
                        <span>{isKo
                          ? "선발 즉시 5% 지분에 1억원 투자 + Hashed 및 계열사들의 모든 글로벌 네트워크와 리소스 지원"
                          : "100M KRW for 5% equity upon selection + Full global network & resources of Hashed and its affiliates"}</span>
                      </motion.div>
                    )}
                    {taglineIndex >= 5 && (
                      <motion.div
                        key="tagline-4"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start"
                      >
                        <span className="mr-2 flex-shrink-0 text-[#555]" style={{ fontSize: '0.45em', position: 'relative', top: '0.15em' }}>●</span>
                        <span>{isKo
                          ? "국내외 최고 수준의 바이브 코딩 개발자들이 플레잉 코치로 참여"
                          : "World-class vibe coders as playing coaches"}</span>
                      </motion.div>
                    )}
                  </div>
                  {/* Countdown timer - only render when mounted to avoid hydration mismatch */}
                  {taglineIndex >= 6 && countdown.mounted && countdown.total > 0 && (
                    <motion.div
                      key="countdown"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#fbbf24] font-mono mb-4 mt-4 text-sm"
                    >
                      {isKo ? "⏰ 지원 마감까지: " : "⏰ Application closes in: "}
                      <span className="text-white">
                        {countdown.days}
                        <span className="text-[#777]">{isKo ? "일 " : "d "}</span>
                        {String(countdown.hours).padStart(2, '0')}
                        <span className="text-[#777]">{isKo ? "시 " : "h "}</span>
                        {String(countdown.minutes).padStart(2, '0')}
                        <span className="text-[#777]">{isKo ? "분 " : "m "}</span>
                        {String(countdown.seconds).padStart(2, '0')}
                        <span className="text-[#777]">{isKo ? "초" : "s"}</span>
                      </span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Credit line - system message style */}
              {heroStep >= 6 && taglineIndex >= totalTaglines && (
                <motion.div
                  key="credit-line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="mb-3 text-[#888] font-mono"
                >
                  <span className="text-[#888]">[system]</span>
                  <span className="text-[#888]">{" "}vibe-coded by{" "}</span>
                  <a href={`mailto:${FOUNDER_EMAIL}`} className="text-[#888] hover:text-[#aaa]">{FOUNDER_EMAIL}</a>
                  <span className="text-[#888]">{" "}× Claude Opus 4.5</span>
                </motion.div>
              )}

              {/* Login message - directly below ASCII art, hide when navigating to next section */}
              {heroStep >= 6 && taglineIndex >= totalTaglines && currentSectionIndex === -1 && (
                <motion.div
                  key="login-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="mb-4"
                >
                  <span className="text-[#4ade80]">
                    {isKo ? "" : "Press "}<span className="font-bold">Enter</span>{isKo ? "를 눌러 계속하세요" : " to continue"}
                  </span>
                </motion.div>
              )}
            </div>
          )}

        {/* Terminal output - continues below hero */}
        {(() => {
          // Find the last blink line ID
          const lastBlinkId = [...lines].reverse().find(l => l.type === "blink")?.id;
          return lines.map((line) => (
            <TerminalLineComponent
              key={line.id}
              line={line}
              isMobile={isMobile}
              isLastBlink={line.type === "blink" && line.id === lastBlinkId}
            />
          ));
        })()}

        {/* Thinking indicator */}
        {isThinking && (
          <ThinkingIndicator language={language} isMobile={isMobile} />
        )}

        {/* Loading spinner */}
        {loadingState && (
          <LoadingSpinner
            sectionId={loadingState.sectionId}
            messageIndex={loadingState.messageIndex}
            language={language}
            isMobile={isMobile}
          />
        )}

        {/* Bottom padding for fixed input */}
        <div className="h-10" />
        {/* Scroll anchor - keeps scroll pinned to bottom */}
        <div style={{ overflowAnchor: "auto", height: "1px" }} />
        </div>
      </div>

      {/* Status bar - terminal metrics */}
      <div className="flex-shrink-0 bg-[#1a1a1a] border-t border-[#333]">
        <div className={`${isMobile ? 'px-4' : 'max-w-[900px] mx-auto w-full px-6'} flex items-center text-[10px] text-[#555]`}>
          <div className="flex items-center gap-3">
            <span>MEM: 48MB</span>
            <span>CPU: 2%</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center">
            <span className="text-[#555] mr-1">Language:</span>
            <span
              onClick={() => { setLanguage("ko"); resetTerminal(); }}
              className={`cursor-pointer transition-colors ${isKo ? "text-[#aaa]" : "text-[#555] hover:text-[#777]"}`}
            >
              한국어
            </span>
            <span className="mx-1 text-[#444]">|</span>
            <span
              onClick={() => { setLanguage("en"); resetTerminal(); }}
              className={`cursor-pointer transition-colors ${!isKo ? "text-[#aaa]" : "text-[#555] hover:text-[#777]"}`}
            >
              EN
            </span>
          </div>
          {/* Spacer to align with execute button below */}
          <div className="ml-3 w-7 flex-shrink-0" />
        </div>
      </div>

      {/* Input prompt - fixed at bottom */}
      <div
        ref={inputRef}
        className={`flex-shrink-0 bg-[#1a1a1a] ${!isApplyMode && !isCheckMode ? 'cursor-pointer' : ''} group rounded-b-lg relative`}
        onClick={() => !isApplyMode && !isCheckMode && openMenu()}
      >
        <div className={`${isMobile ? 'px-4' : 'max-w-[900px] mx-auto w-full px-6'} py-2`}>
          {/* Apply Mode - AskUserQuestion style inline */}
          {isApplyMode ? (
            <ApplyForm
              language={language}
              onComplete={() => setIsApplyMode(false)}
              onCancel={() => setIsApplyMode(false)}
            />
          ) : isCheckMode ? (
            <CheckSubmission
              onComplete={() => setIsCheckMode(false)}
              onCancel={() => setIsCheckMode(false)}
            />
          ) : (
          <div className="flex items-center">
            {/* Clickable prompt symbol - always opens menu */}
            <span 
              className="text-[#666] mr-2 cursor-pointer hover:text-[#888] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                openMenu();
              }}
              title={isKo ? "메뉴 열기 (⌘)" : "Open menu (⌘)"}
            >{">"}</span>
            {/* Cursor and prompt text - same for all sections */}
            <motion.span
              className="inline-block w-[2px] h-4 bg-terminal-accent mr-[1px]"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.0, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
            <span className="text-[#888] group-hover:text-[#aaa] transition-colors flex-1">
              {isTyping ? (
                <span className="text-[#fbbf24]">
                  {isKo ? "처리 중..." : "Processing..."}
                </span>
              ) : (
                <span className="text-[#888]">
                  {isMobile
                    ? (isKo ? "명령어를 입력하세요..." : "Enter command...")
                    : (isKo ? "명령어를 입력하세요... 다음 컨텐츠는 " : "Enter command... Next: ") + MENU_COMMANDS[selectedMenuIndex]?.command + " " + (isKo ? MENU_COMMANDS[selectedMenuIndex]?.labelKo : MENU_COMMANDS[selectedMenuIndex]?.label)
                  }
                </span>
              )}
            </span>
            {/* Claude-style execute button with menu */}
            <div className="relative ml-3 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMenuOpen) {
                    handleCommand(MENU_COMMANDS[selectedMenuIndex].id);
                  } else {
                    openMenu();
                  }
                }}
                className="w-7 h-7 rounded-lg bg-terminal-accent hover:bg-terminal-accent-hover transition-colors flex items-center justify-center"
                title={isKo ? "실행" : "Execute"}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 10l-5 5 5 5" />
                  <path d="M4 15h11a4 4 0 0 0 4-4V5" />
                </svg>
              </button>

              {/* Invisible click-away layer (no dim) - outside AnimatePresence */}
              {isMenuOpen && (
                <div
                  className="fixed inset-0 cursor-default"
                  style={{ zIndex: 9998, pointerEvents: 'auto' }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeMenu();
                  }}
                />
              )}

              {/* Command Menu Dropdown */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                      ref={menuRef}
                      className={`bg-[#333] border border-[#555] rounded overflow-hidden shadow-2xl ${isMobile ? 'fixed right-4' : 'absolute right-0'}`}
                      style={{
                        zIndex: 9999,
                        bottom: isMobile ? "80px" : "100%",
                        marginBottom: isMobile ? "0" : "36px",
                        minWidth: "280px",
                        maxWidth: "400px"
                      }}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="px-3 py-2 border-b border-[#555] text-xs text-[#888] flex justify-between items-center">
                        <span>{isKo ? "명령어 선택" : "Select Command"}</span>
                        <span className="text-[#666]">↑↓ {isKo ? "이동" : "nav"} · ↵ {isKo ? "선택" : "select"}</span>
                      </div>
                      {MENU_COMMANDS.map((cmd, index) => (
                        <motion.button
                          key={cmd.id}
                          className={`w-full px-3 py-2 text-left transition-colors flex items-center gap-3 ${
                            index === selectedMenuIndex
                              ? 'bg-terminal-accent text-black'
                              : 'hover:bg-[#444]'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(false);
                            handleCommand(cmd.id);
                          }}
                          onMouseEnter={() => setSelectedMenuIndex(index)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.02 }}
                        >
                          <span className={`text-sm ${index === selectedMenuIndex ? 'text-black' : 'text-terminal-accent'}`}>{cmd.command}</span>
                          <span className={`text-sm ${index === selectedMenuIndex ? 'text-black/70' : 'text-[#999]'}`}>
                            {isKo ? cmd.labelKo : cmd.label}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          )}
        </div>
      </div>
      </motion.div>
    </div>
  );
}

