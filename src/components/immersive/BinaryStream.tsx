"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  char: string;
  speed: number;
  opacity: number;
  size: number;
}

interface BinaryStreamProps {
  scrollProgress: number;
  className?: string;
}

export default function BinaryStream({ scrollProgress, className = "" }: BinaryStreamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = Math.min(200, Math.floor((width * height) / 10000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000,
        char: Math.random() > 0.5 ? "1" : "0",
        speed: 0.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.5,
        size: 10 + Math.random() * 6,
      });
    }

    particlesRef.current = particles;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const focalLength = 300;

    // Clear canvas with fade effect
    ctx.fillStyle = "rgba(5, 5, 8, 0.15)";
    ctx.fillRect(0, 0, width, height);

    // Calculate acceleration based on scroll progress
    const acceleration = 1 + scrollProgress * 15;
    const tunnelEffect = scrollProgress > 0.1 ? (scrollProgress - 0.1) * 2 : 0;

    // Sort particles by z for proper depth rendering
    const sortedParticles = [...particlesRef.current].sort((a, b) => b.z - a.z);

    sortedParticles.forEach((particle, index) => {
      // Update z position (moving toward viewer)
      particle.z -= particle.speed * acceleration;

      // Reset particle when it passes the viewer
      if (particle.z < 1) {
        particle.z = 1000;
        particle.x = (Math.random() - 0.5) * width * 2;
        particle.y = (Math.random() - 0.5) * height * 2;
        particle.char = Math.random() > 0.5 ? "1" : "0";
      }

      // Calculate perspective projection
      const scale = focalLength / (focalLength + particle.z);
      const screenX = centerX + particle.x * scale;
      const screenY = centerY + particle.y * scale;

      // Calculate opacity based on depth and scroll
      const depthOpacity = Math.min(1, scale * 3) * particle.opacity;
      const finalOpacity = depthOpacity * (0.3 + scrollProgress * 0.7);

      // Only draw if on screen
      if (screenX > -50 && screenX < width + 50 && screenY > -50 && screenY < height + 50) {
        const fontSize = particle.size * scale;

        // Draw motion blur / streak for tunnel effect
        if (tunnelEffect > 0 && scale > 0.3) {
          const streakLength = tunnelEffect * 50 * scale;
          const angle = Math.atan2(screenY - centerY, screenX - centerX);

          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(
            screenX - Math.cos(angle) * streakLength,
            screenY - Math.sin(angle) * streakLength
          );
          ctx.strokeStyle = `rgba(0, 255, 255, ${finalOpacity * 0.3})`;
          ctx.lineWidth = fontSize * 0.3;
          ctx.stroke();
        }

        // Draw binary character
        ctx.font = `${Math.max(8, fontSize)}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Color gradient based on distance
        const hue = 180 + (particle.z / 1000) * 20; // Cyan to slightly green
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${finalOpacity})`;
        ctx.fillText(particle.char, screenX, screenY);

        // Add glow for nearby particles
        if (scale > 0.5 && scrollProgress > 0.2) {
          ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
          ctx.shadowBlur = 10 * scale;
          ctx.fillText(particle.char, screenX, screenY);
          ctx.shadowBlur = 0;
        }
      }

      particlesRef.current[index] = particle;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
