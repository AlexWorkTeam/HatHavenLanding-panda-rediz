import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Mail, Clock } from "lucide-react";
import { useLocation } from "wouter";

export default function ThankYou() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-card backdrop-blur-xl border-2 shadow-2xl p-6 md:p-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/20 mb-6">
            <CheckCircle2 className="w-16 h-16 text-success" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА!
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Спасибо за доверие. Наш юрист анализирует вашу ситуацию<br />
            и свяжется с вами в ближайшее время.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-accent/10 rounded-lg p-6">
              <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">Быстрый ответ</h3>
              <p className="text-sm text-muted-foreground">
                Ответим в течение<br />15 минут
              </p>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">Звонок юриста</h3>
              <p className="text-sm text-muted-foreground">
                Бесплатная<br />консультация
              </p>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">План действий</h3>
              <p className="text-sm text-muted-foreground">
                Индивидуальная<br />стратегия
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-card-foreground mb-3">ЧТО ДАЛЬШЕ?</h3>
            <ol className="text-left space-y-2 text-sm text-card-foreground max-w-md mx-auto">
              <li className="flex gap-2">
                <span className="font-bold text-accent">1.</span>
                <span>Наш юрист изучит вашу ситуацию</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-accent">2.</span>
                <span>Позвонит и предложит план возврата средств</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-accent">3.</span>
                <span>При вашем согласии начнём работу над делом</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-accent">4.</span>
                <span>Вы платите только после успешного возврата</span>
              </li>
            </ol>
          </div>

          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            data-testid="button-back-home"
          >
            Вернуться на главную
          </Button>
        </Card>
      </div>
    </div>
  );
}
