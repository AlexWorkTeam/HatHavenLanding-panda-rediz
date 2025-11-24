import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import HeroSection from "@/components/HeroSection";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);

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
    <>
      <HeroSection onStartQuiz={handleStartQuiz} />
      <ExitIntentPopup
        open={showExitPopup}
        onOpenChange={setShowExitPopup}
        onStartQuiz={handleStartQuiz}
      />
    </>
  );
}
