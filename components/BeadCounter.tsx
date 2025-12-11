import React, { useState } from 'react';

const BeadCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [showPrayer, setShowPrayer] = useState(false);

  // Função para vibrar o dispositivo (feedback tátil)
  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleNext = () => {
    if (count < 10) {
      setCount(prev => prev + 1);
      vibrate();
    }
  };

  const handleReset = () => {
    setCount(0);
    vibrate();
  };

  const isComplete = count === 10;

  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-blue-900 flex items-center gap-2">
          <span>📿</span> Contador de Ave-Marias
        </h3>
        <button 
          onClick={() => setShowPrayer(!showPrayer)}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold uppercase tracking-wider"
        >
          {showPrayer ? 'Ocultar Oração' : 'Ver Oração'}
        </button>
      </div>

      {/* Visualização das Contas */}
      <div className="flex justify-center items-center gap-2 md:gap-4 mb-8 flex-wrap">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            onClick={() => {
              if (i === count) handleNext(); // Permite clicar na próxima bolinha diretamente
            }}
            className={`
              w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer
              ${i < count 
                ? 'bg-blue-500 border-blue-500 shadow-blue-200 shadow-lg scale-110' 
                : 'bg-slate-50 border-slate-200'
              }
              ${i === count && !isComplete ? 'border-blue-300 animate-pulse' : ''}
            `}
          >
            {i < count && (
              <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Controles Principais */}
      <div className="text-center space-y-6">
        
        {!isComplete ? (
          <div className="space-y-2">
            <div className="text-4xl font-serif font-bold text-slate-800">
              {count} <span className="text-lg text-slate-400 font-sans font-normal">/ 10</span>
            </div>
            <button
              onClick={handleNext}
              className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Rezar Ave-Maria</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
          </div>
        ) : (
          <div className="animate-fade-in bg-green-50 p-4 rounded-xl border border-green-100">
            <h4 className="text-green-800 font-bold text-lg mb-1">Dezena Concluída!</h4>
            <p className="text-green-700 text-sm mb-4">Reze agora o "Glória ao Pai".</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-white border border-green-200 text-green-700 rounded-full font-semibold hover:bg-green-50 transition-colors"
            >
              Iniciar Nova Dezena
            </button>
          </div>
        )}

        {/* Texto da Oração (Expansível) */}
        {showPrayer && (
          <div className="mt-6 text-left bg-slate-50 p-4 rounded-xl border border-slate-100 animate-fade-in">
            <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase">Ave Maria</h4>
            <p className="text-slate-600 leading-relaxed font-serif italic">
              Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.
            </p>
          </div>
        )}

        {/* Botão de Reset discreto se não estiver completo */}
        {!isComplete && count > 0 && (
          <button 
            onClick={handleReset}
            className="text-slate-400 text-sm hover:text-slate-600 underline decoration-dotted"
          >
            Reiniciar contagem
          </button>
        )}
      </div>
    </div>
  );
};

export default BeadCounter;