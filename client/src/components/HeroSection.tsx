import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingUp } from "lucide-react";
import heroImage from "@assets/hero-main.png";

const cases = [
  {
    name: "FINIKO",
    loss: "5800$",
    recovered: "4640$ (80%)",
    duration: "90 дней",
    testimonial: "Думала, деньги потеряны. Юристы LegalRefund смогли вернуть через суд",
    client: "Alex, Нью-Йорк"
  },
  {
    name: "CRYPTO EXCHANGE",
    loss: "$12,400",
    recovered: "$11,160 (90%)",
    duration: "75 дней",
    testimonial: "Не верил, что можно вернуть с криптобиржи. Команда доказала обратное!",
    client: "Michael, Калифорния"
  },
  {
    name: "FOREX BROKER",
    loss: "$8,900",
    recovered: "$7,565 (85%)",
    duration: "60 дней",
    testimonial: "Профессиональный подход. Вернули деньги за 2 месяца!",
    client: "Sarah, Техас"
  }
];

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export default function HeroSection({ onStartQuiz }: HeroSectionProps) {
  const [currentCase, setCurrentCase] = useState(0);
  const [liveCount] = useState(17); // Mock real-time counter

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCase((prev) => (prev + 1) % cases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with glassmorphism overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight px-2">
              ВЕРНЁМ ВАШИ ДЕНЬГИ ОТ<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>ИНТЕРНЕТ-МОШЕННИКОВ
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 font-semibold px-2">
              Законно, через суд, без предоплаты
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 px-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary-foreground">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base md:text-lg">$68M возвращено</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary-foreground">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base md:text-lg">250+ дел</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary-foreground">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base md:text-lg">92% успеха</span>
              </div>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-8 sm:mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
              Специализируемся на возврате от нечестных бирж, брокеров, онлайн-казино
              и других финансовых пирамид
            </p>

            {/* CTA Button */}
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 font-bold uppercase tracking-wide bg-gradient-to-r from-accent to-secondary hover:scale-105 transition-all duration-300 shadow-2xl mb-4 sm:mb-6 w-full sm:w-auto max-w-md mx-auto min-h-14"
              data-testid="button-start-quiz"
            >
              <span className="hidden sm:inline">🔥 Можно ли вернуть мои деньги? →</span>
              <span className="sm:hidden">🔥 Узнать, можно ли вернуть деньги →</span>
            </Button>

            <p className="text-sm sm:text-base text-primary-foreground/80 mb-2 px-4 leading-relaxed">
              Бесплатная оценка за 24 часа<br className="sm:hidden" />
              <span className="sm:hidden"> </span><span className="hidden sm:inline"> | </span>
              Платите только с результата
            </p>
            
            {/* Live counter */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-primary-foreground/90 px-4">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-accent animate-pulse flex-shrink-0" />
              <span className="text-xs sm:text-sm text-center">
                ⚡ За последние 24 часа обратились <span className="font-bold text-accent">{liveCount} человек</span>
              </span>
            </div>
          </div>

          {/* Rotating Case Studies */}
          <div className="max-w-2xl mx-auto px-2 sm:px-0">
            <Card className="bg-card/80 backdrop-blur-md border-2 p-4 sm:p-6 transition-all duration-500 shadow-2xl">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-1">
                      КЕЙС №{currentCase + 1}: {cases[currentCase].name}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-muted-foreground text-[10px] sm:text-xs">Сумма потери:</p>
                        <p className="font-semibold text-card-foreground">{cases[currentCase].loss}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-[10px] sm:text-xs">Возвращено:</p>
                        <p className="font-semibold text-success">{cases[currentCase].recovered}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-[10px] sm:text-xs">Срок:</p>
                        <p className="font-semibold text-card-foreground">{cases[currentCase].duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <blockquote className="italic text-card-foreground border-l-4 border-accent pl-3 sm:pl-4 text-xs sm:text-sm leading-relaxed">
                  "{cases[currentCase].testimonial}"
                </blockquote>
                <p className="text-xs sm:text-sm text-muted-foreground">— {cases[currentCase].client}</p>
                
                {/* Dots indicator */}
                <div className="flex justify-center gap-2 pt-2">
                  {cases.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentCase(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentCase ? "bg-accent w-8" : "bg-muted"
                      }`}
                      data-testid={`case-indicator-${idx}`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
