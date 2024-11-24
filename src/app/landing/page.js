"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./page.module.css";
import Hero from "./Hero";

export default function landing() {
  const fillerRef = useRef(null);
  const pointerRef = useRef(null);
  const loaderRef = useRef(null);
  
  const [emoji, setEmoji] = useState("🥈");

  useEffect(() => {
    const timeline = gsap.timeline();

    gsap.set(loaderRef.current, { zIndex: 2 });
    gsap.set(loaderRef.current, { y: "0%" });

    timeline.to(fillerRef.current, {
      width: "100%",
      duration: 5,
      ease: "power1.inOut",
      onUpdate: () => {
        const fillerWidth = fillerRef.current.offsetWidth;
        pointerRef.current.style.left = `${fillerWidth}px`;
      },
    });

    timeline.add(() => {
      setEmoji("🥇");
    });

    timeline.to(loaderRef.current, {
      y: "-100%",
      duration: 2,
      ease: "power3.inOut",
     
    });

    

    return () => {
      timeline.kill();
    };

    
  }, []);

  

  return (
    <div className={styles.container}>
       <div className={styles.loader} ref={loaderRef}>
        <div className={styles.outline}>
          <div className={styles.filler} ref={fillerRef}></div>
          <span
            className={styles.pointer}
            ref={pointerRef}
            style={{ position: "absolute" }}
          >
            {emoji}
          </span>
        </div>
      </div> 
      <Hero/>
    </div>
  );
}
