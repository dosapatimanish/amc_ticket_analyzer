"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, TextPlugin } from "gsap/all";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

gsap.registerPlugin(TextPlugin);

export default function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null); 
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const popupRef = useRef(null); // Ref for the popup container
    const marqueeRef = useRef(null);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true); // Set to true once the component has mounted
      }, []);
    
    const handleClearInput = (field) => {
        setFormData((prevData) => ({ ...prevData, [field]: "" }));
    };

    const handleClearAll = () => {
        setFormData({ username: "", password: "" });
        setErrorMessage("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    
    useEffect(() => {
        const finalText = "AMC TICKET ANALYZER";
        const chars = "!@#$%^&*()_+{}:?><~"; // Gibberish characters
        const duration = 10; // Total duration of the effect
        const scrambleSpeed = 100; // Interval for scrambling in milliseconds
        const initialDelay = 6500; // Delay before starting scramble in milliseconds
        let currentIndex = 0;

        const scramble = () => {
            if (currentIndex < finalText.length) {
                const scrambledText =
                    finalText.slice(0, currentIndex) +
                    chars.charAt(Math.floor(Math.random() * chars.length));
                titleRef.current.innerText = scrambledText;

                setTimeout(() => {
                    currentIndex++;
                    scramble();
                }, scrambleSpeed);
            } else {
                // Final resolved text
                titleRef.current.innerText = finalText;
            }
        };

        // Start scrambling after the delay
        setTimeout(() => {
            scramble();
        }, initialDelay);

        // Optional: Smooth fade-in with GSAP
        gsap.to(titleRef.current, {
            opacity: 1,
            duration: duration,
            delay: initialDelay / 1000, // GSAP delay is in seconds
            ease: "power3.out",
        });
    }, []);

    useEffect(() => {
        const timeline = gsap.timeline();
        timeline.to(marqueeRef.current, {
            x: "-100%", // Move left
            duration: 50, // Duration for one complete scroll
            repeat: -1, // Infinite scroll
            ease: "linear", // Consistent speed
        });
        
    }, []);


    
  useEffect(() => {
    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowLoginPopup(false); // Close popup when click happens outside
        }
    };

    // Attach event listener to the document
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
    };
}, []);

    const handleLoginClick = () => {
        setShowLoginPopup(true); // Show the login popup when clicked
    };

    const handleClosePopup = () => {
        setShowLoginPopup(false); // Close the popup
    };

    const handleTeamClick = () => {
        // Logic to navigate to About page
        console.log("Team clicked");
        // You can use a router to navigate to the About page
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        
       

        try {
            // Prepare API call
            const response = await fetch("/api/proxy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });
            
            const data = await response.json();
            

            // Store response in a variable
            console.log("API Response:", data);

            // Check for accessToken and active status
            if (data.access_token && data.active === true) {
                console.log("Success");
                if (isClient) {
                    router.push(`/chat?accesstoken=${data.access_token}`);
                    
                  }

                
            } else {
                setErrorMessage("Incorrect Username or Password");
            }
        } catch (error) {
            console.error("Error during API call:", error);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    const callProxyApi = async () => {
        try {
            const response = await fetch("/api/proxy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "your-username", // Replace with actual username
                    password: "your-password", // Replace with actual password
                }),
            });
    
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("Response from proxy:", data);
        } catch (error) {
            console.error("Error calling proxy API:", error.message);
        }
    };
    
return(
    <div>
          {/* News Scroll */}
      <div className={styles.newsScroll}>

      
        <div className={styles.newsContent} ref={marqueeRef}>
        <span>Your Problem is in Good Hands <b>• Asking right questions , is the solution to all the problems!</b>

            
      <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ verticalAlign: "middle", transform: "translateY(-2px)" }}
              >
                <path d="M12 2 L18 8 L12 14 L6 8 Z" />
                <path d="M12 14 L18 20 L12 22 L6 20 Z" />
                <path d="M6 8 L12 14 L18 8" />
              </svg>
        </span>
        <span>Your Problem is in Good Hands <b>• Asking right questions , is the solution to all the problems!</b>

            
      <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ verticalAlign: "middle", transform: "translateY(-2px)" }}
              >
                <path d="M12 2 L18 8 L12 14 L6 8 Z" />
                <path d="M12 14 L18 20 L12 22 L6 20 Z" />
                <path d="M6 8 L12 14 L18 8" />
              </svg>
        </span>
        <span>Your Problem is in Good Hands <b>• Asking right questions , is the solution to all the problems!</b>

            
      <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ verticalAlign: "middle", transform: "translateY(-2px)" }}
              >
                <path d="M12 2 L18 8 L12 14 L6 8 Z" />
                <path d="M12 14 L18 20 L12 22 L6 20 Z" />
                <path d="M6 8 L12 14 L18 8" />
              </svg>
        </span>
        <span>Your Problem is in Good Hands <b>• Asking right questions , is the solution to all the problems!</b>
            
      <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ verticalAlign: "middle", transform: "translateY(-2px)" }}
              >
                <path d="M12 2 L18 8 L12 14 L6 8 Z" />
                <path d="M12 14 L18 20 L12 22 L6 20 Z" />
                <path d="M6 8 L12 14 L18 8" />
              </svg>
        </span>
        <span>Your Problem is in Good Hands <b>• Asking right questions , is the solution to all the problems!</b>

            
      <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ verticalAlign: "middle", transform: "translateY(-2px)" }}
              >
                <path d="M12 2 L18 8 L12 14 L6 8 Z" />
                <path d="M12 14 L18 20 L12 22 L6 20 Z" />
                <path d="M6 8 L12 14 L18 8" />
              </svg>
        </span>
        <span>Your Problem is in Good Hands <b>• Asking right questions , is the solution to all the problems!</b>
            
      <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ verticalAlign: "middle", transform: "translateY(-2px)" }}
              >
                <path d="M12 2 L18 8 L12 14 L6 8 Z" />
                <path d="M12 14 L18 20 L12 22 L6 20 Z" />
                <path d="M6 8 L12 14 L18 8" />
              </svg>
        </span>
        </div>

       
      </div>


<div className={styles.hero} ref={heroRef}>
        <h1 className={styles.heroText}>eMACH.ai</h1>
        <h1 className={styles.centeredText} ref={titleRef}></h1> {/* New centered title */}
        <div className={styles.menu}>
                <button className={styles.button} onClick={handleLoginClick}>Login</button>
                <button className={styles.button} onClick={handleTeamClick}>Team</button>
        </div>

                            {/* Login Popup */}
                            {showLoginPopup && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popup} ref={popupRef}>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="username">Username</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                    />
                                    {formData.username && (
                                        <button
                                            type="button"
                                            className={styles.clearButton}
                                            onClick={() => handleClearInput("username")}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="password">Password</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                    />
                                    {formData.password && (
                                        <button
                                            type="button"
                                            className={styles.clearButton}
                                            onClick={() => handleClearInput("password")}
                                        >
                                            ✕
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className={styles.showPasswordButton}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>
                            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                            <div className={styles.buttonContainer}>
                                <button type="button" onClick={handleClearAll} className={styles.clearAllButton}>
                                    Clear All
                                </button>
                                <button type="button" onClick={() => setShowLoginPopup(false)} className={styles.closeButton}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitButton}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        
      </div>
      </div>
);
}