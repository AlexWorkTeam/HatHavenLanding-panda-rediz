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
          <div className="p-6 md:p-10">
            <QuizProgress
              currentStep={step}
              totalSteps={totalSteps}
              timeRemaining={timeRemaining}
            />

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-6">
                  {question}
                </h2>
                <div className="space-y-3">{children}</div>
              </div>

              {image && (
                <div className="hidden md:block">
                  <img
                    src={image}
                    alt="Quiz illustration"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>

            {tip && (
              <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-4 mb-6">
                <p className="text-sm text-card-foreground flex items-start gap-2">
                  <span className="text-accent font-bold">💡</span>
                  {tip}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 order-2 sm:order-1">
                {onBack && (
                  <Button
                    variant="outline"
                    onClick={onBack}
                    data-testid="button-back"
                  >
                    ← Назад
                  </Button>
                )}
              </div>

              <Button
                onClick={onNext}
                disabled={!canProceed}
                size="lg"
                className="w-full sm:w-auto text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-accent to-secondary hover:scale-105 transition-all duration-300 order-1 sm:order-2"
                data-testid="button-next"
              >
                {step === totalSteps ? "Узнать результат →" : `Продолжить → Осталось ${totalSteps - step} вопроса`}
              </Button>
            </div>
          </div>

          {/* Footer Trust Badges */}
          <div className="bg-muted/30 px-6 py-4 flex flex-wrap justify-center gap-6 text-sm border-t">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-success" />
              <span className="text-card-foreground font-semibold">Вернули $68 млн</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-card-foreground font-semibold">4.9/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">187 отзывов</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
