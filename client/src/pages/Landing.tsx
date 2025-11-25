import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import HeroSection from "@/components/HeroSection";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Footer from "@/components/Footer";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);

  // Save landing URL with UTM parameters on first load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      // Save the full URL with UTM parameters to sessionStorage
      // This will be used when submitting the form
      sessionStorage.setItem('landingUrl', currentUrl);
    }
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitPopup) {
        setShowExitPopup(true);
        setHasShownExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExitPopup]);

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
