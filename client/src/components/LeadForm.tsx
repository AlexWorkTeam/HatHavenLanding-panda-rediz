import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { leadSchema, type Lead } from "@shared/schema";
import { Shield, TrendingUp, DollarSign } from "lucide-react";

interface LeadFormProps {
  quizData: Omit<Lead, "first_name" | "last_name" | "phone" | "email" | "dataConsent" | "ageConsent">;
  onSubmit: (data: Lead) => void;
  isPending?: boolean;
}

// Calculate recovery probability based on quiz answers
function calculateRecoveryProbability(quizData: LeadFormProps['quizData']): number {
  let probability = 75; // Base probability

  // Company type factor (up to +8%)
  if (quizData.companyType === "Криптобиржа или кошелёк") {
    probability += 8;
  } else if (quizData.companyType === "Форекс/Бинарные опционы") {
    probability += 7;
  } else if (quizData.companyType === "Инвестиционная компания") {
    probability += 6;
  } else {
    probability += 4;
  }

  // Timeframe factor (up to +10%)
  if (quizData.fraudDate === "Менее 3 месяцев назад") {
    probability += 10;
  } else if (quizData.fraudDate === "3-6 месяцев назад") {
    probability += 8;
  } else if (quizData.fraudDate === "6-12 месяцев назад") {
    probability += 5;
  } else if (quizData.fraudDate === "1-3 года назад") {
    probability += 2;
  }

  // Documentation factor (up to +7%)
  if (quizData.documentation === "Да, есть оригиналы") {
    probability += 7;
  } else if (quizData.documentation === "Есть электронные копии") {
    probability += 5;
  } else if (quizData.documentation === "Есть только переписка") {
    probability += 2;
  }

  // Payment method factor (up to +3%)
  if (
    quizData.paymentMethod === "Кредитная/дебетовая карта" ||
    quizData.paymentMethod === "Wire Transfer" ||
    quizData.paymentMethod === "ACH Transfer"
  ) {
    probability += 3;
  } else if (quizData.paymentMethod === "Криптовалюта") {
    probability += 1;
  }

  // Cap at 95% to be realistic
  return Math.min(probability, 95);
}

export default function LeadForm({ quizData, onSubmit, isPending }: LeadFormProps) {
  const recoveryProbability = calculateRecoveryProbability(quizData);

  const form = useForm<Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      ...quizData,
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      dataConsent: false,
      ageConsent: false,
    },
  });

  const handleSubmit = (data: Lead) => {
    console.log('Form submitted:', data);
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-card backdrop-blur-xl border-2 shadow-2xl p-4 sm:p-6 md:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-success/20 mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl">✅</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-3 sm:mb-4 px-2">
              Вероятность возврата: <span className="text-success">{recoveryProbability}%</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base px-2 leading-relaxed">
              На основе ваших ответов мы подготовили стартовый план действий.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Юрист свяжется с вами в течение 15 минут, чтобы подтвердить детали и запустить процесс.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ваше полное имя"
                        {...field}
                        data-testid="input-firstname"
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ваша фамилия"
                        {...field}
                        data-testid="input-lastname"
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        {...field}
                        data-testid="input-phone"
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        data-testid="input-email"
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3 sm:space-y-4">
                <FormField
                  control={form.control}
                  name="dataConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-consent"
                          className="mt-0.5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs sm:text-sm font-normal cursor-pointer leading-relaxed">
                          Я согласен с{" "}
                          <a 
                            href="/privacy-policy" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-accent hover:underline font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Политикой конфиденциальности
                          </a>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ageConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-age"
                          className="mt-0.5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs sm:text-sm font-normal cursor-pointer">
                          Мне больше 18 лет
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="w-full text-base sm:text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-accent to-secondary hover:scale-105 transition-all duration-300 min-h-12 sm:min-h-14"
                data-testid="button-submit-lead"
              >
                <span className="hidden sm:inline">
                  {isPending ? "Отправка..." : "🔥 Получить бесплатную консультацию →"}
                </span>
                <span className="sm:hidden">
                  {isPending ? "Отправка..." : "🔥 Получить консультацию →"}
                </span>
              </Button>

              <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground bg-muted/30 p-3 sm:p-4 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Ваши данные защищены и не передаются третьим лицам по закону США
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm border-t pt-3 sm:pt-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                    <span className="text-card-foreground">
                      Сегодня уже обратились <span className="font-bold">17 человек</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-success flex-shrink-0" />
                    <span className="text-card-foreground">
                      Средняя сумма возврата: <span className="font-bold text-success">$84,700</span>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
