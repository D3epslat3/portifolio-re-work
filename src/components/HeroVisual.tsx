"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CoolJellyObject() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const { x, y } = state.mouse;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.4, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.4, 0.03);
    meshRef.current.rotation.z += 0.002;
  });

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.1}>

        <torusKnotGeometry args={[1.15, 0.32, 200, 32, 3, 5]} />
        
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={2.5} 
          chromaticAberration={0.5} 
          anisotropy={0.3}
          distortion={2.0} 
          distortionScale={0.6}
          temporalDistortion={0.3}
          ior={1.5}
          color="#5500ff"
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function HeroVisual() {
  return (
    // Mantemos o bloqueio de toque no mobile para não travar o scroll
    <div className="w-full h-full pointer-events-none lg:pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 2]}>
        <Environment preset="city" /> 
        <ambientLight intensity={0.4} />
        
        <pointLight position={[8, 5, 8]} intensity={3} color="#5500ff" distance={20} />
        <pointLight position={[-8, -8, -5]} intensity={3} color="#00ffff" distance={20} />
        <pointLight position={[5, -5, 5]} intensity={2} color="#ff00ff" distance={20} />

        <CoolJellyObject />
      </Canvas>
    </div>
  );
}