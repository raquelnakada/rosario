import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import PrayerSession from './components/PrayerSession';
import Guide from './components/Guide';
import LoginScreen from './components/LoginScreen';
import DailyThought from './components/DailyThought';
import { DayPlan } from './types';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [currentPlan, setCurrentPlan] = useState<DayPlan | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showDailyThought, setShowDailyThought] = useState<boolean>(false);
  
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);

  // Função auxiliar para buscar dados do Supabase
  const fetchUserData = async (phone: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', phone)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 é "não encontrado"
        console.error('Erro ao buscar dados:', error);
      }

      if (data) {
        // Usuário encontrado, carrega dados da nuvem
        setUserName(data.name);
        setCompletedDays(data.completed_days || []);
        setLastCompletionDate(data.last_completion_date);
        
        // Atualiza cache local de sessão
        localStorage.setItem('rosary_current_name', data.name);
      } else {
        // Usuário não encontrado no banco (pode ser falha de sync ou primeira vez real)
        setCompletedDays([]);
        setLastCompletionDate(null);
      }
    } catch (err) {
      console.error('Erro de conexão:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Carregar sessão ativa ao iniciar
  useEffect(() => {
    const savedPhone = localStorage.getItem('rosary_current_phone');
    const savedName = localStorage.getItem('rosary_current_name');
    
    if (savedPhone) {
      setUserPhone(savedPhone);
      // Busca a verdade absoluta no banco de dados
      fetchUserData(savedPhone);
    } else {
      setIsLoading(false);
    }
    
    if (savedName) setUserName(savedName);
  }, []);

  const handleLogin = async (name: string, phone: string) => {
    setIsLoading(true);
    setUserPhone(phone);
    setUserName(name);
    
    // Salva a sessão localmente
    localStorage.setItem('rosary_current_name', name);
    localStorage.setItem('rosary_current_phone', phone);

    try {
      // Verifica se usuário existe na nuvem
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', phone)
        .single();

      if (existingUser) {
        // RECUPERAÇÃO DE CONTA: Traz o histórico da nuvem para o aparelho
        setCompletedDays(existingUser.completed_days || []);
        setLastCompletionDate(existingUser.last_completion_date);

        // Atualiza o nome se o usuário digitou um novo
        if (existingUser.name !== name) {
          await supabase.from('profiles').update({ name }).eq('phone', phone);
        }
      } else {
        // NOVO USUÁRIO: Cria no banco
        const { error } = await supabase
          .from('profiles')
          .insert([
            { phone, name, completed_days: [], last_completion_date: null }
          ]);
        
        if (error) throw error;
        setCompletedDays([]);
        setLastCompletionDate(null);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Houve um erro ao conectar com o servidor. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Deseja realmente sair? Seus dados estão salvos na nuvem, mas você precisará fazer login novamente neste aparelho.")) {
      setUserName(null);
      setUserPhone(null);
      setCompletedDays([]);
      setCurrentPlan(null);
      localStorage.removeItem('rosary_current_name');
      localStorage.removeItem('rosary_current_phone');
    }
  };

  const handleDaySelect = (plan: DayPlan) => {
    setCurrentPlan(plan);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = async () => {
    if (currentPlan && userPhone) {
      const newCompleted = [...new Set([...completedDays, currentPlan.day])];
      setCompletedDays(newCompleted);
      
      const now = new Date().toISOString();
      setLastCompletionDate(now);
      
      setCurrentPlan(null);

      // Salva no Supabase
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ 
            completed_days: newCompleted,
            last_completion_date: now
          })
          .eq('phone', userPhone);

        if (error) throw error;

        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification("Oração Concluída!", {
            body: `Progresso salvo na nuvem! Dia ${currentPlan.day} completo.`,
          });
        }
      } catch (error) {
        console.error("Erro ao salvar progresso:", error);
        alert("Erro ao salvar na nuvem. Verifique sua conexão.");
      }
    }
  };

  const handleBack = () => {
    setCurrentPlan(null);
    setShowGuide(false);
  };

  // Tela de Carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-800 font-medium animate-pulse">Sincronizando com a nuvem...</p>
        </div>
      </div>
    );
  }

  // Se não tiver usuário logado, mostra tela de Login
  if (!userName || !userPhone) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Se o guia estiver aberto
  if (showGuide) {
    return <Guide onBack={handleBack} />;
  }

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
          userName={userName} 
          completedDays={completedDays} 
          lastCompletionDate={lastCompletionDate}
          onSelectDay={handleDaySelect} 
          onOpenGuide={() => {
            setShowGuide(true);
            window.scrollTo(0,0);
          }}
          onOpenDailyThought={() => setShowDailyThought(true)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default App;