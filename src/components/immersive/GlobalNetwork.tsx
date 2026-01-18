"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";
import { GLOBAL_NODES } from "@/lib/constants";

interface GlobalNetworkProps {
  scrollProgress: number;
  className?: string;
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe({ scrollProgress }: { scrollProgress: number }) {
  const globeRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate sphere points for wireframe effect
  const spherePoints = useMemo(() => {
    const points: number[] = [];
    const count = 2000;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2;

      points.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }

    return new Float32Array(points);
  }, []);

  // Generate city node positions
  const cityNodes = useMemo(() => {
    return GLOBAL_NODES.map((node) => latLngToVector3(node.lat, node.lng, 2.05));
  }, []);

  // Generate connection lines between cities
  const connections = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    const seoul = cityNodes[0]; // Seoul is primary

    cityNodes.slice(1).forEach((city) => {
      lines.push([seoul, city]);
    });

    return lines;
  }, [cityNodes]);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;

      // Scale and opacity based on scroll
      const targetScale = 0.3 + scrollProgress * 0.7;
      globeRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.05
      );
    }
  });

  const opacity = Math.min(1, scrollProgress * 2);

  return (
    <group ref={globeRef}>
      {/* Sphere wireframe points */}
      <Points ref={pointsRef} positions={spherePoints} stride={3}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.02}
          sizeAttenuation
          opacity={opacity * 0.6}
          depthWrite={false}
        />
      </Points>

      {/* City nodes */}
      {cityNodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[GLOBAL_NODES[i].primary ? 0.08 : 0.05, 16, 16]} />
          <meshBasicMaterial
            color={GLOBAL_NODES[i].primary ? "#00ff88" : "#00ffff"}
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}

      {/* Connection lines */}
      {connections.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#00ffff"
          lineWidth={1}
          transparent
          opacity={opacity * 0.5}
          dashed
          dashScale={10}
          dashSize={0.1}
          gapSize={0.05}
        />
      ))}

      {/* Pulse rings for Seoul */}
      {[0.1, 0.15, 0.2].map((size, i) => (
        <mesh key={`ring-${i}`} position={cityNodes[0]}>
          <ringGeometry args={[size, size + 0.01, 32]} />
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={opacity * (0.5 - i * 0.15)}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function GlobalNetwork({ scrollProgress, className = "" }: GlobalNetworkProps) {
  // Only show when scroll is past initial phase
  const shouldRender = scrollProgress > 0.15;
  const adjustedProgress = shouldRender ? (scrollProgress - 0.15) / 0.85 : 0;

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${className}`}
      style={{
        opacity: Math.min(1, adjustedProgress * 2),
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Globe scrollProgress={adjustedProgress} />
      </Canvas>
    </div>
  );
}
