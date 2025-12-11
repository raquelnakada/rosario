import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>
      
      <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center relative z-10 border border-white/50">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">
          📿
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-blue-900 mb-2">Bem-vindo(a)</h1>
        <p className="text-slate-600 mb-8">Ao Desafio do Rosário de 21 Dias</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 ml-1">Como gostaria de ser chamado(a)?</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg placeholder:text-slate-300"
              placeholder="Digite seu nome..."
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Iniciar Minha Jornada
          </button>
        </form>
        
        <p className="mt-8 text-xs text-slate-400">
          "A oração é a chave que abre o coração de Deus."
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;