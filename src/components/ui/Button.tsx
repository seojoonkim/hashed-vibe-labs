"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  glowing?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  glowing = false,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  const baseStyles = "relative font-mono font-medium transition-all duration-300 overflow-hidden";

  const variants = {
    primary:
      "bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20 hover:border-primary",
    secondary:
      "bg-accent/10 text-accent border border-accent/50 hover:bg-accent/20 hover:border-accent",
    ghost: "bg-transparent text-foreground border border-muted/30 hover:border-muted",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        glowing && "animate-pulse-glow",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Glitch effect on hover */}
      <span className="relative z-10">{children}</span>

      {/* Animated border glow */}
      {glowing && (
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            background: `linear-gradient(90deg, transparent, ${
              variant === "primary" ? "rgba(0,255,255,0.3)" : "rgba(0,255,136,0.3)"
            }, transparent)`,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.button>
  );
}
