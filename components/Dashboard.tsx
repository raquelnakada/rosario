import React from 'react';
import { DAY_PLANS } from '../constants';
import { DayPlan } from '../types';
import NotificationRequest from './NotificationRequest';

interface DashboardProps {
  userName: string;
  completedDays: number[];
  onSelectDay: (plan: DayPlan) => void;
  onOpenGuide: () => void;
  onOpenDailyThought: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  userName, 
  completedDays, 
  onSelectDay, 
  onOpenGuide,
  onOpenDailyThought
}) => {
  const completedCount = completedDays.length;
  const progress = Math.round((completedCount / 21) * 100);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <header className="text-center mb-10 py-10 bg-gradient-to-b from-blue-50 to-white rounded-3xl border border-blue-50 relative overflow-hidden">
        <div className="relative z-10">
          <div className="mb-4">
            <h2 className="text-lg text-blue-600 font-bold mb-1">Olá, {userName}</h2>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-blue-900">Desafio do Rosário</h1>
          </div>
          <p className="text-blue-900/60 font-medium tracking-wide uppercase text-sm mb-6">21 Dias de Transformação</p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={onOpenGuide}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-blue-200 text-blue-700 rounded-full font-semibold text-sm hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
            >
              <span className="text-lg">📿</span>
              Como Rezar
            </button>
            <button 
              onClick={onOpenDailyThought}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full font-semibold text-sm hover:bg-amber-100 hover:border-amber-300 transition-all shadow-sm"
            >
              <span className="text-lg">✨</span>
              Pensamento do Dia
            </button>
          </div>
        </div>
      </header>

      <NotificationRequest />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-10">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Seu Progresso</span>
          <span className="text-2xl font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out relative" 
            style={{ width: `${progress}%` }}
          >
             {progress > 0 && <div className="absolute right-0 -top-1 w-5 h-5 bg-white border-4 border-blue-600 rounded-full"></div>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {DAY_PLANS.map((plan) => {
          const isCompleted = completedDays.includes(plan.day);
          const isLocked = !isCompleted && completedDays.length > 0 && plan.day > Math.max(...completedDays) + 1;
          // Bloqueia o dia 1 apenas se não tiver completado nada? Não, dia 1 sempre aberto se nada feito.
          // A lógica acima já trata: se completedDays.length == 0, max(...) é -infinity, então plan.day > -inf + 1 (false para 1).
          // Correção: Math.max de array vazio é -Infinity.
          const maxCompleted = completedDays.length > 0 ? Math.max(...completedDays) : 0;
          const isLockedCorrect = !isCompleted && plan.day > maxCompleted + 1;

          return (
            <button
              key={plan.day}
              onClick={() => !isLockedCorrect && onSelectDay(plan)}
              disabled={isLockedCorrect}
              className={`
                relative p-5 rounded-2xl text-left transition-all duration-300 flex flex-col h-40 group
                ${isCompleted 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : isLockedCorrect
                    ? 'bg-slate-50 border border-slate-100 opacity-70 cursor-not-allowed'
                    : 'bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1'
                }
              `}
            >
              <div className="flex justify-between items-start w-full mb-3">
                <span className={`
                  text-sm font-bold px-2 py-1 rounded-md
                  ${isCompleted ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-500'}
                `}>
                  DIA {plan.day}
                </span>
                {isCompleted && (
                  <span className="text-green-500 bg-green-100 rounded-full p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </span>
                )}
                {!isCompleted && !isLockedCorrect && (
                   <span className="text-blue-500 bg-blue-50 rounded-full p-1 animate-pulse">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </span>
                )}
                {isLockedCorrect && (
                  <span className="text-slate-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                )}
              </div>
              
              <div className="mt-auto">
                <h3 className={`font-serif font-bold leading-tight mb-1 ${isCompleted ? 'text-blue-900' : isLockedCorrect ? 'text-slate-400' : 'text-slate-800'}`}>
                  {plan.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1">{plan.theme}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;