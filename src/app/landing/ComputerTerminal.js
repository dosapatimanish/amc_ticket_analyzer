// src/app/landing/ComputerTerminal.js
import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';

const ComputerTerminal = () => {
  const { scene } = useGLTF('https://sketchfab.com/3d-models/computer-terminal-b3a26b00c5b04eedad0a1cdca884130f'); // Replace with the actual GLTF URL if available
  const terminalRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(terminalRef.current.position, { y: 0.5, duration: 1, ease: "power1.inOut" });
    tl.to(terminalRef.current.position, { y: 0, duration: 1, ease: "power1.inOut" });
  }, []);

  return (
    <primitive object={scene} ref={terminalRef} />
  );
};

export default ComputerTerminal;