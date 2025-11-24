import LeadForm from '../LeadForm';

export default function LeadFormExample() {
  const mockQuizData = {
    companyType: "Инвестиционная компания",
    fraudDate: "3-6 месяцев назад",
    moneyStatus: "Счёт обнулён",
    amount: "$25,000 - $100,000",
    paymentMethod: "Банковский перевод",
    documentation: "Есть электронные копии",
  };

  return (
    <LeadForm
      quizData={mockQuizData}
      onSubmit={(data) => console.log('Lead submitted:', data)}
      isPending={false}
    />
  );
}
