import React from 'react';
import { DayPlan } from '../types';
import Reflection from './Reflection';

interface PrayerSessionProps {
  plan: DayPlan;
  onComplete: () => void;
  onBack: () => void;
}

const PrayerSession: React.FC<PrayerSessionProps> = ({ plan, onComplete, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Voltar
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-8 text-white relative">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider mb-3">
            DIA {plan.day} DE 21
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 leading-tight">{plan.title}</h1>
          <p className="text-blue-100 text-lg opacity-90">{plan.theme}</p>
        </div>

        <div className="p-6 md:p-8">
          <Reflection 
            day={plan.day} 
            title={plan.title} 
            theme={plan.theme}
            staticContent={plan.staticContent}
          />

          <hr className="my-10 border-slate-100" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Rezar o Terço</h2>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {plan.weekTheme}
              </span>
            </div>
            
            <div className="space-y-4">
              {plan.mysteries.map((mystery, index) => (
                <div key={index} className="flex gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm md:text-base">{mystery.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{mystery.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100">
          <button 
            onClick={onComplete}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Concluir Dia {plan.day}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrayerSession;