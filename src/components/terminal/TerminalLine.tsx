"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { TerminalLine } from "@/types/terminal";
import { DEADLINE } from "@/data/terminalConfig";

export function TypingCursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1em] bg-terminal-accent ml-[1px] align-middle"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    />
  );
}

export function CountdownTimer({ targetDate, isKo }: { targetDate: Date; isKo: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <span className="text-[#f87171]">
        {isKo ? "지원 마감됨" : "Application Closed"}
      </span>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <span className="font-mono text-white">
      {timeLeft.days}
      <span className="text-[#777]">{isKo ? "일 " : "d "}</span>
      {pad(timeLeft.hours)}
      <span className="text-[#777]">{isKo ? "시 " : "h "}</span>
      {pad(timeLeft.minutes)}
      <span className="text-[#777]">{isKo ? "분 " : "m "}</span>
      {pad(timeLeft.seconds)}
      <span className="text-[#777]">{isKo ? "초" : "s"}</span>
    </span>
  );
}

function getLineBulletColor(type: TerminalLine["type"]): string {
  switch (type) {
    case "header":
      return "var(--accent-orange)";
    default:
      return "#555";
  }
}

export function LineBullet({ type, visible }: { type: TerminalLine["type"]; visible?: boolean }) {
  const color = getLineBulletColor(type);
  return (
    <span
      className="mr-2 flex-shrink-0"
      style={{ color: visible === true ? color : 'transparent', fontSize: '0.45em', position: 'relative', top: '1.0em' }}
    >
      ●
    </span>
  );
}

export function TerminalLineComponent({ line, isMobile, isLastBlink = false }: { line: TerminalLine; isMobile: boolean; isLastBlink?: boolean }) {
  const baseClass = `font-mono text-sm leading-relaxed whitespace-pre-wrap break-words`;
  const showCursor = line.isTyping && line.type !== "blank" && line.type !== "divider" && line.type !== "ascii";

  // Indented content class (for lines under paragraph headers)
  const indentedClass = "ml-5"; // matches bullet width + margin

  // Animation props - opacity only to prevent layout shifts during scroll
  const lineAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.1, ease: "easeOut" }
  };

  switch (line.type) {
    case "command":
      return (
        <motion.div
          className={`${baseClass} text-[#d8d8d8]`}
          {...lineAnimation}
        >
          {line.content}{showCursor && <TypingCursor />}
        </motion.div>
      );
    case "prompt":
      return (
        <motion.div
          className={`${baseClass} text-[#888] mb-1`}
          {...lineAnimation}
        >
          <span className="text-[#4ade80]">user@vibelabs</span>
          <span className="text-[#888]">:</span>
          <span className="text-[#60a5fa]">~</span>
          <span className="text-[#888]">$ </span>
          <span className="text-[#d8d8d8]">{line.content}</span>
          {showCursor && <TypingCursor />}
        </motion.div>
      );
    // Colored text types - bullet visible when explicitly set, invisible spacer otherwise
    case "success":
      return (
        <motion.div
          className={`${baseClass} text-[#34d399] flex items-start`}
          {...lineAnimation}
        >
          <LineBullet type={line.type} visible={line.bullet} />
          <span>{line.content}{showCursor && <TypingCursor />}</span>
        </motion.div>
      );
    case "error":
      return (
        <motion.div
          className={`${baseClass} text-[#f87171] flex items-start`}
          {...lineAnimation}
        >
          <LineBullet type={line.type} visible={line.bullet} />
          <span>{line.content}{showCursor && <TypingCursor />}</span>
        </motion.div>
      );
    case "info":
      return (
        <motion.div
          className={`${baseClass} text-[#22d3ee] flex items-start`}
          {...lineAnimation}
        >
          <LineBullet type={line.type} visible={line.bullet} />
          <span>{line.content}{showCursor && <TypingCursor />}</span>
        </motion.div>
      );
    case "header":
      return (
        <motion.div
          className={`${baseClass} text-terminal-accent font-bold flex items-start`}
          {...lineAnimation}
        >
          <LineBullet type={line.type} visible={line.bullet} />
          <span>{line.content}{showCursor && <TypingCursor />}</span>
        </motion.div>
      );
    // Content types
    case "output":
      return (
        <motion.div
          className={`${baseClass} text-[#d8d8d8] flex items-start`}
          {...lineAnimation}
        >
          <LineBullet type={line.type} visible={line.bullet} />
          <span>{line.content}{showCursor && <TypingCursor />}</span>
        </motion.div>
      );
    case "dim":
      const dimLink = (line as { link?: string }).link;
      return (
        <motion.div
          className={`${baseClass} text-[#777] flex items-start`}
          {...lineAnimation}
        >
          <LineBullet type={line.type} visible={line.bullet} />
          <span>
            {dimLink ? (
              <a
                href={dimLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terminal-accent hover:underline transition-colors cursor-pointer"
              >
                {line.content}
              </a>
            ) : (
              line.content
            )}
            {showCursor && <TypingCursor />}
          </span>
        </motion.div>
      );
    case "ascii":
      return (
        <motion.div
          className={`font-mono ${isMobile ? 'text-[9px]' : 'text-sm'} leading-tight whitespace-pre overflow-hidden hide-scrollbar`}
          style={{ color: 'var(--accent-orange)', lineHeight: '1.2' }}
          {...lineAnimation}
        >
          {line.content}
        </motion.div>
      );
    case "list-item":
      const listBulletColor = "#d8d8d8"; // Use body text color for all bullets
      const bulletChar = (line as { bulletChar?: string }).bulletChar || "•";
      const listItemLink = (line as { link?: string }).link;
      return (
        <motion.div
          className={`${baseClass} text-[#d8d8d8] ${indentedClass} flex items-start gap-2`}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <span className="flex-shrink-0" style={{ color: listBulletColor, marginTop: '0.1em' }}>{bulletChar}</span>
          <span className="flex-1">
            {listItemLink ? (
              <a
                href={listItemLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terminal-accent hover:underline transition-colors cursor-pointer"
              >
                {line.content}
              </a>
            ) : (
              line.content
            )}
            {showCursor && <TypingCursor />}
          </span>
        </motion.div>
      );
    case "divider":
      return (
        <motion.div
          className="my-2 border-t border-[#444] max-w-full"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
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
          {...lineAnimation}
        >
          <span className="no-underline">{arrowPrefix}</span>
          <span className="underline underline-offset-2">{linkText}</span>
          <span className="text-[#666] no-underline"> ↗</span>
        </motion.a>
      );
    case "blink":
      return (
        <motion.div
          className={`${baseClass} text-[#777]`}
          initial={{ opacity: 0 }}
          animate={isLastBlink ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
          transition={isLastBlink ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.15, ease: "easeOut" }}
        >
          {line.content}
        </motion.div>
      );
    case "blank":
      return <div className="h-3" />;
    case "box-top":
      return (
        <motion.div
          className={`${baseClass} text-terminal-accent border-t-2 border-l-2 border-r-2 border-terminal-accent px-2 py-1`}
          {...lineAnimation}
          style={{ maxWidth: "400px" }}
        >
        </motion.div>
      );
    case "box-content": {
      return (
        <motion.div
          className={`${baseClass} text-[#d8d8d8] border-l-2 border-r-2 border-terminal-accent px-3 py-0.5`}
          {...lineAnimation}
          style={{ maxWidth: "400px" }}
        >
          {line.content}{showCursor && <TypingCursor />}
        </motion.div>
      );
    }
    case "box-bottom":
      return (
        <motion.div
          className={`${baseClass} text-terminal-accent border-b-2 border-l-2 border-r-2 border-terminal-accent px-2 py-1`}
          {...lineAnimation}
          style={{ maxWidth: "400px" }}
        >
        </motion.div>
      );
    case "status-ok":
      return (
        <motion.div
          className={`${baseClass} flex items-center gap-2`}
          {...lineAnimation}
        >
          <span className="text-[#34d399]">[OK]</span>
          <span className="text-[#d8d8d8]">{line.content}{showCursor && <TypingCursor />}</span>
        </motion.div>
      );
    case "status-info":
      return (
        <motion.div
          className={`${baseClass} flex items-center gap-2`}
          {...lineAnimation}
        >
          <span className="text-[#22d3ee]">[INFO]</span>
          <span className="text-[#d8d8d8]">{line.content}{showCursor && <TypingCursor />}</span>
        </motion.div>
      );
    case "system":
      return (
        <motion.div
          className={`${baseClass} text-[#888]`}
          {...lineAnimation}
        >
          <span className="text-[#888]">[system]</span> {line.content}{showCursor && <TypingCursor />}
        </motion.div>
      );
    case "countdown":
      // Parse deadline from content (format: YYYY-MM-DD HH:mm:ss)
      const deadlineDate = new Date(DEADLINE);
      const isKoCountdown = line.content.includes('마감');
      return (
        <motion.div
          className={`${baseClass} text-[#d8d8d8] flex items-start gap-2`}
          {...lineAnimation}
        >
          <span className="text-[#888]">⏰</span>
          <span>
            <span className="text-[#888]">{isKoCountdown ? '지원 마감까지: ' : 'Time left: '}</span>
            <CountdownTimer targetDate={deadlineDate} isKo={isKoCountdown} />
          </span>
        </motion.div>
      );
    default:
      return (
        <motion.div
          className={`${baseClass} text-[#d8d8d8]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {line.content}{showCursor && <TypingCursor />}
        </motion.div>
      );
  }
}
