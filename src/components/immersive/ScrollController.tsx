"use client";

import { useEffect, useState, useCallback, createContext, useContext, ReactNode } from "react";
import Lenis from "lenis";

interface ScrollContextType {
  scrollProgress: number;
  scrollY: number;
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollProgress: 0,
  scrollY: 0,
  lenis: null,
});

export const useScroll = () => useContext(ScrollContext);

interface ScrollControllerProps {
  children: ReactNode;
}

export default function ScrollController({ children }: ScrollControllerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const updateScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    setScrollY(scrollTop);
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  }, []);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenisInstance.on("scroll", updateScroll);
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      lenisInstance.destroy();
      window.removeEventListener("scroll", updateScroll);
    };
  }, [updateScroll]);

  return (
    <ScrollContext.Provider value={{ scrollProgress, scrollY, lenis }}>
      {children}
    </ScrollContext.Provider>
  );
}
