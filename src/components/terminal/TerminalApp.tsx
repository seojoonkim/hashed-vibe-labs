"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PROGRAM_DATA } from "@/lib/constants";

// Application deadline: February 19, 2026, 23:59:59 KST
const DEADLINE = new Date("2026-02-19T23:59:59+09:00").getTime();

// Calculate time left helper
function calculateTimeLeft() {
  const now = Date.now();
  const difference = DEADLINE - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
}

// Countdown hook
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

// Terminal line types
interface TerminalLine {
  id: number;
  type: "command" | "output" | "success" | "error" | "info" | "ascii" | "blank" | "header" | "list-item" | "divider" | "dim" | "link" | "blink";
  content: string;
  indent?: number;
  href?: string;
}

// Menu commands
interface MenuCommand {
  id: string;
  command: string;
  label: string;
  labelKo: string;
}

const MENU_COMMANDS: MenuCommand[] = [
  { id: "clear", command: "[0] /home", label: "Back to Home", labelKo: "처음으로" },
  { id: "about", command: "[1] /about", label: "What is Vibe Camp", labelKo: "Vibe Camp 소개" },
  { id: "who", command: "[2] /who", label: "Who Should Apply", labelKo: "지원 대상" },
  { id: "program", command: "[3] /program", label: "Program Structure", labelKo: "프로그램 구조" },
  { id: "timeline", command: "[4] /timeline", label: "Timeline", labelKo: "일정" },
  { id: "hashed", command: "[5] /hashed", label: "About Hashed", labelKo: "Hashed 소개" },
  { id: "apply", command: "[6] /apply", label: "Apply Now", labelKo: "지원하기" },
  { id: "lang", command: "[9] /lang", label: "한국어로 변경", labelKo: "Switch to English" },
];

// Big block ASCII art for HASHED (Claude Code style - filled blocks with outlines)
// Using the exact same style as Claude Code's "CLAUDE CODE" logo
const HASHED_ASCII = [
  "██╗  ██╗ █████╗ ███████╗██╗  ██╗███████╗██████╗ ",
  "██║  ██║██╔══██╗██╔════╝██║  ██║██╔════╝██╔══██╗",
  "███████║███████║███████╗███████║█████╗  ██║  ██║",
  "██╔══██║██╔══██║╚════██║██╔══██║██╔══╝  ██║  ██║",
  "██║  ██║██║  ██║███████║██║  ██║███████╗██████╔╝",
  "╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═════╝ ",
];

// Big block ASCII art for VIBE CAMP
const VIBECAMP_ASCII = [
  "██╗   ██╗██╗██████╗ ███████╗     ██████╗ █████╗ ███╗   ███╗██████╗ ",
  "██║   ██║██║██╔══██╗██╔════╝    ██╔════╝██╔══██╗████╗ ████║██╔══██╗",
  "██║   ██║██║██████╔╝█████╗      ██║     ███████║██╔████╔██║██████╔╝",
  "╚██╗ ██╔╝██║██╔══██╗██╔══╝      ██║     ██╔══██║██║╚██╔╝██║██╔═══╝ ",
  " ╚████╔╝ ██║██████╔╝███████╗    ╚██████╗██║  ██║██║ ╚═╝ ██║██║     ",
  "  ╚═══╝  ╚═╝╚═════╝ ╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ",
];

// Subtitle for batch info (simple text, displayed below ASCII)
const BATCH_SUBTITLE = "━━━ 1st Batch 2026: Seoul Edition ━━━";

// Section flow order
const SECTION_ORDER = ["about", "who", "program", "timeline", "hashed", "apply"];

export default function TerminalApp() {
  const { language, setLanguage } = useI18n();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [showHero, setShowHero] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroStep, setHeroStep] = useState(0); // For sequential hero animation
  const [asciiLineIndex, setAsciiLineIndex] = useState(0); // For line-by-line ASCII animation
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1); // Track current section (-1 = hero)
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);
  const heroAnimatedRef = useRef(false);
  const countdown = useCountdown();

  const isKo = language === "ko";

  const generateId = () => lineIdRef.current++;

  // Scroll to bottom helper
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTo({
          top: terminalBodyRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    });
  }, []);

  // Add lines with typing effect
  const addLines = useCallback(async (newLines: Omit<TerminalLine, "id">[], delay = 100) => {
    setIsTyping(true);
    for (const line of newLines) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setLines(prev => [...prev, { ...line, id: generateId() }]);
      // Scroll to bottom after each line
      scrollToBottom();
    }
    setIsTyping(false);
  }, [scrollToBottom]);

  // Reset terminal to initial state
  const resetTerminal = useCallback(() => {
    setLines([]);
    setShowHero(true);
    setHeroStep(0);
    setAsciiLineIndex(0);
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
      setMenuPosition({ x: rect.left, y: rect.top - 10 });
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

  // Hero sequential animation
  useEffect(() => {
    if (!showHero || heroStep !== 0 || heroAnimatedRef.current) return;
    heroAnimatedRef.current = true;

    const totalSteps = 6; // ssh, connecting, connected, welcome, ascii, login
    let step = 0;

    const animate = () => {
      if (step <= totalSteps) {
        setHeroStep(step);
        step++;
        setTimeout(animate, step === 1 ? 300 : step === 4 ? 150 : 400);
      }
    };

    setTimeout(animate, 200);
  }, [showHero, heroStep]);

  // ASCII art line-by-line animation
  const totalAsciiLines = HASHED_ASCII.length + VIBECAMP_ASCII.length;
  useEffect(() => {
    if (heroStep < 5) return;
    if (asciiLineIndex >= totalAsciiLines) return;

    const timer = setTimeout(() => {
      setAsciiLineIndex(prev => prev + 1);
    }, 50); // 50ms per line

    return () => clearTimeout(timer);
  }, [heroStep, asciiLineIndex, totalAsciiLines]);

  // Handle command selection
  const handleCommand = async (commandId: string) => {
    // Prevent duplicate execution while already typing
    if (isTyping) return;

    closeMenu();

    const command = MENU_COMMANDS.find(c => c.id === commandId);
    if (!command) return;

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

    // Update current section index
    const sectionIndex = SECTION_ORDER.indexOf(commandId);
    if (sectionIndex !== -1) {
      setCurrentSectionIndex(sectionIndex);
    }

    // Add command line (85ms = 30% slower than 65ms)
    await addLines([
      { type: "blank", content: "" },
      { type: "command", content: `> ${command.command}` },
      { type: "blank", content: "" },
    ], 85);

    // Get section content
    const sectionLines = getSectionContent(commandId, language);
    await addLines(sectionLines, 85);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Menu navigation when open
      if (isMenuOpen) {
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
  }, [isMenuOpen, language, setLanguage, selectedMenuIndex, currentSectionIndex]);

  // Format countdown
  const countdownStr = countdown.total > 0
    ? `${String(countdown.days).padStart(2, "0")}d ${String(countdown.hours).padStart(2, "0")}h ${String(countdown.minutes).padStart(2, "0")}m ${String(countdown.seconds).padStart(2, "0")}s`
    : "Closed";

  return (
    <div className={`h-screen bg-[#0d0d0d] text-[#e5e5e5] font-mono flex flex-col overflow-hidden ${isMobile ? 'p-1' : 'p-2'} ${isMobile ? 'text-xs' : 'text-sm'}`}>
      {/* Terminal window with border */}
      <div className="flex-1 flex flex-col overflow-hidden overflow-x-hidden bg-[#1a1a1a] border border-[#333] rounded-lg">
      {/* Terminal Header - Fixed */}
      <div className="flex-shrink-0 bg-[#252525] border-b border-[#333] rounded-t-lg">
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
              hashed — vibe-camp-seoul-2026
            </span>
          </div>
          {/* Countdown on desktop */}
          {!isMobile && countdown.total > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#666]">{isKo ? "마감까지" : "Deadline"}</span>
              <span className="text-[#e07a5f] font-bold">{countdownStr}</span>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content area - scrollbar at screen edge */}
      <div
        className="overflow-y-auto overflow-x-hidden flex-1"
        ref={terminalBodyRef}
      >
        <div className={`${isMobile ? 'px-4' : 'max-w-[900px] mx-auto w-full px-6'} pt-6`}>
          {/* Hero Section - Claude Code Style */}
          {showHero && (
            <div className="flex flex-col">
              {/* Terminal connection messages */}
              <div className="text-[#666] text-sm mb-4 space-y-1">
                {heroStep >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="text-[#27c93f]">$</span> ssh apply@vibecamp.hashed.com
                  </motion.div>
                )}
                {heroStep >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="text-[#888]">{isKo ? "연결 중..." : "Connecting to"}</span> <span className="text-[#e07a5f]">vibecamp.hashed.com</span><span className="text-[#888]">...</span>
                  </motion.div>
                )}
                {heroStep >= 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="text-[#27c93f]">✓</span> <span className="text-[#888]">{isKo ? "연결 완료" : "Connection established"}</span> <span className="text-[#666]">({isKo ? "지연시간" : "latency"}: 2ms)</span>
                  </motion.div>
                )}
              </div>

              {/* Welcome box border - salmon/coral color */}
              {heroStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[#e07a5f] rounded-sm px-4 py-3 mb-8 self-start"
                >
                  <div className="flex items-center gap-2 text-[#e07a5f]">
                    <span>✱</span>
                    <span>{isKo ? "환영합니다," : "Welcome to the"}</span>
                    <span className="font-bold">Hashed Vibe Camp!</span>
                  </div>
                </motion.div>
              )}

              {/* Big ASCII art - HASHED & VIBE CAMP (line by line) */}
              {heroStep >= 5 && (
                <div className="overflow-x-hidden">
                  <div className={`text-[#e07a5f] leading-none whitespace-pre font-mono mb-1 ${isMobile ? 'text-[8px]' : 'text-xs sm:text-sm'}`} style={{ lineHeight: '1.2' }}>
                    {HASHED_ASCII.map((line, i) => (
                      i < asciiLineIndex && (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {line}
                        </motion.div>
                      )
                    ))}
                  </div>
                  <div className={`text-[#e07a5f] leading-none whitespace-pre font-mono mb-2 ${isMobile ? 'text-[8px]' : 'text-xs sm:text-sm'}`} style={{ lineHeight: '1.2' }}>
                    {VIBECAMP_ASCII.map((line, i) => {
                      const globalIndex = HASHED_ASCII.length + i;
                      return globalIndex < asciiLineIndex && (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {line}
                        </motion.div>
                      );
                    })}
                  </div>
                  {/* Batch subtitle below ASCII */}
                  {asciiLineIndex >= totalAsciiLines && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#e07a5f] font-mono mt-4 text-xs sm:text-sm"
                    >
                      {BATCH_SUBTITLE}
                    </motion.div>
                  )}
                  {/* Taglines below batch subtitle */}
                  {asciiLineIndex >= totalAsciiLines && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="font-mono mt-3 text-xs sm:text-sm text-[#f0f0f0]"
                    >
                      <div>{isKo ? "아이디어가 아닌, 속도를 봅니다." : "We look at speed, not ideas."}</div>
                      <div>{isKo ? "설명이 아닌, 결과물을 봅니다." : "We look at output, not explanations."}</div>
                      <div className="mt-3">
                        {isKo
                          ? "선발 즉시 5% 지분에 1억원 투자 + Hashed 및 계열사들의 모든 글로벌 네트워크와 리소스 지원"
                          : "100M KRW for 5% equity upon selection + Full global network & resources of Hashed and its affiliates"}
                      </div>
                      <div>
                        {isKo
                          ? "Claude 개발사 Anthropic 본사의 지원을 포함, 국내외 최고 수준의 바이브 코딩 개발자들이 멘토로 참여"
                          : "Mentored by world-class vibe coders, with support from Anthropic (creators of Claude)"}
                      </div>
                    </motion.div>
                  )}
                  {/* Countdown timer */}
                  {asciiLineIndex >= totalAsciiLines && countdown.total > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#fbbf24] font-mono mb-4 mt-4 text-xs sm:text-sm"
                    >
                      {isKo ? "⏰ 지원 마감까지: " : "⏰ Application closes in: "}
                      <span className="text-white font-bold">
                        {countdown.days}
                        <span className="text-[#888]">{isKo ? "일 " : "d "}</span>
                        {String(countdown.hours).padStart(2, '0')}
                        <span className="text-[#888]">{isKo ? "시 " : "h "}</span>
                        {String(countdown.minutes).padStart(2, '0')}
                        <span className="text-[#888]">{isKo ? "분 " : "m "}</span>
                        {String(countdown.seconds).padStart(2, '0')}
                        <span className="text-[#888]">{isKo ? "초" : "s"}</span>
                      </span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Login message - directly below ASCII art */}
              {heroStep >= 6 && asciiLineIndex >= totalAsciiLines && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-4"
                >
                  <span className="text-[#808080]">
                    {isKo ? "세션 시작됨. " : "Session started. Press "}<span className="text-white font-bold">Enter</span>{isKo ? "를 눌러 계속하세요" : " to continue"}
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
        {/* Bottom padding for fixed input */}
        <div className="h-4" />
      </div>
      </div>

      {/* Input prompt - fixed at bottom */}
      <div
        ref={inputRef}
        className="flex-shrink-0 bg-[#1a1a1a] border-t border-[#333] cursor-pointer group rounded-b-lg"
        onClick={() => openMenu()}
      >
        <div className={`${isMobile ? 'px-4' : 'max-w-[900px] mx-auto w-full px-6'} py-3`}>
          <div className="flex items-center">
            <span className="text-[#666] mr-2">{">"}</span>
            <motion.span
              className="inline-block w-[2px] h-4 bg-[#e07a5f] mr-[1px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "steps(2)" }}
            />
            <span className="text-[#888] group-hover:text-[#aaa] transition-colors flex-1">
              {isTyping ? (
                <span className="text-[#fbbf24]">
                  {isKo ? "처리 중..." : "Processing..."}
                </span>
              ) : (
                <span className="text-[#888]">
                  {isKo ? '명령어를 입력하세요...' : 'Type a command...'}
                </span>
              )}
            </span>
            {/* Language toggle button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLanguage(language === "ko" ? "en" : "ko");
                resetTerminal();
              }}
              className="text-xs text-[#666] hover:text-[#999] transition-colors px-2 py-1 border border-[#444] rounded"
            >
              {language === "ko" ? "EN" : "KO"}
            </button>
          </div>
        </div>
      </div>

      {/* Command Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className="fixed z-50 bg-[#333] border border-[#555] rounded overflow-hidden shadow-2xl"
              style={{
                left: Math.min(menuPosition.x, window.innerWidth - 300),
                bottom: `calc(100vh - ${menuPosition.y}px)`,
                minWidth: "280px"
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
                      ? 'bg-[#e07a5f] text-white'
                      : 'hover:bg-[#444]'
                  }`}
                  onClick={() => handleCommand(cmd.id)}
                  onMouseEnter={() => setSelectedMenuIndex(index)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <span className={`text-sm ${index === selectedMenuIndex ? 'text-white' : 'text-[#e07a5f]'}`}>{cmd.command}</span>
                  <span className={`text-sm ${index === selectedMenuIndex ? 'text-white/80' : 'text-[#999]'}`}>
                    {isKo ? cmd.labelKo : cmd.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

// Terminal line component
function TerminalLineComponent({ line, isMobile, isLastBlink = false }: { line: TerminalLine; isMobile: boolean; isLastBlink?: boolean }) {
  const baseClass = `font-mono ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed whitespace-pre-wrap break-words`;

  switch (line.type) {
    case "command":
      return (
        <motion.div
          className={`${baseClass} text-[#f0f0f0]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}
        </motion.div>
      );
    case "success":
      return (
        <motion.div
          className={`${baseClass} text-[#34d399]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}
        </motion.div>
      );
    case "error":
      return (
        <motion.div
          className={`${baseClass} text-[#f87171]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}
        </motion.div>
      );
    case "info":
      return (
        <motion.div
          className={`${baseClass} text-[#22d3ee]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}
        </motion.div>
      );
    case "dim":
      return (
        <motion.div
          className={`${baseClass} text-[#999]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}
        </motion.div>
      );
    case "ascii":
      return (
        <motion.div
          className={`font-mono ${isMobile ? 'text-[6px]' : 'text-sm'} leading-tight whitespace-pre overflow-x-hidden`}
          style={{ color: '#e07a5f' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}
        </motion.div>
      );
    case "header":
      return (
        <motion.div
          className={`${baseClass} text-[#e07a5f] font-bold`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}
        </motion.div>
      );
    case "list-item":
      return (
        <motion.div
          className={`${baseClass} text-[#f0f0f0] flex items-start gap-2`}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-[#888]">•</span>
          <span>{line.content}</span>
        </motion.div>
      );
    case "divider":
      return (
        <motion.div
          className="my-2 border-t border-[#444] max-w-full"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
        />
      );
    case "link":
      // Parse content to separate arrow prefix from link text
      const linkMatch = line.content.match(/^(\s*→\s*)(.+)$/);
      const arrowPrefix = linkMatch ? linkMatch[1] : "";
      const linkText = linkMatch ? linkMatch[2] : line.content;
      return (
        <motion.a
          href={line.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClass} text-[#60a5fa] hover:text-[#93c5fd] cursor-pointer block transition-colors`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="no-underline">{arrowPrefix}</span>
          <span className="underline underline-offset-2">{linkText}</span>
          <span className="text-[#666] no-underline"> ↗</span>
        </motion.a>
      );
    case "blink":
      return (
        <motion.div
          className={`${baseClass} text-[#888]`}
          initial={{ opacity: 0 }}
          animate={isLastBlink ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
          transition={isLastBlink ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          {line.content}
        </motion.div>
      );
    case "blank":
      return <div className="h-3" />;
    default:
      return (
        <motion.div
          className={`${baseClass} text-[#f0f0f0]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}
        </motion.div>
      );
  }
}

// Get section content as terminal lines
function getSectionContent(sectionId: string, language: string): Omit<TerminalLine, "id">[] {
  const lines: Omit<TerminalLine, "id">[] = [];
  const isKo = language === "ko";

  switch (sectionId) {
    // ========== /about: Vibe Camp 소개 (What is + Why Now) ==========
    case "about":
      lines.push(
        { type: "header", content: isKo ? "[ 01. VIBE CAMP이란? ]" : "[ 01. WHAT IS VIBE CAMP? ]" },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "Hashed Vibe Camp는 교육 프로그램이나 액셀러레이터가 아닙니다."
          : "Hashed Vibe Camp is NOT an educational program or accelerator." },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "기존 스타트업의 완만한 성장 곡선과 달리, AI를 활용해"
          : "Unlike traditional startups' gradual growth curves, we discover" },
        { type: "info", content: isKo
          ? "압축적으로 성장하는 파운더를 매우 이른 단계에서 발굴합니다."
          : "founders who grow exponentially with AI at a very early stage." },
        { type: "output", content: isKo
          ? "확신이 서는 팀에는 즉시 투자하고,"
          : "We invest immediately in teams we believe in," },
        { type: "output", content: isKo
          ? "약 8주간 밀도 높은 빌딩 과정을 함께합니다."
          : "and join them for ~8 weeks of intensive building." },
        { type: "blank", content: "" },
        { type: "success", content: isKo
          ? "한마디로, 투자를 전제로 설계된 조기 선발 시스템입니다."
          : "In short: an early selection system designed with investment in mind." },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "우리는 피치덱을 듣고 판단하지 않습니다."
          : "We don't judge based on pitch decks." },
        { type: "info", content: isKo
          ? "이미 만들고 있는 제품, 반복의 속도, 실제 결과물을 관찰합니다."
          : "We observe products being built, iteration speed, and actual results." },
        { type: "blank", content: "" },
        { type: "error", content: isKo
          ? "✕ Pitch deck, 시장 분석, 장기 로드맵"
          : "✕ Pitch deck, market analysis, long-term roadmap" },
        { type: "success", content: isKo
          ? "○ 라이브 URL, 사용자 반응, 커밋 로그, 반복 주기"
          : "○ Live URL, user reactions, commit logs, iteration cycle" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Why Now?
        { type: "header", content: isKo ? "[ 02. 왜 지금인가? ]" : "[ 02. WHY NOW? ]" },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "AI로 인해 창업의 기본 공식이 바뀌었습니다."
          : "AI has changed the fundamental formula of entrepreneurship." },
        { type: "blank", content: "" },
        { type: "dim", content: isKo ? "과거:" : "Past:" },
        { type: "error", content: "  Idea → Team → Fund → Build" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo ? "지금:" : "Now:" },
        { type: "success", content: "  Build → Deploy → Learn → Decide" },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "과거에는 아이디어를 검증하려면 팀을 꾸리고 투자를 받아야 했습니다."
          : "In the past, validating ideas required building a team and raising funds." },
        { type: "output", content: isKo
          ? "그래서 피치덱과 설득이 중요했습니다."
          : "That's why pitch decks and persuasion were important." },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "지금은 다릅니다. AI를 co-builder로 활용하면"
          : "Now it's different. Using AI as a co-builder," },
        { type: "info", content: isKo
          ? "혼자서도, 빠르게, 실제 제품을 만들고 시장 반응을 확인할 수 있습니다."
          : "you can build real products quickly, alone, and test market response." },
        { type: "success", content: isKo
          ? "설득 전에 증명이 가능한 시대입니다."
          : "It's an era where you can prove before you persuade." },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "이제 중요한 건 '무엇을 말하느냐'가 아닙니다."
          : "What matters now is not 'what you say'." },
        { type: "success", content: isKo
          ? "'얼마나 빠르게 만들고, 배포하고, 배우느냐'입니다."
          : "It's 'how fast you build, deploy, and learn'." },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "Hashed Vibe Camp는 이 변화에 맞춰 설계된"
          : "Hashed Vibe Camp is a new founder discovery system" },
        { type: "info", content: isKo
          ? "새로운 방식의 파운더 발굴 시스템입니다."
          : "designed for this change." },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 2026 Batch Schedule
        { type: "header", content: isKo ? "[ 2026 배치 일정 ]" : "[ 2026 BATCH SCHEDULE ]" },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "2026년에는 3개의 배치가 각 지역의 파트너 및 투자사들과 함께 진행됩니다."
          : "In 2026, three batches will run with local partners and investors." },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "1st Batch · 서울 · 3월 시작" : "1st Batch · Seoul · March" },
        { type: "info", content: isKo ? "2nd Batch · 싱가포르 · 6월 시작" : "2nd Batch · Singapore · June" },
        { type: "info", content: isKo ? "3rd Batch · 아부다비 · 9월 시작" : "3rd Batch · Abu Dhabi · September" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "📖 Hashed가 Vibe Camp를 기획한 배경에 대한 김서준(Simon Kim) 대표의 포스팅"
          : "📖 Simon Kim's post on why Hashed launched Vibe Camp" },
        { type: "link", content: isKo
          ? "   → 역삼각형 인재의 시대: 바이브 코딩이 창업과 투자의 문법을 바꾸다"
          : "   → How Vibe Coding Is Rewriting the Rules of Startups and Venture Capital",
          href: isKo
            ? "https://medium.com/hashed-kr/vibe-founders-64f178fe5497"
            : "https://medium.com/hashed-official/vibe-founders-6c15649b78d4" },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    // ========== /who: 지원 대상 (Who Should Apply + Evaluation Criteria) ==========
    case "who":
      lines.push(
        { type: "header", content: isKo ? "[ 02. 누가 지원해야 할까요? ]" : "[ 02. WHO SHOULD APPLY? ]" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "Vibe Camp는 모든 창업자를 위한 프로그램이 아닙니다."
          : "Vibe Camp is not for all founders." },
        { type: "dim", content: isKo
          ? "특정한 방식으로 움직이는 사람들을 위해 설계되었습니다."
          : "It's designed for people who move in a specific way." },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "✓ 이런 분을 찾습니다:" : "✓ We're looking for:" },
        { type: "list-item", content: isKo
          ? "1~3인의 소규모 팀 또는 솔로 빌더"
          : "Small teams of 1-3 or solo builders" },
        { type: "list-item", content: isKo
          ? "AI를 보조 도구가 아닌 핵심 빌딩 파트너로 활용하는 사람"
          : "Those who use AI as a core building partner, not just a tool" },
        { type: "list-item", content: isKo
          ? "지금 당장 보여줄 수 있는 무언가가 있는 사람 (URL, 프로토타입, 사용자)"
          : "Those with something to show now (URL, prototype, users)" },
        { type: "list-item", content: isKo
          ? "설명보다 실행과 결과로 증명하는 것이 자연스러운 사람"
          : "Those who naturally prove through execution and results" },
        { type: "list-item", content: isKo
          ? "빠르게 만들고, 빠르게 고치고, 빠르게 배우는 반복 속도를 가진 사람"
          : "Those with fast iteration: build fast, fix fast, learn fast" },
        { type: "blank", content: "" },
        { type: "error", content: isKo ? "✕ 이런 경우는 맞지 않습니다:" : "✕ Not a good fit:" },
        { type: "list-item", content: isKo
          ? "아직 아이디어 단계이며, 제품보다 설득이 우선인 경우"
          : "Still at idea stage, prioritizing persuasion over product" },
        { type: "list-item", content: isKo
          ? "강의, 커리큘럼, 체계적인 멘토링을 기대하는 경우"
          : "Expecting lectures, curriculum, or systematic mentoring" },
        { type: "list-item", content: isKo
          ? "정해진 과제와 마일스톤을 따라가고 싶은 경우"
          : "Wanting to follow set assignments and milestones" },
        { type: "list-item", content: isKo
          ? "투자 유치가 목표이고, 빌딩은 그 다음인 경우"
          : "When fundraising is the goal and building comes second" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Evaluation Criteria
        { type: "header", content: isKo ? "[ 02-2. 평가 기준 ]" : "[ 02-2. EVALUATION CRITERIA ]" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "우리는 기존 투자 심사 방식과 다른 렌즈로 팀을 봅니다."
          : "We look at teams through a different lens than traditional investment." },
        { type: "dim", content: isKo
          ? "완성된 사업 계획서나 시장 분석보다,"
          : "More than completed business plans or market analysis," },
        { type: "dim", content: isKo
          ? "지금 이 순간 어떻게 움직이고 있는지를 더 중요하게 봅니다."
          : "we care more about how you're moving right now." },
        { type: "blank", content: "" },
        { type: "error", content: isKo ? "크게 보지 않는 것:" : "What we don't focus on:" },
        { type: "list-item", content: isKo ? "아이디어의 크기나 참신함" : "Size or novelty of the idea" },
        { type: "list-item", content: isKo ? "시장 규모 설명의 완성도" : "Completeness of market size explanation" },
        { type: "list-item", content: isKo ? "화려한 경력이나 학력" : "Impressive careers or education" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "집중해서 보는 것:" : "What we focus on:" },
        { type: "list-item", content: isKo
          ? "빌드 속도 — 아이디어가 얼마나 빠르게 제품이 되는가"
          : "Build speed — how fast ideas become products" },
        { type: "list-item", content: isKo
          ? "반복 주기 — 피드백 → 수정 → 배포 사이클의 밀도"
          : "Iteration cycle — density of feedback → fix → deploy" },
        { type: "list-item", content: isKo
          ? "문제 해결 방식 — 막힐 때 어떻게 돌파하는가"
          : "Problem solving — how you break through blockers" },
        { type: "list-item", content: isKo
          ? "AI 활용 깊이 — AI를 워크플로우에 얼마나 깊이 통합했는가"
          : "AI usage depth — how deeply AI is integrated in workflow" },
        { type: "list-item", content: isKo
          ? "사용자 대응 — 실제 사용자 반응에 어떻게 대응하는가"
          : "User response — how you respond to real user feedback" },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "결국 핵심 질문은 하나입니다:"
          : "The core question is one:" },
        { type: "success", content: isKo
          ? "\"지금, 이미 움직이고 있는가?\""
          : "\"Are they already moving, right now?\"" },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    // ========== /program: 프로그램 구조 ==========
    case "program":
      lines.push(
        { type: "header", content: isKo ? "[ 03. 프로그램 구조 ]" : "[ 03. PROGRAM STRUCTURE ]" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "일회성 행사도, 강의 중심 프로그램도 아닙니다."
          : "Not a one-time event, not a lecture-based program." },
        { type: "success", content: isKo
          ? "선발 즉시 투자가 집행되는 실전 빌딩 프로그램입니다."
          : "A real building program where investment is executed upon selection." },
        { type: "blank", content: "" },

        // Phase 1
        { type: "info", content: "Phase 1" },
        { type: "header", content: "Offline Entry Session" },
        { type: "dim", content: "Meetup" },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "본 프로그램 시작 전, 잠재 지원자들이 모이는 네트워킹 밋업입니다."
          : "A networking meetup for potential applicants before the main program." },
        { type: "output", content: isKo
          ? "이 자리에서 Hashed 팀과 직접 만나고, 다른 빌더들과 교류할 수 있습니다."
          : "Meet the Hashed team directly and network with other builders." },
        { type: "dim", content: isKo
          ? "※ 밋업 참여가 선발에 직접적인 영향을 주지는 않습니다."
          : "※ Meetup participation does not directly affect selection." },
        { type: "blank", content: "" },

        // Phase 2
        { type: "info", content: "Phase 2" },
        { type: "header", content: "Vibe Camp Seoul" },
        { type: "dim", content: isKo ? "Core Program · 약 8주" : "Core Program · ~8 weeks" },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "최종 선발된 3–5팀이 참여하는 본 프로그램입니다."
          : "The main program for 3-5 selected teams." },
        { type: "success", content: isKo
          ? "선발 발표와 동시에 Hashed가 직접 투자를 집행합니다."
          : "Hashed executes direct investment upon selection announcement." },
        { type: "output", content: isKo
          ? "약 8주간 각 팀의 빌드 속도와 제품 진화를 밀도 있게 관찰하고,"
          : "Closely observe each team's build speed and product evolution for ~8 weeks," },
        { type: "output", content: isKo
          ? "필요한 순간에 Hashed의 네트워크와 리소스를 연결합니다."
          : "connecting Hashed's network and resources when needed." },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    // ========== /timeline: 일정 ==========
    case "timeline":
      lines.push(
        { type: "header", content: isKo ? "[ 04. 프로그램 일정 ]" : "[ 04. PROGRAM TIMELINE ]" },
        { type: "dim", content: isKo ? "첫 번째 기수 Seoul Edition #1" : "First Cohort: Seoul Edition #1" },
        { type: "blank", content: "" },
        { type: "output", content: "1.30" },
        { type: "info", content: "Offline Entry Session" },
        { type: "dim", content: isKo ? "  잠재 지원자 대상 밋업" : "  Meetup for potential applicants" },
        { type: "blank", content: "" },
        { type: "output", content: "2.1 – 2.19" },
        { type: "info", content: "Application" },
        { type: "dim", content: isKo ? "  공식 지원 접수" : "  Official application period" },
        { type: "blank", content: "" },
        { type: "output", content: "2.27" },
        { type: "info", content: "Finalist Announcement" },
        { type: "dim", content: isKo ? "  본 프로그램 참여 팀 발표" : "  Team selection announcement" },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "3월–4월" : "Mar–Apr" },
        { type: "info", content: "Vibe Camp Seoul" },
        { type: "dim", content: isKo ? "  투자 기반 프로그램 (약 8주)" : "  Investment-based program (~8 weeks)" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Detailed Timeline
        { type: "success", content: "1. Offline Entry Session (Seoul)" },
        { type: "output", content: isKo ? "  1.30 (1회)" : "  Jan 30 (once)" },
        { type: "list-item", content: isKo
          ? "일부 잠재 지원자들이 참여하는 오프라인 밋업"
          : "An offline meetup for some potential applicants" },
        { type: "list-item", content: isKo
          ? "Vibe Camp Seoul 본 프로그램과는 별도"
          : "Separate from Vibe Camp Seoul main program" },
        { type: "list-item", content: isKo
          ? "참여는 선발이나 투자와 직결되지 않음"
          : "Participation does not directly lead to selection or investment" },
        { type: "list-item", content: isKo
          ? "상호 교류 및 현장 관찰 중심"
          : "Focus on networking and on-site observation" },
        { type: "blank", content: "" },

        { type: "success", content: "2. Application" },
        { type: "output", content: isKo ? "  2.1 – 2.19 (목)" : "  Feb 1-19 (Thu)" },
        { type: "list-item", content: isKo
          ? "개인 또는 팀 단위 지원"
          : "Apply as individual or team" },
        { type: "output", content: isKo ? "  제출 내용:" : "  Submit:" },
        { type: "dim", content: isKo
          ? "    • 현재 만들고 있는 것 (URL, demo, repo 등)"
          : "    • What you're building (URL, demo, repo, etc.)" },
        { type: "dim", content: isKo
          ? "    • 간단한 배경 설명"
          : "    • Brief background description" },
        { type: "info", content: isKo
          ? "  ✓ 장문의 서술형 질문 없음"
          : "  ✓ No long essay questions" },
        { type: "blank", content: "" },

        { type: "success", content: "3. Finalist Announcement" },
        { type: "output", content: "  2.27" },
        { type: "list-item", content: isKo
          ? "Vibe Camp Seoul 본 프로그램에 참여할 3–5팀 발표"
          : "3-5 teams announced for Vibe Camp Seoul main program" },
        { type: "list-item", content: isKo
          ? "발표와 동시에 직접 투자 집행"
          : "Direct investment executed upon announcement" },
        { type: "blank", content: "" },

        { type: "success", content: "4. Vibe Camp Seoul — Core Program" },
        { type: "output", content: isKo ? "  3월–4월 (약 8주)" : "  Mar-Apr (~8 weeks)" },
        { type: "list-item", content: isKo
          ? "선발된 팀만 참여"
          : "Only selected teams participate" },
        { type: "list-item", content: isKo
          ? "Asynchronous 중심: 빌드 → 배포 → 반복"
          : "Asynchronous focus: Build → Deploy → Iterate" },
        { type: "list-item", content: isKo
          ? "Hashed는 팀들의 속도, 변화, 제품 진화를 지속적으로 관찰"
          : "Hashed continuously observes team speed, changes, and product evolution" },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    case "hashed":
      lines.push(
        // Why Hashed?
        { type: "header", content: isKo ? "[ 05. 왜 Hashed인가? ]" : "[ 05. WHY HASHED? ]" },
        { type: "blank", content: "" },
        { type: "info", content: "200+ 포트폴리오  |  10+ 유니콘 배출  |  6 글로벌 거점" },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "Hashed는 2017년 설립 이후, 기술 변화의 가장 앞선 지점에서"
          : "Since 2017, Hashed has discovered teams at the forefront of" },
        { type: "output", content: isKo
          ? "팀을 발굴해온 투자사입니다."
          : "technology shifts." },
        { type: "output", content: isKo
          ? "Web3, AI, 컨텐츠 등 새로운 패러다임이 형성되는 초기 시점에"
          : "At the early stages of new paradigms like Web3, AI, and content," },
        { type: "output", content: isKo
          ? "팀을 만나고, 함께 성장해왔습니다."
          : "we've met teams and grown together." },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "서울을 시작으로 샌프란시스코, 싱가포르, 방콕, 뱅갈루루, 아부다비에"
          : "With offices in Seoul, San Francisco, Singapore, Bangkok, Bengaluru," },
        { type: "dim", content: isKo
          ? "오피스를 두고 있으며, 각 지역의 네트워크를 활용해"
          : "and Abu Dhabi, we leverage our regional networks to help" },
        { type: "dim", content: isKo
          ? "포트폴리오 팀들의 글로벌 진출과 Go-to-Market을 지원합니다."
          : "portfolio teams with global expansion and Go-to-Market strategies." },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "Vibe Camp는 Hashed가 축적해온 '초기 신호를 읽는 눈'을 프로그램화한 것입니다."
          : "Vibe Camp is Hashed's way of reading early signals, turned into a program." },
        { type: "info", content: isKo
          ? "말로 설득하기 전에 이미 움직이고 있는 팀,"
          : "Teams already moving before they persuade with words —" },
        { type: "info", content: isKo
          ? "그 팀을 가장 빠르게 찾아 투자하기 위한 시스템입니다."
          : "a system to find and invest in them fastest." },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Portfolio Distribution
        { type: "header", content: isKo ? "[ Hashed 포트폴리오 분포 ]" : "[ HASHED PORTFOLIO DISTRIBUTION ]" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "전 세계 블록체인 프로젝트에 적극적으로 투자하고 있으며,"
          : "Actively investing in blockchain projects worldwide," },
        { type: "dim", content: isKo
          ? "북미와 아시아에 집중하면서도 지리적 다양성을 유지하고 있습니다."
          : "focusing on North America and Asia while maintaining geographic diversity." },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "  북미     ~70팀" : "  North America   ~70 teams" },
        { type: "output", content: isKo ? "  아시아   150+팀" : "  Asia            150+ teams" },
        { type: "output", content: isKo ? "  유럽     10+팀" : "  Europe          10+ teams" },
        { type: "output", content: isKo ? "  기타     6팀" : "  Others          6 teams" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // What Hashed Provides
        { type: "header", content: isKo ? "[ Hashed가 제공하는 것 ]" : "[ WHAT HASHED PROVIDES ]" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "일반적인 액셀러레이터의 강의나 멘토링 세션과는 다릅니다."
          : "Different from typical accelerator lectures or mentoring sessions." },
        { type: "dim", content: isKo
          ? "팀이 실제로 필요할 때, 필요한 것을 연결합니다."
          : "We connect what teams actually need, when they need it." },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "1) 초기 투자 전문성" : "1) Early-stage Investment Expertise" },
        { type: "list-item", content: isKo
          ? "제품도 없고, 팀도 미완성인 단계에서 투자 결정을 해온 경험"
          : "Experience making investment decisions with no product, incomplete team" },
        { type: "list-item", content: isKo
          ? "빠르게 변하는 초기 단계에서의 의사결정에 익숙"
          : "Comfortable with decision-making in fast-changing early stages" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "2) 글로벌 네트워크" : "2) Global Network" },
        { type: "list-item", content: isKo
          ? "아시아, 중동, 미국을 잇는 투자자·창업자 네트워크"
          : "Investor and founder network connecting Asia, Middle East, and US" },
        { type: "list-item", content: isKo
          ? "후속 투자 연결, 파트너십 소개, 해외 시장 진입에 실질적인 도움"
          : "Practical help with follow-on funding, partnerships, market entry" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "3) 새로운 창업 방식에 대한 이해" : "3) Understanding New Startup Methods" },
        { type: "list-item", content: isKo
          ? "1~2인이 AI로 글로벌 제품을 만드는 시대"
          : "An era where 1-2 people build global products with AI" },
        { type: "list-item", content: isKo
          ? "전통적인 스타트업 공식을 따르지 않는 팀을 많이 만나왔고, 그 방식을 이해"
          : "We've met many teams not following traditional formulas, and understand them" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "4) 맞춤형 지원" : "4) Customized Support" },
        { type: "list-item", content: isKo
          ? "후속 투자 라운드 연결 및 전략 논의"
          : "Follow-on round connections and strategy discussions" },
        { type: "list-item", content: isKo
          ? "산업별 파트너 및 미디어 연결"
          : "Industry partner and media connections" },
        { type: "list-item", content: isKo
          ? "팀 상황에 맞는 1:1 전략 세션"
          : "1:1 strategy sessions tailored to team situation" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "※ 정해진 커리큘럼이 아닌, 팀의 실제 진척과 필요에 따라 유연하게 지원"
          : "※ Flexible support based on actual progress and needs, not fixed curriculum" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Global Co-investors
        { type: "header", content: isKo ? "[ 글로벌 공동투자사 네트워크 ]" : "[ GLOBAL CO-INVESTOR NETWORK ]" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "Hashed와 함께 딜플로우를 교환하고 공동투자해온 세계적인 투자사들:"
          : "World-class investors exchanging deal flow and co-investing with Hashed:" },
        { type: "blank", content: "" },
        { type: "output", content: "  Tiger Global | Sequoia | a16z | USV" },
        { type: "output", content: "  Coatue | Arrington XRP Capital | Multicoin Capital" },
        { type: "output", content: "  Samsung Next | Galaxy Interactive | GIC | Nyca" },
        { type: "output", content: "  SBI | Mubadala Capital | Dragonfly | Binance | Coinbase" },
        { type: "output", content: "  1kx | Bitkraft | Goodwater | Placeholder | Spartan Capital" },
        { type: "output", content: "  Makers Fund | ConsenSys Ventures | Parafi | Race Capital" },
        { type: "output", content: "  Electric Capital | Polychain Capital | Collab+Currency | Framework" },
        { type: "output", content: "  White Star Capital | Antler | Digital Currency Group | DeFi Alliance" },
        { type: "output", content: "  Solana Ventures | Polygon | Avalanche" },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    case "apply":
      lines.push(
        // Investment Structure
        { type: "header", content: isKo ? "[ 06. 투자 구조 ]" : "[ 06. INVESTMENT STRUCTURE ]" },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "총 선발 팀 수" : "Total Selected Teams" },
        { type: "success", content: isKo ? "  → 3–5팀" : "  → 3-5 teams" },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "초기 투자" : "Initial Investment" },
        { type: "success", content: isKo
          ? "  → 선발 즉시 1억원 / 지분 5%"
          : "  → 100M KRW for 5% equity upon selection" },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "추가 투자" : "Follow-on Investment" },
        { type: "info", content: isKo
          ? "  → 프로그램 기간 중 협의하에 최대 1억원 추가 가능"
          : "  → Up to 100M KRW additional during program (by mutual agreement)" },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "투자 방식" : "Investment Method" },
        { type: "success", content: isKo ? "  → Hashed 직접 투자" : "  → Direct investment by Hashed" },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "★ 선발 = 투자 집행"
          : "★ Selection = Investment execution" },
        { type: "dim", content: isKo
          ? "Vibe Camp는 투자를 전제로 설계된 프로그램입니다."
          : "Vibe Camp is a program designed with investment in mind." },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // How to Apply
        { type: "header", content: isKo ? "[ 06-2. 지원 방법 ]" : "[ 06-2. HOW TO APPLY ]" },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "지원 대상" : "Who can apply" },
        { type: "info", content: isKo ? "  개인 또는 3인 이하 팀" : "  Individuals or teams of 3 or less" },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "제출물" : "Submit" },
        { type: "list-item", content: isKo
          ? "현재 만들고 있는 것 (URL, demo, repo 등)"
          : "What you're building (URL, demo, repo, etc.)" },
        { type: "list-item", content: isKo
          ? "간단한 배경 설명"
          : "Brief background description" },
        { type: "blank", content: "" },
        { type: "error", content: isKo
          ? "⚠ 지원 마감: 2.19 (목)"
          : "⚠ Deadline: Feb 19 (Thu)" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },
        { type: "success", content: isKo
          ? "→ 지원하기: https://hashed.com/vibecamp"
          : "→ Apply now: https://hashed.com/vibecamp" },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;
  }

  return lines;
}
