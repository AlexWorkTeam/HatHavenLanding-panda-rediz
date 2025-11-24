import QuizProgress from '../QuizProgress';
import { Card } from '@/components/ui/card';

export default function QuizProgressExample() {
  return (
    <Card className="p-6 max-w-2xl">
      <QuizProgress currentStep={3} totalSteps={6} timeRemaining="~1 минута" />
    </Card>
  );
}
