import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars } from "@react-three/drei";
import * as THREE from "three";

function Heart({ position, velocity, bounds, onClick }) {
  const ref = useRef();
  const { scene } = useGLTF("/LoveHeart.glb");

  // Clone the GLTF scene to ensure each heart is unique
  const heartScene = useMemo(() => {
    const clonedScene = scene.clone();
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({ color: "red" });
      }
    });
    return clonedScene;
  }, [scene]);

  // Mutable vector to avoid re-renders
  const pos = useMemo(() => new THREE.Vector3(...position), [position]);
  const vel = useMemo(() => new THREE.Vector3(...velocity).multiplyScalar(2), [velocity]); // Set high initial velocity

  useFrame(() => {
    pos.add(vel);

    // Dynamic screen bounds based on viewport size
    const dynamicBounds = {
      x: bounds.width / 100,
      y: bounds.height / 100,
      z: 3,
    };

    // Bounce logic
    if (Math.abs(pos.x) > dynamicBounds.x) {
      pos.x = Math.sign(pos.x) * dynamicBounds.x;
      vel.x *= -1;
    }
    if (Math.abs(pos.y) > dynamicBounds.y) {
      pos.y = Math.sign(pos.y) * dynamicBounds.y;
      vel.y *= -1;
    }
    if (Math.abs(pos.z) > dynamicBounds.z) {
      pos.z = Math.sign(pos.z) * dynamicBounds.z;
      vel.z *= -1;
    }

    if (ref.current) {
      ref.current.position.copy(pos);
    }
  });

  return (
    <primitive 
      ref={ref} 
      object={heartScene} 
      scale={0.03} 
      frustumCulled={false} 
      onClick={() => onClick(ref, vel)}
    />
  );
}

export default function BouncingHearts() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hearts = useMemo(
    () => Array.from({ length: 200 }, () => ({
      position: [Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3],
      velocity: [(Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03],
    })),
    []
  );

  const handleClick = useCallback((heartRef, velocity) => {
    if (heartRef.current) {
      velocity.y += 0.1; // Add upward bounce effect on click
    }
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 10] }} style={{ width: size.width, height: size.height, position: "absolute", top: 0, left: 0 }}>
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      {hearts.map((heart, index) => (
        <Heart 
          key={index} 
          position={heart.position} 
          velocity={heart.velocity} 
          bounds={size} 
          onClick={handleClick}
        />
      ))}
    </Canvas>
  );
}