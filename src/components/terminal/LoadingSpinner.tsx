"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SPINNER_FRAMES, LOADING_MESSAGES } from "@/data/terminalConfig";

export function LoadingSpinner({
  sectionId,
  messageIndex,
  language,
  isMobile,
}: {
  sectionId: string;
  messageIndex: number;
  language: string;
  isMobile: boolean;
}) {
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  const [progress, setProgress] = useState(0);
  const messages = LOADING_MESSAGES[sectionId];
  const langMessages = language === "ko" ? messages?.ko : messages?.en;
  const currentMessage = langMessages?.[messageIndex] || "";
  const totalMessages = langMessages?.length || 1;
  const isDone = messageIndex === totalMessages - 1;

  useEffect(() => {
    if (isDone) {
      setProgress(100);
      return;
    }
    const interval = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 80);
    return () => clearInterval(interval);
  }, [isDone]);

  useEffect(() => {
    const targetProgress = ((messageIndex + 1) / totalMessages) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= targetProgress) {
          clearInterval(timer);
          return targetProgress;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [messageIndex, totalMessages]);

  const baseClass = `font-mono ${isMobile ? "text-sm" : "text-sm"} leading-relaxed`;
  const barLength = 20;
  const filledLength = Math.round((progress / 100) * barLength);
  const progressBar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

  return (
    <motion.div
      className={`${baseClass} flex flex-col gap-1 min-h-[48px]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center gap-2">
        {isDone ? (
          <>
            <span className="text-[#34d399]">✓</span>
            <span className="text-[#34d399]">{currentMessage}</span>
          </>
        ) : (
          <>
            <span className="text-terminal-accent">{SPINNER_FRAMES[spinnerFrame]}</span>
            <span className="text-[#888]">{currentMessage}</span>
          </>
        )}
      </div>
      {!isDone && (
        <div className="flex items-center gap-2 text-[#666]">
          <span className="text-terminal-accent">[{progressBar}]</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </motion.div>
  );
}

export function ThinkingIndicator({ language, isMobile }: { language: string; isMobile: boolean }) {
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  const isKo = language === "ko";

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const baseClass = `font-mono ${isMobile ? "text-sm" : "text-sm"} leading-relaxed`;

  return (
    <motion.div
      className={`${baseClass} flex items-center gap-2 min-h-[48px]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className="text-[#fbbf24]">{SPINNER_FRAMES[spinnerFrame]}</span>
      <span className="text-[#888]">{isKo ? "생각 중..." : "Thinking..."}</span>
    </motion.div>
  );
}
