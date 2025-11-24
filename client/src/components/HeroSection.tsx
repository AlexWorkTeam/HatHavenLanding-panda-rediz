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
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              ВЕРНЁМ ВАШИ ДЕНЬГИ ОТ<br />ИНТЕРНЕТ-МОШЕННИКОВ
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-semibold">
              Законно, через суд, без предоплаты
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-primary-foreground">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <span className="font-semibold text-lg">$68M возвращено</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <span className="font-semibold text-lg">250+ дел</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <span className="font-semibold text-lg">92% успеха</span>
              </div>
            </div>

            <p className="text-lg text-primary-foreground/80 mb-10 max-w-3xl mx-auto">
              Специализируемся на возврате от нечестных бирж, брокеров, онлайн-казино<br />
              и других финансовых пирамид
            </p>

            {/* CTA Button */}
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="text-lg px-8 py-6 font-bold uppercase tracking-wide bg-gradient-to-r from-accent to-secondary hover:scale-105 transition-all duration-300 shadow-2xl mb-6"
              data-testid="button-start-quiz"
            >
              🔥 Узнать, можно ли вернуть мои деньги →
            </Button>

            <p className="text-primary-foreground/80 mb-2">
              Бесплатная оценка за 24 часа | Платите только с результата
            </p>
            
            {/* Live counter */}
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <TrendingUp className="w-5 h-5 text-accent animate-pulse" />
              <span className="text-sm">
                ⚡ За последние 24 часа обратились <span className="font-bold text-accent">{liveCount} человек</span>
              </span>
            </div>
          </div>

          {/* Rotating Case Studies */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-md border-2 p-6 transition-all duration-500 shadow-2xl">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-1">
                      КЕЙС №{currentCase + 1}: {cases[currentCase].name}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Сумма потери:</p>
                        <p className="font-semibold text-card-foreground">{cases[currentCase].loss}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Возвращено:</p>
                        <p className="font-semibold text-success">{cases[currentCase].recovered}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Срок:</p>
                        <p className="font-semibold text-card-foreground">{cases[currentCase].duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <blockquote className="italic text-card-foreground border-l-4 border-accent pl-4">
                  "{cases[currentCase].testimonial}"
                </blockquote>
                <p className="text-sm text-muted-foreground">— {cases[currentCase].client}</p>
                
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
