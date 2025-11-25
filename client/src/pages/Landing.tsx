import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import HeroSection from "@/components/HeroSection";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Footer from "@/components/Footer";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);
  const [canShowExitPopup, setCanShowExitPopup] = useState(false);

  // Save landing URL with UTM parameters on first load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      // Save the full URL with UTM parameters to sessionStorage
      // This will be used when submitting the form
      sessionStorage.setItem('landingUrl', currentUrl);
    }
  }, []);

  // Enable exit popup after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanShowExitPopup(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle exit intent - only show if user spent at least 30 seconds on site
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only show popup if:
      // 1. User spent at least 30 seconds on site (canShowExitPopup)
      // 2. Mouse is leaving the top of the screen (e.clientY <= 0)
      // 3. Popup hasn't been shown yet (!hasShownExitPopup)
      if (e.clientY <= 0 && !hasShownExitPopup && canShowExitPopup) {
        setShowExitPopup(true);
        setHasShownExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExitPopup, canShowExitPopup]);

  const handleStartQuiz = () => {
    setLocation("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection onStartQuiz={handleStartQuiz} />
      <Footer />
      <ExitIntentPopup
        open={showExitPopup}
        onOpenChange={setShowExitPopup}
        onStartQuiz={handleStartQuiz}
      />
    </div>
  );
}
