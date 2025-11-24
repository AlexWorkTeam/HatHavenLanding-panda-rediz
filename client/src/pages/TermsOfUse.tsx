import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function TermsOfUse() {
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
              Terms of Use
            </h1>
            <p className="text-sm text-muted-foreground">
              Последнее обновление: 24 ноября 2025
            </p>
          </div>

          <div className="prose prose-sm sm:prose max-w-none space-y-6 text-card-foreground">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">1. Принятие условий</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Получая доступ и используя услуги Cordoba (далее — «Сервис»), вы соглашаетесь соблюдать настоящие Условия использования. Если вы не согласны с какой-либо частью данных условий, пожалуйста, не используйте наш Сервис.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">2. Описание услуг</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Cordoba предоставляет консультационные услуги по возврату средств, утраченных в результате мошеннических действий финансовых компаний. Наши услуги включают юридическую консультацию, анализ дела и представительство в суде.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">3. Ограничения ответственности</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                Результаты не гарантированы. Каждый случай уникален, и успех зависит от множества факторов, включая:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-4">
                <li>Наличие и качество документации</li>
                <li>Срок давности мошенничества</li>
                <li>Юрисдикцию и применимое законодательство</li>
                <li>Финансовое состояние ответчика</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">4. Конфиденциальность</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Ваша конфиденциальность чрезвычайно важна для нас. Все персональные данные обрабатываются в соответствии с нашей <a href="/privacy-policy" className="text-accent hover:underline">Политикой конфиденциальности</a> и применимым законодательством США.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">5. Оплата услуг</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Оплата производится только при успешном возврате средств. Процент комиссии обсуждается индивидуально и фиксируется в договоре на оказание услуг.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">6. Изменения условий</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Мы оставляем за собой право изменять данные Условия использования в любое время. Изменения вступают в силу с момента их публикации на данной странице.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">7. Контактная информация</h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                По всем вопросам, связанным с настоящими Условиями использования, обращайтесь по адресу:
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
