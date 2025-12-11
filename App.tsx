import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import PrayerSession from './components/PrayerSession';
import Guide from './components/Guide';
import LoginScreen from './components/LoginScreen';
import DailyThought from './components/DailyThought';
import { DayPlan } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<DayPlan | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showDailyThought, setShowDailyThought] = useState<boolean>(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Carregar usuário e progresso ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('rosary_user');
    if (savedUser) setUser(savedUser);

    const savedProgress = localStorage.getItem('rosary_progress');
    if (savedProgress) {
      try {
        setCompletedDays(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  const handleLogin = (name: string) => {
    setUser(name);
    localStorage.setItem('rosary_user', name);
  };

  const handleDaySelect = (plan: DayPlan) => {
    setCurrentPlan(plan);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = () => {
    if (currentPlan) {
      const newCompleted = [...new Set([...completedDays, currentPlan.day])];
      setCompletedDays(newCompleted);
      localStorage.setItem('rosary_progress', JSON.stringify(newCompleted));
      
      // Salva a data da última conclusão para controle (opcional para lógica futura)
      localStorage.setItem('rosary_last_completion_date', new Date().toISOString());

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
    setShowGuide(false);
  };

  // Se não tiver usuário, mostra tela de Login
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Se o guia estiver aberto
  if (showGuide) {
    return <Guide onBack={handleBack} />;
  }

  // Determina o dia atual para o Pensamento (último dia completo + 1, ou 1 se for o início)
  const currentDayForThought = completedDays.length > 0 ? Math.max(...completedDays) + 1 : 1;

  return (
    <div className="min-h-screen pb-12">
      {showDailyThought && (
        <DailyThought 
          day={currentDayForThought} 
          onClose={() => setShowDailyThought(false)} 
        />
      )}

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
          userName={user}
          completedDays={completedDays} 
          onSelectDay={handleDaySelect} 
          onOpenGuide={() => {
            setShowGuide(true);
            window.scrollTo(0,0);
          }}
          onOpenDailyThought={() => setShowDailyThought(true)}
        />
      )}
    </div>
  );
};

export default App;