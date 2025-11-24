import { useState } from 'react';
import QuizOption from '../QuizOption';

export default function QuizOptionExample() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-2xl space-y-3">
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
      <QuizOption
        icon="🎰"
        title="Онлайн-казино"
        subtitle="Азартные игры онлайн"
        selected={selected === 2}
        onClick={() => setSelected(2)}
      />
    </div>
  );
}
