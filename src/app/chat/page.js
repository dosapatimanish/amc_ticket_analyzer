"use client"; // Ensure this is included for Next.js client components
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap"; // Import GSAP
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from "./page.module.css"; // Ensure you import your CSS module
import { TextPlugin } from "gsap/TextPlugin";
import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import dynamic from 'next/dynamic';

const ChatComponent = dynamic(() => import('./ChatComponent'), {
  ssr: false, // Ensure this part only renders on the client-side
});


export default function chat() {
  gsap.registerPlugin(TextPlugin);
  const [isOpen, setIsOpen] = useState(false); // State to track menu status
  const [isAnalyzing, setIsAnalyzing] = useState(false); // State to track if analyzing
  const menuRef = useRef(null); // Ref for the menu
  const barsRef = useRef([]); // Ref for the hamburger bars
  const dropdownsRef = useRef([]); // Ref for the dropdowns
  const hamburgerRef = useRef(null); // Ref for the hamburger icon
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const inputRef = useRef(null);
  const searchParams = useSearchParams();
  const [FinalResponse, setFinalResponse] = useState("");
  const resultRef = useRef(null); // Ref to target the result container

  useEffect(() => {
    if (FinalResponse && resultRef.current) {
      // Format FinalResponse to insert a new line before numbers
      const formattedResponse = FinalResponse.replace(/(\d+)/g, '\n$1').replace(/\n/g, '<br>');
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.5 } }); // Slower animation
      
      // Animate opacity and width
      tl.fromTo(
        resultRef.current,
        { opacity: 0, width: "0%" },
        { opacity: 1, width: "100%", duration: 3 }
      );
  
      // Update resultRef content with formatted text
      resultRef.current.innerHTML = formattedResponse;
    }
  }, [FinalResponse]);
  
  
  

  // Extract the 'accesstoken' from the query string
  const accessToken = searchParams.get('accesstoken');

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.2 } }); // Fast animation

    if (isOpen) {
      tl.to(barsRef.current[0], { rotation: 0, y: 0 }) // Top bar to normal
        .to(barsRef.current[1], { opacity: 1 }, "-=0.05") // Middle bar back
        .to(barsRef.current[2], { rotation: 0, y: 0 }, "-=0.05") // Bottom bar to normal
        .to(menuRef.current, { x: "100%" }); // Close the menu
      tl.to(dropdownsRef.current[0], { opacity: 0, y: -20 }) // Close first dropdown
        .to(dropdownsRef.current[1], { opacity: 0, y: -20 }, "-=0.1"); // Close second dropdown
    } else {
      tl.to(barsRef.current[0], { rotation: 45, y: 7 }) // Top bar to 45° rotation
        .to(barsRef.current[1], { opacity: 0 }, "-=0.05") // Hide middle bar
        .to(barsRef.current[2], { rotation: -45, y: -7 }, "-=0.05") // Bottom bar to -45° rotation
        .to(menuRef.current, { x: "0%" }); // Open the menu
      tl.to(dropdownsRef.current[0], { opacity: 1, y: 0 }) // Show first dropdown
        .to(dropdownsRef.current[1], { opacity: 1, y: 0 }, "-=0.1"); // Show second dropdown
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside = (event) => {
        if (
          isOpen &&
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleInput = (e) => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.style.height = "auto"; // Reset height to auto
      inputElement.style.height = `${inputElement.scrollHeight}px`; // Set height to match content
    }
    setSearchQuery(e.target.value); // Update state with the input value
  };

  const handleAnalyze = async (e) => {
    alert("Please wait for 25 seconds as pass API to purple Fabric Queue and wait for response")
    console.log("GJ "+accessToken);
    setIsAnalyzing(true); // Disable input and button
    e.preventDefault(); // Prevent form submission
   
    try {
        const response = await fetch("/api/proxy2", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Summary: searchQuery,
            accessToken:accessToken
          }),
      });
      
      const data = await response.json();
      

      // Store response in a variable
      console.log("API Response:", data);

      if (data.trace_id) {
        // Introduce delay of 5 seconds before calling the second API
        setTimeout(async () => {
          try {
            const response2 = await fetch("/api/proxy3", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                trace_id: data.trace_id,
                accessToken: accessToken,
              }),
            });
            const data1 = await response2.json();
            console.log("API Response 2:", data1);
            if(data1.response.output!=null);
           { console.log(data1.response.output[0].output_parameters.Answer);
            setFinalResponse(data1.response.output[0].output_parameters.Answer);
            
           }
            // Store response in a variable
            console.log("API Response 2:", data1);
          } catch (error) {
            console.error("Error during second API call:", error);
          }
        }, 30000); // Delay of 5 seconds
        
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setIsAnalyzing(false); // Disable input and button
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  

  const handleClear = () => {
    setSearchQuery(""); // Clear input field
    setIsAnalyzing(false); // Enable input and button
    setFinalResponse("");
    if (resultRef.current) {
      resultRef.current.innerHTML = ""; 
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className={styles.main}>
      <div className={styles.centeredTitle}>
        <h1>AI Powered Predictive Solution Provider</h1>

        <div className={styles.searchContainer}>
          <textarea
            ref={inputRef}
            className={styles.searchInput}
            placeholder="Summary..."
            value={searchQuery}
            onInput={handleInput} // Dynamically adjust height
            disabled={isAnalyzing} // Disable input while analyzing
          />
          <div className={styles.buttons}>
          <button
            className={styles.searchButton}
            onClick={handleAnalyze}
            disabled={isAnalyzing} // Disable button while analyzing
          >
            Analyze
          </button>
          <button className={styles.clearButton} onClick={handleClear}>
            Clear
          </button>
          </div>
        </div>
        <div className={styles.resultContainer}>
  <div className={styles.resultText} ref={resultRef}></div>
</div>

      </div>

      {/* Hamburger Button */}
      <div className={styles.container}>
        <div
          className={styles.hamburger}
          onClick={toggleMenu}
          ref={hamburgerRef}
        >
          <div
            className={styles.bar}
            ref={(el) => (barsRef.current[0] = el)}
          ></div>
          <div
            className={styles.bar}
            ref={(el) => (barsRef.current[1] = el)}
          ></div>
          <div
            className={styles.bar}
            ref={(el) => (barsRef.current[2] = el)}
          ></div>
        </div>

        {/* Menu */}
        <div className={styles.menu} ref={menuRef}>
          {/* First Dropdown */}
          <div
            className={styles.dropdown}
            ref={(el) => (dropdownsRef.current[0] = el)}
          >
            <select className={styles.select}>
              <option value="DTB">DTB</option>
            </select>
          </div>

          {/* Second Dropdown */}
          <div
            className={styles.dropdown}
            ref={(el) => (dropdownsRef.current[1] = el)}
          >
            <select className={styles.select}>
              <option value="BOJ">BOJ</option>
              <option value="COOP">COOP</option>
              <option value="AXIS">AXIS</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
}
