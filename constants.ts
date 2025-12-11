import { DayPlan, MysteryType, Mystery } from './types';

const JOYFUL_MYSTERIES: Mystery[] = [
  { title: "1º Mistério", description: "A Anunciação do Anjo Gabriel a Maria." },
  { title: "2º Mistério", description: "A Visitação de Maria a sua prima Santa Isabel." },
  { title: "3º Mistério", description: "O Nascimento de Jesus em Belém." },
  { title: "4º Mistério", description: "A Apresentação do Menino Jesus no Templo." },
  { title: "5º Mistério", description: "A Perda e o Encontro do Menino Jesus no Templo." }
];

const SORROWFUL_MYSTERIES: Mystery[] = [
  { title: "1º Mistério", description: "A Agonia de Jesus no Horto das Oliveiras." },
  { title: "2º Mistério", description: "A Flagelação de Jesus atado à coluna." },
  { title: "3º Mistério", description: "A Coroação de Espinhos." },
  { title: "4º Mistério", description: "Jesus carrega a Cruz até o Calvário." },
  { title: "5º Mistério", description: "A Crucificação e Morte de Jesus." }
];

const GLORIOUS_MYSTERIES: Mystery[] = [
  { title: "1º Mistério", description: "A Ressurreição de Jesus." },
  { title: "2º Mistério", description: "A Ascensão de Jesus ao Céu." },
  { title: "3º Mistério", description: "A Vinda do Espírito Santo sobre os Apóstolos." },
  { title: "4º Mistério", description: "A Assunção de Maria ao Céu." },
  { title: "5º Mistério", description: "A Coroação de Maria como Rainha do Céu e da Terra." }
];

const CONTENT_DAY_1 = {
  reflection: "Este mistério nos convida a contemplar a humildade e a obediência de Maria ao aceitar ser a Mãe do Salvador. Ela nos ensina a importância de estarmos abertos à vontade de Deus em nossas vidas, mesmo quando não compreendemos plenamente Seus planos.",
  prayer: "\"Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra.\" (Lucas 1:38). Peçamos a graça de, como Maria, dizer nosso \"sim\" a Deus em todas as circunstâncias.",
  action: "Dedique alguns minutos do seu dia para refletir sobre uma área da sua vida onde você sente que precisa ser mais aberto e confiante nos planos de Deus. Peça a intercessão de Maria para te guiar neste processo."
};

const CONTENT_DAY_9 = {
  reflection: "Diante da iminência de Sua Paixão, Jesus experimenta profunda angústia e tristeza, mas encontra força na oração e na submissão à vontade do Pai. Este mistério nos ensina a importância da oração perseverante, especialmente nos momentos de sofrimento e provação.",
  prayer: "\"Meu Pai, se é possível, afasta de mim este cálice! Contudo, não seja como eu quero, mas sim como tu queres.\" (Mateus 26:39). Peça a Jesus a graça de aceitar a vontade de Deus em sua vida, mesmo quando ela for difícil ou dolorosa.",
  action: "Identifique uma dificuldade ou sofrimento em sua vida e entregue-o a Jesus em oração, pedindo força e resignação para aceitar a vontade de Deus."
};

const CONTENT_DAY_17 = {
  reflection: "No dia de Pentecostes, o Espírito Santo desceu sobre os Apóstolos, transformando-os em testemunhas corajosas de Cristo. Este mistério nos lembra que o Espírito Santo é a alma da Igreja e a fonte de toda a vida cristã.",
  prayer: "\"Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor.\" Peça ao Espírito Santo que o renove com Seus dons e o capacite a ser um instrumento de Sua graça no mundo.",
  action: "Procure oportunidades para servir a Igreja e a comunidade, utilizando os dons que o Espírito Santo lhe concedeu."
};

const rawPlans = [
  { day: 1, title: "A Anunciação", theme: "Abertura à Vontade de Deus", week: 1, content: CONTENT_DAY_1 },
  { day: 2, title: "A Visitação", theme: "Serviço ao Próximo", week: 1 },
  { day: 3, title: "O Nascimento", theme: "Simplicidade de Coração", week: 1 },
  { day: 4, title: "A Apresentação", theme: "Consagração a Deus", week: 1 },
  { day: 5, title: "O Encontro no Templo", theme: "Busca pela Sabedoria Divina", week: 1 },
  { day: 6, title: "As Bodas de Caná", theme: "Intercessão de Maria", week: 1 },
  { day: 7, title: "Proclamação do Reino", theme: "Chamado à Conversão", week: 1 },
  { day: 8, title: "Instituição da Eucaristia", theme: "Dom do Amor Sacrificial", week: 2 },
  { day: 9, title: "Agonia no Horto", theme: "Oração na Dificuldade", week: 2, content: CONTENT_DAY_9 },
  { day: 10, title: "Flagelação e Coroação", theme: "Sofrimento e Humilhação", week: 2 },
  { day: 11, title: "Caminho do Calvário", theme: "Carregar a Cruz", week: 2 },
  { day: 12, title: "Crucificação", theme: "Entrega Total", week: 2 },
  { day: 13, title: "A Sepultura", theme: "Espera da Ressurreição", week: 2 },
  { day: 14, title: "A Ressurreição", theme: "Vitória sobre a Morte", week: 2 },
  { day: 15, title: "Aparições de Jesus", theme: "Alegria da Presença Viva", week: 3 },
  { day: 16, title: "A Ascensão", theme: "Esperança do Céu", week: 3 },
  { day: 17, title: "Pentecostes", theme: "Dons do Espírito Santo", week: 3, content: CONTENT_DAY_17 },
  { day: 18, title: "Assunção de Maria", theme: "Destino Glorioso", week: 3 },
  { day: 19, title: "Coroação de Maria", theme: "Reinado de Amor", week: 3 },
  { day: 20, title: "A Igreja", theme: "Corpo Místico de Cristo", week: 3 },
  { day: 21, title: "Missão da Igreja", theme: "Evangelizar e Servir", week: 3 },
];

export const DAY_PLANS: DayPlan[] = rawPlans.map(p => {
  let mysteryType = MysteryType.JOYFUL;
  let mysteries = JOYFUL_MYSTERIES;
  let weekTheme = "Semana 1: Mistérios Gozosos";

  if (p.week === 2) {
    mysteryType = MysteryType.SORROWFUL;
    mysteries = SORROWFUL_MYSTERIES;
    weekTheme = "Semana 2: Mistérios Dolorosos";
  } else if (p.week === 3) {
    mysteryType = MysteryType.GLORIOUS;
    mysteries = GLORIOUS_MYSTERIES;
    weekTheme = "Semana 3: Mistérios Gloriosos";
  }

  return {
    day: p.day,
    title: p.title,
    theme: p.theme,
    weekTheme,
    mysteryType,
    mysteries,
    staticContent: p.content
  };
});