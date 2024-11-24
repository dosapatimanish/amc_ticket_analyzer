// src/app/landing/SimpleAnimation.js
"use client"; // Ensure this is included for Next.js client components
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Import GSAP
import styles from './page.module.css'; // Ensure you import your CSS module

export default function SimpleAnimation() {
  const boxRef = useRef(null); // Create a ref for the box

  useEffect(() => {
    // GSAP animation for moving the box
    const animation = gsap.to(boxRef.current, {
      x: 300, // Move 300px to the right
      duration: 2, // Duration of the animation
      ease: 'power1.inOut', // Easing function
    });

    // Cleanup function to kill the animation if the component unmounts
    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box} ref={boxRef}>
        🚀 Move Me!
      </div>
    </div>
  );
}