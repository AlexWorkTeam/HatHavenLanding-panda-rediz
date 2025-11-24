import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          На главную
        </Button>

        <Card className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-8">
            Политика конфиденциальности
          </h1>

          <div className="space-y-6 text-card-foreground">
            <section>
              <h2 className="text-xl font-bold mb-3">1. Сбор информации</h2>
              <p className="text-muted-foreground">
                Мы собираем только ту информацию, которую вы предоставляете добровольно при заполнении формы обратной связи: имя, фамилию, телефон и email. Эти данные используются исключительно для связи с вами по вопросу возврата средств.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. Использование данных</h2>
              <p className="text-muted-foreground">
                Ваши персональные данные используются для:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Связи с вами для оценки вашего дела</li>
                <li>Предоставления юридической консультации</li>
                <li>Подготовки документов для возврата средств</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. Защита данных</h2>
              <p className="text-muted-foreground">
                Мы применяем современные технологии шифрования и защиты для обеспечения безопасности ваших персональных данных. Все данные передаются по защищенному протоколу HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Передача третьим лицам</h2>
              <p className="text-muted-foreground">
                Ваши данные не передаются третьим лицам без вашего явного согласия, за исключением случаев, предусмотренных законодательством США.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Ваши права</h2>
              <p className="text-muted-foreground">
                Вы имеете право:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Запросить доступ к своим персональным данным</li>
                <li>Запросить исправление неточных данных</li>
                <li>Запросить удаление ваших данных</li>
                <li>Отозвать согласие на обработку данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Хранение данных</h2>
              <p className="text-muted-foreground">
                Мы храним ваши данные в течение срока, необходимого для выполнения наших обязательств, но не менее 3 лет в соответствии с требованиями законодательства.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Изменения в политике</h2>
              <p className="text-muted-foreground">
                Мы оставляем за собой право обновлять данную Политику конфиденциальности. Все изменения будут опубликованы на этой странице.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">8. Контакты</h2>
              <p className="text-muted-foreground">
                Если у вас есть вопросы относительно нашей Политики конфиденциальности или обработки ваших данных, пожалуйста, свяжитесь с нами через форму на сайте.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Дата последнего обновления: 24 ноября 2025 года
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
