"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Stars() {
  const ref = useRef<THREE.Points>(null);

  const positions = new Float32Array(3000).map(() => THREE.MathUtils.randFloatSpread(5));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05; 
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#6366f1" 
          size={0.02}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 60 }}
      className="absolute inset-0 z-0"
    >
      <color attach="background" args={["#0f172a"]} /> 
      <Stars />
    </Canvas>
  );
}
