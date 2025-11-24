import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Star } from "lucide-react";
import QuizProgress from "./QuizProgress";

interface QuizStepProps {
  step: number;
  totalSteps: number;
  timeRemaining: string;
  question: string;
  tip?: string;
  image?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  canProceed: boolean;
}

export default function QuizStep({
  step,
  totalSteps,
  timeRemaining,
  question,
  tip,
  image,
  children,
  onNext,
  onBack,
  canProceed,
}: QuizStepProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-card backdrop-blur-xl border-2 shadow-2xl">
          <div className="p-4 sm:p-6 md:p-10">
            <QuizProgress
              currentStep={step}
              totalSteps={totalSteps}
              timeRemaining={timeRemaining}
            />

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-card-foreground mb-4 md:mb-6">
              {question}
            </h2>

            {/* Mobile image - show between question and answers */}
            {image && (
              <div className="md:hidden mb-4">
                <img
                  src={image}
                  alt="Quiz illustration"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="space-y-3">{children}</div>

              {/* Desktop image - show on the right */}
              {image && (
                <div className="hidden md:flex items-center justify-center">
                  <img
                    src={image}
                    alt="Quiz illustration"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>

            {tip && (
              <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-card-foreground flex items-start gap-2">
                  <span className="text-accent font-bold text-base sm:text-lg">💡</span>
                  <span>{tip}</span>
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
              <div className="flex gap-3 sm:gap-4 order-2 sm:order-1 w-full sm:w-auto">
                {onBack && (
                  <Button
                    variant="outline"
                    onClick={onBack}
                    data-testid="button-back"
                    className="flex-1 sm:flex-initial min-h-11 sm:min-h-10"
                  >
                    ← Назад
                  </Button>
                )}
              </div>

              <Button
                onClick={onNext}
                disabled={!canProceed}
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-accent to-secondary hover:scale-105 transition-all duration-300 order-1 sm:order-2 min-h-12"
                data-testid="button-next"
              >
                <span className="hidden sm:inline">
                  {step === totalSteps ? "Узнать результат →" : `Продолжить → Осталось ${totalSteps - step} вопроса`}
                </span>
                <span className="sm:hidden">
                  {step === totalSteps ? "Узнать результат →" : "Продолжить →"}
                </span>
              </Button>
            </div>
          </div>

          {/* Footer Trust Badges */}
          <div className="bg-muted/30 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm border-t">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
              <span className="text-card-foreground font-semibold">Вернули $68 млн</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-accent fill-accent" />
              <span className="text-card-foreground font-semibold">4.9/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">187 отзывов</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
