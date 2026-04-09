"use client";

import { useState, useEffect } from "react";
import { DEADLINE } from "@/data/terminalConfig";

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

export function useCountdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft> | null>(null);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    ...(timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }),
    mounted
  };
}
