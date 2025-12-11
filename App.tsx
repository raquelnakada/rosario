import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import PrayerSession from './components/PrayerSession';
import Guide from './components/Guide';
import LoginScreen from './components/LoginScreen';
import DailyThought from './components/DailyThought';
import { DayPlan } from './types';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  
  const [currentPlan, setCurrentPlan] = useState<DayPlan | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showDailyThought, setShowDailyThought] = useState<boolean>(false);
  
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);

  // 1. Carregar sessão ativa (Nome e Telefone) ao iniciar
  useEffect(() => {
    const savedPhone = localStorage.getItem('rosary_current_phone');
    const savedName = localStorage.getItem('rosary_current_name');
    
    if (savedPhone && savedName) {
      setUserPhone(savedPhone);
      setUserName(savedName);
    }
  }, []);

  // 2. Carregar o progresso ESPECÍFICO daquele telefone sempre que o usuário mudar
  useEffect(() => {
    if (userPhone) {
      // Chaves personalizadas por telefone: rosary_progress_11999999999
      const progressKey = `rosary_progress_${userPhone}`;
      const dateKey = `rosary_last_date_${userPhone}`;

      const savedProgress = localStorage.getItem(progressKey);
      const savedDate = localStorage.getItem(dateKey);

      if (savedProgress) {
        try {
          setCompletedDays(JSON.parse(savedProgress));
        } catch (e) {
          console.error("Failed to parse progress", e);
          setCompletedDays([]);
        }
      } else {
        setCompletedDays([]); // Novo usuário (ou novo telefone) começa do zero
      }

      if (savedDate) {
        setLastCompletionDate(savedDate);
      } else {
        setLastCompletionDate(null);
      }
    }
  }, [userPhone]);

  const handleLogin = (name: string, phone: string) => {
    setUserName(name);
    setUserPhone(phone);
    
    // Salva a sessão atual
    localStorage.setItem('rosary_current_name', name);
    localStorage.setItem('rosary_current_phone', phone);
  };

  const handleDaySelect = (plan: DayPlan) => {
    setCurrentPlan(plan);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = () => {
    if (currentPlan && userPhone) {
      const newCompleted = [...new Set([...completedDays, currentPlan.day])];
      setCompletedDays(newCompleted);
      
      const now = new Date().toISOString();
      setLastCompletionDate(now);

      // Salva no armazenamento específico deste telefone
      localStorage.setItem(`rosary_progress_${userPhone}`, JSON.stringify(newCompleted));
      localStorage.setItem(`rosary_last_date_${userPhone}`, now);

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

  // Se não tiver usuário logado, mostra tela de Login
  if (!userName || !userPhone) {
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
          userName={userName} // Passa o Nome para exibição
          completedDays={completedDays} 
          lastCompletionDate={lastCompletionDate}
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