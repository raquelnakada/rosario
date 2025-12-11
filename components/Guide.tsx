import React from 'react';

interface GuideProps {
  onBack: () => void;
}

const Guide: React.FC<GuideProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto pb-12 px-4">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm mt-6"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Voltar para o Desafio
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        <div className="bg-slate-800 p-8 text-white text-center">
          <h1 className="text-3xl font-serif font-bold mb-2">Como Rezar o Rosário</h1>
          <p className="text-slate-300">Guia passo a passo para sua oração diária</p>
        </div>

        <div className="p-6 md:p-10 space-y-10">
          
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Preparação
            </h2>
            <ul className="space-y-3 text-slate-700 ml-11">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Encontre um Lugar Tranquilo:</strong> Escolha um local onde você possa se concentrar, livre de distrações.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Tenha um Terço:</strong> O terço é um instrumento que auxilia na contagem das orações.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Sinal da Cruz:</strong> Inicie sua oração fazendo o Sinal da Cruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém."</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
              Orações Iniciais
            </h2>
            <div className="grid md:grid-cols-2 gap-4 ml-11">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-800 mb-1">Ato de Contrição</h3>
                <p className="text-sm text-slate-600">Peça perdão a Deus por seus pecados.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-800 mb-1">Credo</h3>
                <p className="text-sm text-slate-600">Reze o Credo (Símbolo dos Apóstolos), professando sua fé.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-800 mb-1">Pai Nosso</h3>
                <p className="text-sm text-slate-600">Reze um Pai Nosso pelas intenções do Papa.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-800 mb-1">3 Ave Marias</h3>
                <p className="text-sm text-slate-600">Ofereça em honra à Santíssima Trindade e pelo aumento da Fé, Esperança e Caridade.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
              Meditação dos Mistérios (5 Dezenas)
            </h2>
            <div className="ml-11 space-y-4 text-slate-700">
              <p>Para cada um dos 5 mistérios do dia, siga esta sequência:</p>
              <ol className="list-decimal space-y-2 pl-4 marker:font-bold marker:text-blue-600">
                <li><strong>Anuncie o Mistério:</strong> Leia o título do mistério e a reflexão do dia (disponível no app).</li>
                <li><strong>Reze 1 Pai Nosso.</strong></li>
                <li><strong>Reze 10 Ave Marias</strong> enquanto medita sobre a cena do mistério.</li>
                <li><strong>Reze 1 Glória ao Pai:</strong> "Glória ao Pai, ao Filho e ao Espírito Santo..."</li>
                <li><strong>Reze a Jaculatória de Fátima:</strong> "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem."</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
              Finalização
            </h2>
            <div className="ml-11 text-slate-700 space-y-3">
              <p>Após completar os 5 mistérios:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Salve Rainha:</span>
                  <span>Reze a oração da Salve Rainha.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Sinal da Cruz:</span>
                  <span>Encerre a oração.</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-8">
            <h3 className="font-bold text-blue-900 mb-3 text-center">Benefícios do Rosário</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <span>❤️</span> <span>Paz Interior e Equilíbrio</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🛡️</span> <span>Proteção Espiritual</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👨‍👩‍👧‍👦</span> <span>Fortalecimento da União Familiar</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✨</span> <span>Transformação Interior e Virtudes</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Guide;