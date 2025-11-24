import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import QuizStep from "@/components/QuizStep";
import QuizOption from "@/components/QuizOption";
import LeadForm from "@/components/LeadForm";
import type { Lead } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Import quiz step images
import step1Image from "@assets/step-1.png";
import step2Image from "@assets/step-2.png";
import step3Image from "@assets/step-3.png";
import step4Image from "@assets/step-4.png";
import step5Image from "@assets/step-5.png";
import step6Image from "@assets/step-6.png";

const quizSteps = [
  {
    question: "КАКОЙ ТИП КОМПАНИИ ВАС ОБМАНУЛ?",
    tip: "Это поможет нам оценить ваше дело и шансы на возврат",
    timeRemaining: "~1 минута",
    image: step1Image,
    options: [
      { icon: "📊", title: "Инвестиционная компания", subtitle: "HYIP, хайпы, фонды" },
      { icon: "🎲", title: "Букмекер", subtitle: "Ставки на спорт" },
      { icon: "🎰", title: "Онлайн-казино", subtitle: "Азартные игры онлайн" },
      { icon: "📈", title: "Форекс/Бинарные опционы", subtitle: "Торговые платформы" },
      { icon: "₿", title: "Криптобиржа или кошелёк", subtitle: "Обмен криптовалюты" },
    ],
  },
  {
    question: "КОГДА ПРОИЗОШЛО МОШЕННИЧЕСТВО?",
    tip: "Даже по старым делам есть высокие шансы — мы выигрывали дела 5+ лет",
    timeRemaining: "~1 минута",
    image: step2Image,
    options: [
      { icon: "📅", title: "Менее 3 месяцев назад" },
      { icon: "📅", title: "3-6 месяцев назад" },
      { icon: "📅", title: "6-12 месяцев назад" },
      { icon: "📅", title: "1-3 года назад" },
      { icon: "📅", title: "Более 3 лет назад" },
    ],
  },
  {
    question: "ЧТО СЕЙЧАС С ВАШИМИ ДЕНЬГАМИ?",
    tip: "Мы можем вернуть деньги в любом из этих сценариев",
    timeRemaining: "~1 минута",
    image: step3Image,
    options: [
      { icon: "🔒", title: "Заморожены на счету", subtitle: "Видны, но недоступны" },
      { icon: "❌", title: "Счёт обнулён", subtitle: "Деньги полностью списаны" },
      { icon: "📵", title: "Мошенники не выходят на связь", subtitle: "Пропали, не отвечают" },
      { icon: "❓", title: "Нет доступа к счёту", subtitle: "Не могу проверить статус" },
      { icon: "🤷", title: "Не знаю", subtitle: "Ситуация непонятна" },
    ],
  },
  {
    question: "КАКУЮ СУММУ ВЫ ПОТЕРЯЛИ?",
    tip: "Укажите примерно — юрист уточнит. Работаем с делами от $1,000",
    timeRemaining: "~45 секунд",
    image: step4Image,
    options: [
      { icon: "💵", title: "До $5,000" },
      { icon: "💵", title: "$5,000 - $25,000" },
      { icon: "💵", title: "$25,000 - $100,000" },
      { icon: "💵", title: "$100,000 - $500,000" },
      { icon: "💵", title: "Более $500,000" },
      { icon: "💵", title: "Не помню точную сумму" },
    ],
  },
  {
    question: "КАК ВЫ ОТПРАВЛЯЛИ ДЕНЬГИ?",
    tip: "Любой способ оплаты можно отследить",
    timeRemaining: "~30 секунд",
    image: step5Image,
    options: [
      { icon: "💳", title: "Кредитная/дебетовая карта", subtitle: "Оплата картой онлайн" },
      { icon: "🏦", title: "Wire Transfer", subtitle: "Банковский перевод" },
      { icon: "💰", title: "ACH Transfer", subtitle: "Через routing number" },
      { icon: "₿", title: "Криптовалюта", subtitle: "Bitcoin, USDT и другие" },
      { icon: "📱", title: "Платёжные приложения", subtitle: "PayPal, Venmo, Zelle, CashApp" },
      { icon: "📄", title: "Чек", subtitle: "Бумажный или электронный" },
      { icon: "💵", title: "Наличные", subtitle: "Лично передал" },
      { icon: "❓", title: "Другой способ", subtitle: "Расскажу специалисту" },
    ],
  },
  {
    question: "У ВАС ЕСТЬ ДОКУМЕНТЫ О СОТРУДНИЧЕСТВЕ?",
    tip: "Даже без документов мы можем помочь — восстановим всё через официальные запросы",
    timeRemaining: "Последний вопрос",
    image: step6Image,
    options: [
      { icon: "📄", title: "Да, есть оригиналы", subtitle: "Договоры, счета, квитанции" },
      { icon: "📱", title: "Есть электронные копии", subtitle: "PDF, скриншоты, сканы" },
      { icon: "💬", title: "Есть только переписка", subtitle: "Email, мессенджеры, SMS" },
      { icon: "❌", title: "Ничего не сохранилось", subtitle: "Нет документов и переписки" },
    ],
  },
];

export default function Quiz() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(6).fill(""));
  const [showLeadForm, setShowLeadForm] = useState(false);
  const autoAdvanceTimeout = useRef<NodeJS.Timeout | null>(null);

  const submitLead = useMutation({
    mutationFn: async (data: Lead) => {
      return await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Наш юрист свяжется с вами в течение 15 минут.",
      });
      setLocation("/thank-you");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
      });
    },
  });

  useEffect(() => {
    return () => {
      if (autoAdvanceTimeout.current) {
        clearTimeout(autoAdvanceTimeout.current);
      }
    };
  }, []);

  const handleSelectOption = (optionTitle: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionTitle;
    setAnswers(newAnswers);

    if (autoAdvanceTimeout.current) {
      clearTimeout(autoAdvanceTimeout.current);
    }

    autoAdvanceTimeout.current = setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleNext = () => {
    if (currentStep === quizSteps.length - 1) {
      setShowLeadForm(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLeadSubmit = (data: Lead) => {
    submitLead.mutate(data);
  };

  if (showLeadForm) {
    const quizData = {
      companyType: answers[0],
      fraudDate: answers[1],
      moneyStatus: answers[2],
      amount: answers[3],
      paymentMethod: answers[4],
      documentation: answers[5],
    };

    return (
      <LeadForm
        quizData={quizData}
        onSubmit={handleLeadSubmit}
        isPending={submitLead.isPending}
      />
    );
  }

  const step = quizSteps[currentStep];

  return (
    <QuizStep
      step={currentStep + 1}
      totalSteps={quizSteps.length}
      timeRemaining={step.timeRemaining}
      question={step.question}
      tip={step.tip}
      image={step.image}
      onNext={handleNext}
      onBack={currentStep > 0 ? handleBack : undefined}
      canProceed={!!answers[currentStep]}
    >
      {step.options.map((option, idx) => (
        <QuizOption
          key={idx}
          icon={option.icon}
          title={option.title}
          subtitle={'subtitle' in option ? option.subtitle : undefined}
          selected={answers[currentStep] === option.title}
          onClick={() => handleSelectOption(option.title)}
          testId={`quiz-option-${currentStep}-${idx}`}
        />
      ))}
    </QuizStep>
  );
}
