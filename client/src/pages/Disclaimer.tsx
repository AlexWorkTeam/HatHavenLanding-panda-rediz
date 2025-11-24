import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Disclaimer() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-card backdrop-blur-xl border-2 shadow-2xl p-6 sm:p-8 md:p-12">
          <div className="mb-6 sm:mb-8">
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="mb-4"
              data-testid="button-back-home"
            >
              ← Вернуться на главную
            </Button>
            <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">
              Disclaimer
            </h1>
            <p className="text-sm text-muted-foreground">
              Последнее обновление: 24 ноября 2025
            </p>
          </div>

          <div className="prose prose-sm sm:prose max-w-none space-y-6 text-card-foreground">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Важное уведомление</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Информация, представленная на этом сайте и в процессе консультации, носит исключительно информационный характер и не является юридической консультацией или гарантией результата.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Отсутствие гарантий результата</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                <strong>Результаты не гарантированы.</strong> Каждый случай уникален и зависит от множества факторов, находящихся вне контроля Cordoba, включая, но не ограничиваясь:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-4">
                <li>Наличие достаточных доказательств и документации</li>
                <li>Сроки давности по конкретному случаю</li>
                <li>Юрисдикцию и применимое законодательство</li>
                <li>Финансовое состояние и местонахождение ответчика</li>
                <li>Решения суда и других государственных органов</li>
                <li>Сложность дела и количество вовлечённых сторон</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Статистические данные</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Все статистические данные (процент успеха, средние суммы возврата и т.д.), представленные на сайте, основаны на исторических результатах и не являются обещанием или гарантией будущих результатов.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Бесплатная консультация</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Первичная консультация является бесплатной оценкой вашего дела и не создаёт отношений адвокат-клиент. Такие отношения возникают только после подписания официального договора на оказание юридических услуг.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Сроки</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Указанные на сайте сроки (например, "связь в течение 15 минут") являются приблизительными и могут варьироваться в зависимости от загруженности наших специалистов и других обстоятельств.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Юрисдикция</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Наши услуги предоставляются в соответствии с законодательством США. Мы работаем с делами, подпадающими под юрисдикцию судов США.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Ответственность</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Cordoba не несёт ответственности за любые убытки, прямые или косвенные, возникшие в результате использования информации на данном сайте или принятия решений на её основе без получения профессиональной юридической консультации.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Контакты</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Если у вас есть вопросы относительно данного Disclaimer, пожалуйста, свяжитесь с нами:
                <br />
                <strong>Address:</strong> 102 NE 2nd St, Boca Raton, FL 33432
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}
