import { useState } from 'react';
import QuizStep from '../QuizStep';
import QuizOption from '../QuizOption';

export default function QuizStepExample() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <QuizStep
      step={1}
      totalSteps={6}
      timeRemaining="~1 минута"
      question="КАКОЙ ТИП КОМПАНИИ ВАС ОБМАНУЛ?"
      tip="Это поможет нам оценить ваше дело и шансы на возврат"
      onNext={() => console.log('Next clicked')}
      canProceed={selected !== null}
    >
      <QuizOption
        icon="📊"
        title="Инвестиционная компания"
        subtitle="HYIP, хайпы, фонды"
        selected={selected === 0}
        onClick={() => setSelected(0)}
      />
      <QuizOption
        icon="🎲"
        title="Букмекер"
        subtitle="Ставки на спорт"
        selected={selected === 1}
        onClick={() => setSelected(1)}
      />
    </QuizStep>
  );
}
