import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalyzingScreenProps {
  onComplete: () => void;
  recoveryProbability: number;
}

const analysisSteps = [
  "Анализируем тип компании...",
  "Проверяем давность мошенничества...",
  "Оцениваем наличие документов...",
  "Анализируем способ оплаты...",
  "Подготавливаем стратегию возврата...",
  "Рассчитываем вероятность успеха...",
];

export default function AnalyzingScreen({ onComplete, recoveryProbability }: AnalyzingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const totalDuration = 3500;
    const interval = 50;
    const increment = (100 / totalDuration) * interval;
    const stepDuration = totalDuration / analysisSteps.length;

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100));
    }, interval);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    const completeTimer = setTimeout(() => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      setProgress(100);
      setTimeout(() => {
        onCompleteRef.current();
      }, 500);
    }, totalDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-card backdrop-blur-xl border-2 shadow-2xl p-8 sm:p-12">
          <div className="text-center space-y-8">
            {/* Animated Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/20 mb-4 animate-pulse">
              <div className="text-4xl sm:text-5xl">🔍</div>
            </div>

            {/* Main Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                Анализируем ваш случай
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Пожалуйста, подождите несколько секунд...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
              <Progress value={progress} className="h-3 sm:h-4" />
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  {analysisSteps[currentStep]}
                </span>
                <span className="font-bold text-accent text-base sm:text-lg">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Preview of result (shows near the end) */}
            {progress > 80 && (
              <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/30 animate-in fade-in duration-500">
                <p className="text-sm text-muted-foreground mb-1">
                  Предварительная оценка:
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-success">
                  {recoveryProbability}% вероятность возврата
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
