import React from 'react';
import { DAY_PLANS } from '../constants';
import { DayPlan } from '../types';
import NotificationRequest from './NotificationRequest';

interface DashboardProps {
  completedDays: number[];
  onSelectDay: (plan: DayPlan) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ completedDays, onSelectDay }) => {
  const completedCount = completedDays.length;
  const progress = Math.round((completedCount / 21) * 100);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <header className="text-center mb-10 py-10 bg-gradient-to-b from-blue-50 to-white rounded-3xl border border-blue-50">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-blue-900 mb-4">Desafio do Rosário</h1>
        <p className="text-blue-900/60 font-medium tracking-wide uppercase text-sm mb-4">21 Dias de Transformação</p>
        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed px-4">
          "A oração é a chave que abre o coração de Deus." Complete os 21 dias para renovar sua fé e encontrar a paz interior.
        </p>
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
          
          return (
            <button
              key={plan.day}
              onClick={() => !isLocked && onSelectDay(plan)}
              disabled={isLocked}
              className={`
                relative p-5 rounded-2xl text-left transition-all duration-300 flex flex-col h-40 group
                ${isCompleted 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : isLocked
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
              </div>
              
              <div className="mt-auto">
                <h3 className={`font-serif font-bold leading-tight mb-1 ${isCompleted ? 'text-blue-900' : isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
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