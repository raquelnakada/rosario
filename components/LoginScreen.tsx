import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string, phone: string) => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove qualquer caractere que não seja número
    const onlyNums = e.target.value.replace(/\D/g, '');
    setPhone(onlyNums);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação: Nome preenchido e Telefone com 10 ou 11 dígitos
    if (name.trim() && phone.length >= 10) {
      onLogin(name.trim(), phone);
    }
  };

  const isValid = name.trim().length > 0 && phone.length >= 10 && phone.length <= 11;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>
      
      <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center relative z-10 border border-white/50">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">
          🕊️
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-blue-900 mb-2">Bem-vindo(a)</h1>
        <p className="text-slate-600 mb-8">Ao Desafio do Rosário de 21 Dias</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left space-y-4">
            
            {/* Campo Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Como você quer ser chamado?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg placeholder:text-slate-300"
                placeholder="Seu Nome"
                required
              />
            </div>

            {/* Campo Telefone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Seu Celular (DDD + Número)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={11}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg placeholder:text-slate-300 font-mono tracking-widest"
                  placeholder="11999999999"
                  required
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 ml-1">
                Usado apenas para salvar seu progresso.
              </p>
            </div>

          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg transform mt-6
              ${isValid 
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            Iniciar Minha Jornada
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;