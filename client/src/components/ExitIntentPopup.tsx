import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp } from "lucide-react";

interface ExitIntentPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartQuiz: () => void;
}

export default function ExitIntentPopup({ open, onOpenChange, onStartQuiz }: ExitIntentPopupProps) {
  const handleStartQuiz = () => {
    onOpenChange(false);
    onStartQuiz();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card backdrop-blur-xl border-2 border-accent/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-destructive mb-4">
            ❓ ДЕЙСТВИТЕЛЬНО ХОТИТЕ СДАТЬСЯ?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-card-foreground font-semibold">
              Мошенники украли ваши деньги<br />
              и надеются, что вы ничего не сделаете
            </p>
            <p className="text-xl font-bold text-accent">
              Не дайте им победить!
            </p>
          </div>

          <div className="bg-success/10 border-2 border-success rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-success" />
              <p className="font-semibold text-card-foreground">Наши клиенты уже вернули:</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-8 h-8 text-success" />
              <p className="text-4xl font-bold text-success">68,000,000</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-card-foreground mb-6">
              Пройдите 1-минутный тест и узнайте,<br />
              можно ли вернуть <span className="font-bold text-accent">ВАШИ</span> деньги
            </p>
            
            <Button
              onClick={handleStartQuiz}
              size="lg"
              className="w-full text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-accent to-secondary hover:scale-105 transition-all duration-300"
              data-testid="button-exit-popup-start"
            >
              🔥 Я хочу вернуть свои деньги
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
