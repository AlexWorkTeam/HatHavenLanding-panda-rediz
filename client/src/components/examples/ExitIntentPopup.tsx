import { useState } from 'react';
import ExitIntentPopup from '../ExitIntentPopup';
import { Button } from '@/components/ui/button';

export default function ExitIntentPopupExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Show Exit Popup</Button>
      <ExitIntentPopup 
        open={open} 
        onOpenChange={setOpen}
        onStartQuiz={() => console.log('Quiz started from exit popup')}
      />
    </div>
  );
}
