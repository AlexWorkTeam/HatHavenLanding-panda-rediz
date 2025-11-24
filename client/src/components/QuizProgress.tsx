import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  timeRemaining: string;
}

export default function QuizProgress({ currentStep, totalSteps, timeRemaining }: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-3 mb-8">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-card-foreground">
          Шаг {currentStep} из {totalSteps}
        </span>
        <span className="text-muted-foreground">
          Осталось {timeRemaining}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-all ${
              idx < currentStep ? "bg-accent" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
