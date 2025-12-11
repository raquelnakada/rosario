import React from 'react';

interface DailyThoughtProps {
  day: number;
  onClose: () => void;
}

const VERSES = [
  "Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra. (Lucas 1:38)",
  "A minha alma engrandece ao Senhor, e o meu espírito se alegra em Deus meu Salvador. (Lucas 1:46-47)",
  "Porque para Deus nada é impossível. (Lucas 1:37)",
  "Tudo posso naquele que me fortalece. (Filipenses 4:13)",
  "O Senhor é o meu pastor, nada me faltará. (Salmos 23:1)",
  "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. (Mateus 11:28)",
  "Buscai primeiro o Reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas. (Mateus 6:33)",
  "Eu sou o caminho, e a verdade e a vida; ninguém vem ao Pai, senão por mim. (João 14:6)",
  "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. (João 14:27)",
  "Amai-vos uns aos outros, como eu vos amei. (João 15:12)",
  "No mundo tereis aflições, mas tende bom ânimo, eu venci o mundo. (João 16:33)",
  "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito. (João 3:16)",
  "Se Deus é por nós, quem será contra nós? (Romanos 8:31)",
  "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos. (Filipenses 4:4)",
  "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4)",
  "Sede fortes e corajosos; não temais, nem vos espanteis. (Josué 1:9)",
  "Confia no Senhor de todo o teu coração. (Provérbios 3:5)",
  "O Senhor te abençoe e te guarde. (Números 6:24)",
  "Pedi, e dar-se-vos-á; buscai, e encontrareis. (Mateus 7:7)",
  "Bem-aventurados os limpos de coração, porque eles verão a Deus. (Mateus 5:8)",
  "E eis que estou convosco todos os dias, até a consumação dos séculos. (Mateus 28:20)"
];

const DailyThought: React.FC<DailyThoughtProps> = ({ day, onClose }) => {
  // Garante que o índice esteja dentro do array (usando módulo se passar de 21)
  const verseIndex = (day - 1) % VERSES.length;
  const verse = VERSES[verseIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-white/20">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="text-center">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold tracking-wider mb-6">
            PENSAMENTO DO DIA {day}
          </span>
          
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mb-6 leading-relaxed">
            "{verse}"
          </h2>
          
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          
          <p className="text-slate-500 text-sm">
            Medite sobre esta palavra durante o seu dia.
          </p>

          <button 
            onClick={onClose}
            className="mt-8 px-8 py-3 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-900 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyThought;