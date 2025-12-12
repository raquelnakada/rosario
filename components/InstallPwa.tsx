import React, { useState, useEffect } from 'react';

const InstallPwa: React.FC = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Detecta se já está instalado (modo standalone)
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                               (window.navigator as any).standalone === true;
    
    setIsStandalone(isInStandaloneMode);
    
    // Detecta se é iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Configura o evento para Android/Chrome
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isIOS) {
      setShowIOSInstructions(true);
    } else if (promptInstall) {
      promptInstall.prompt();
    }
  };

  // Se já estiver instalado, não mostra nada
  if (isStandalone) return null;

  // Se não suportar PWA (ex: desktop antigo) e não for iOS, não mostra
  if (!supportsPWA && !isIOS) return null;

  return (
    <>
      <div className="mb-6">
        <button
          onClick={handleClick}
          className="w-full bg-slate-800 text-white p-4 rounded-xl shadow-lg flex items-center justify-between group hover:bg-slate-700 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-sm">Instalar Aplicativo</h3>
              <p className="text-xs text-slate-300">Acesse sem internet e em tela cheia</p>
            </div>
          </div>
          <span className="text-slate-400 group-hover:text-white transition-colors">
             →
          </span>
        </button>
      </div>

      {/* Modal de Instruções para iOS */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowIOSInstructions(false)}>
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Instalar no iPhone</h3>
              <button onClick={() => setShowIOSInstructions(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <ol className="space-y-4 text-slate-600 text-sm">
              <li className="flex items-start gap-3">
                <span className="bg-slate-100 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">1</span>
                <span>Toque no botão <strong>Compartilhar</strong> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Apple_Share_Icon.svg/1200px-Apple_Share_Icon.svg.png" className="w-5 h-5 inline mx-1 align-text-bottom" alt="share" /> na barra inferior do Safari.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-slate-100 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">2</span>
                <span>Role para cima e selecione <strong>"Adicionar à Tela de Início"</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-slate-100 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">3</span>
                <span>Toque em <strong>Adicionar</strong> no canto superior direito.</span>
              </li>
            </ol>
            
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <button onClick={() => setShowIOSInstructions(false)} className="text-blue-600 font-bold text-sm">Entendi</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPwa;