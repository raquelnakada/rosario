import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import PrayerSession from './components/PrayerSession';
import { DayPlan } from './types';

const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<DayPlan | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Carregar progresso ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('rosary_progress');
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  const handleDaySelect = (plan: DayPlan) => {
    setCurrentPlan(plan);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = () => {
    if (currentPlan) {
      const newCompleted = [...new Set([...completedDays, currentPlan.day])];
      setCompletedDays(newCompleted);
      localStorage.setItem('rosary_progress', JSON.stringify(newCompleted));
      
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification("Oração Concluída!", {
          body: `Parabéns por completar o Dia ${currentPlan.day}. Continue firme!`,
        });
      }
      
      setCurrentPlan(null);
    }
  };

  const handleBack = () => {
    setCurrentPlan(null);
  };

  return (
    <div className="min-h-screen pb-12">
      {currentPlan ? (
        <div className="pt-6 px-4">
          <PrayerSession 
            plan={currentPlan} 
            onComplete={handleComplete}
            onBack={handleBack}
          />
        </div>
      ) : (
        <Dashboard 
          completedDays={completedDays} 
          onSelectDay={handleDaySelect} 
        />
      )}
    </div>
  );
};

export default App;