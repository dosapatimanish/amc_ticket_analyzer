"use client"; // Ensure this is included for Next.js client components
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap"; // Import GSAP
import styles from "./page.module.css"; // Ensure you import your CSS module
import { TextPlugin } from "gsap/TextPlugin"; // Ensure this is properly imported

export default function ChatComponent() {
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [finalResponse, setFinalResponse] = useState("");
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  // Set token from URL search params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get('accesstoken'));
  }, []);

  // Simulate API response animation
  useEffect(() => {
    if (finalResponse && resultRef.current) {
      const formattedResponse = finalResponse.replace(/(\d+)/g, '\n$1').replace(/\n/g, '<br>');
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.5 } });

      tl.fromTo(resultRef.current, { opacity: 0, width: "0%" }, { opacity: 1, width: "100%", duration: 3 });
      resultRef.current.innerHTML = formattedResponse;
    }
  }, [finalResponse]);

  // Handle analyze click
  const handleAnalyze = async (e) => {
    alert("Please wait 30 Seconds as we fetch the details from Purple Fabric");
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/proxy2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Summary: searchQuery, accessToken: token }),
      });

      const data = await response.json();
      if (data.trace_id) {
        setTimeout(async () => {
          const response2 = await fetch("/api/proxy3", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trace_id: data.trace_id, accessToken: token }),
          });
          const data1 = await response2.json();
          if (data1.response.output != null) {
            setFinalResponse(data1.response.output[0].output_parameters.Answer);
          }
        }, 40000);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setIsAnalyzing(false);
    }
  };

  // Handle input change
  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
    setIsAnalyzing(false);
    setFinalResponse("");
    if (resultRef.current) {
      resultRef.current.innerHTML = "";
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.centeredTitle}>
        <h1>AI Powered Predictive Solution Provider</h1>
        <div className={styles.searchContainer}>
          <textarea
            ref={inputRef}
            className={styles.searchInput}
            placeholder="Summary..."
            value={searchQuery}
            onChange={handleInput}
            disabled={isAnalyzing}
          />
          <div className={styles.buttons}>
            <button
              className={styles.searchButton}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
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
    </div>
  );
}
