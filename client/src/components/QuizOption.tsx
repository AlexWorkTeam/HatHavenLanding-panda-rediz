import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  icon?: string;
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
  testId?: string;
}

export default function QuizOption({ icon, title, subtitle, selected, onClick, testId }: QuizOptionProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg border-2 min-h-[72px] sm:min-h-[80px]",
        selected 
          ? "border-accent bg-accent/10 shadow-lg" 
          : "border-card-border hover:border-accent/50"
      )}
      data-testid={testId}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/20 flex items-center justify-center">
          {selected ? (
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-accent" />
          ) : (
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-muted" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {icon && <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{icon}</div>}
          <h3 className="font-semibold text-card-foreground mb-1 text-sm sm:text-base leading-tight">{title}</h3>
          {subtitle && <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
}
