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
  quizData: Omit<Lead, "full_name" | "phone" | "email" | "dataConsent" | "ageConsent">;
  onSubmit: (data: Lead) => void;
  isPending?: boolean;
}

export default function LeadForm({ quizData, onSubmit, isPending }: LeadFormProps) {
  const form = useForm<Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      ...quizData,
      full_name: "",
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-card backdrop-blur-xl border-2 shadow-2xl p-6 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold text-card-foreground mb-2">
              ОТЛИЧНО! ВЫ ПРОШЛИ ОЦЕНКУ
            </h2>
            <p className="text-muted-foreground">
              Юрист бесплатно оценит ваше дело<br />
              и позвонит в течение 15 минут
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ваше полное имя"
                        {...field}
                        data-testid="input-name"
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

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="dataConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-consent"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Согласен на обработку данных
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ageConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-age"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
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
                className="w-full text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-accent to-secondary hover:scale-105 transition-all duration-300"
                data-testid="button-submit-lead"
              >
                {isPending ? "Отправка..." : "🔥 Получить бесплатную консультацию →"}
              </Button>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                  <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p>
                    Ваши данные защищены и не передаются третьим лицам по закону США
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm border-t pt-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-card-foreground">
                      Сегодня уже обратились <span className="font-bold">17 человек</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-success" />
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
