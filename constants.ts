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

// Conteúdo extraído do PDF para os 21 dias
const DAILY_CONTENTS = {
  1: {
    reflection: "Este mistério nos convida a contemplar a humildade e a obediência de Maria ao aceitar ser a Mãe do Salvador. Ela nos ensina a importância de estarmos abertos à vontade de Deus em nossas vidas, mesmo quando não compreendemos plenamente Seus planos.",
    prayer: "\"Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra.\" (Lucas 1:38). Peçamos a graça de, como Maria, dizer nosso \"sim\" a Deus em todas as circunstâncias.",
    action: "Dedique alguns minutos do seu dia para refletir sobre uma área da sua vida onde você sente que precisa ser mais aberto e confiante nos planos de Deus. Peça a intercessão de Maria para te guiar neste processo."
  },
  2: {
    reflection: "Maria, mesmo grávida, viaja para ajudar sua prima Isabel. Este mistério nos ensina sobre a caridade, o serviço desinteressado e a alegria de compartilhar as bênçãos de Deus com os outros.",
    prayer: "\"Minha alma glorifica ao Senhor, e meu espírito exulta de alegria em Deus, meu Salvador.\" (Lucas 1:46-47). Agradeçamos a Deus pelas oportunidades de servir e peçamos um coração generoso como o de Maria.",
    action: "Procure uma oportunidade hoje para servir alguém em sua família, comunidade ou trabalho. Pode ser um gesto simples, mas feito com amor."
  },
  3: {
    reflection: "O Filho de Deus escolheu nascer na pobreza e na humildade, mostrando-nos que a verdadeira riqueza não está nos bens materiais, mas na presença de Deus em nossas vidas. Este mistério nos convida a buscar a simplicidade de coração.",
    prayer: "\"Glória a Deus nas alturas e paz na terra aos homens de boa vontade.\" (Lucas 2:14). Peçamos a Jesus a graça de um coração simples e humilde, capaz de reconhecê-Lo nas pequenas coisas.",
    action: "Desapegue-se de algo material hoje. Doe algo que você não precisa mais ou simplifique alguma área da sua vida, focando no essencial."
  },
  4: {
    reflection: "Maria e José apresentam Jesus no Templo, cumprindo a Lei e consagrando-O a Deus. Este mistério nos lembra da importância de consagrar nossa vida, nossos trabalhos e nossas famílias a Deus.",
    prayer: "\"Agora, Senhor, despedes em paz o teu servo, segundo a tua palavra.\" (Lucas 2:29). Renove sua consagração a Deus e peça a graça de viver sempre em Sua presença.",
    action: "Dedique um momento do seu dia para oferecer a Deus suas atividades, seus desafios e suas alegrias. Consagre seu dia ao Senhor."
  },
  5: {
    reflection: "Jesus, aos doze anos, é encontrado no Templo entre os doutores, ouvindo-os e interrogando-os. Este mistério nos ensina a importância de buscar a sabedoria divina e de crescer no conhecimento de Deus.",
    prayer: "\"Filho, por que fizeste isto conosco? Eis que teu pai e eu andávamos à tua procura, cheios de aflição.\" (Lucas 2:48). Peçamos a Jesus a graça de nunca nos perdermos Dele e de sempre buscá-Lo com um coração sincero.",
    action: "Dedique um tempo hoje para ler a Palavra de Deus ou um texto espiritual, buscando crescer em sabedoria e conhecimento da fé."
  },
  6: {
    reflection: "A pedido de Maria, Jesus transforma água em vinho, revelando Sua glória e o poder da intercessão de Sua Mãe. Este mistério nos convida a confiar na intercessão de Maria em todas as nossas necessidades.",
    prayer: "\"Fazei tudo o que ele vos disser.\" (João 2:5). Peçamos a Maria que interceda por nós junto a Jesus, especialmente em momentos de dificuldade ou necessidade.",
    action: "Reze uma Ave Maria com especial devoção, pedindo a intercessão de Nossa Senhora por uma intenção particular sua ou de alguém que você conhece."
  },
  7: {
    reflection: "Jesus inicia Seu ministério público anunciando a chegada do Reino de Deus e convidando todos à conversão. Este mistério nos lembra da urgência da conversão e da necessidade de vivermos de acordo com os ensinamentos de Cristo.",
    prayer: "\"Completou-se o tempo e o Reino de Deus está próximo. Arrependei-vos e crede no Evangelho.\" (Marcos 1:15). Peçamos a graça de uma conversão sincera e de um coração aberto para acolher o Reino de Deus.",
    action: "Reflita sobre um aspecto da sua vida que precisa de conversão e peça a Deus a força para mudar, buscando viver mais plenamente o Evangelho."
  },
  8: {
    reflection: "Na Última Ceia, Jesus nos deixou o maior presente de todos: Seu próprio Corpo e Sangue na Eucaristia, como memorial de Seu sacrifício redentor. Este mistério nos convida a uma profunda gratidão e adoração pelo amor infinito de Deus.",
    prayer: "\"Tomai e comei, isto é o meu corpo.\" (Mateus 26:26). Agradeça a Jesus pelo dom da Eucaristia e peça a graça de recebê-Lo com um coração puro e cheio de amor.",
    action: "Participe da Santa Missa com devoção e receba a Sagrada Comunhão, se possível. Se não, faça uma comunhão espiritual, unindo seu coração ao de Jesus presente na Eucaristia."
  },
  9: {
    reflection: "Diante da iminência de Sua Paixão, Jesus experimenta profunda angústia e tristeza, mas encontra força na oração e na submissão à vontade do Pai. Este mistério nos ensina a importância da oração perseverante, especialmente nos momentos de sofrimento e provação.",
    prayer: "\"Meu Pai, se é possível, afasta de mim este cálice! Contudo, não seja como eu quero, mas sim como tu queres.\" (Mateus 26:39). Peça a Jesus a graça de aceitar a vontade de Deus em sua vida, mesmo quando ela for difícil ou dolorosa.",
    action: "Identifique uma dificuldade ou sofrimento em sua vida e entregue-o a Jesus em oração, pedindo força e resignação para aceitar a vontade de Deus."
  },
  10: {
    reflection: "Jesus suportou a humilhação e a dor física da flagelação e da coroação de espinhos por amor a nós. Este mistério nos convida a refletir sobre o sofrimento de Cristo e a unir nossos próprios sofrimentos aos Dele, como forma de participação em Sua obra redentora.",
    prayer: "\"E os soldados, tecendo uma coroa de espinhos... diziam: Salve, Rei dos Judeus!\" (Mateus 27:29). Peça a Jesus a graça de suportar as humilhações e os sofrimentos da vida com paciência e amor, unindo-os aos Seus.",
    action: "Faça um ato de desagravo pelas ofensas cometidas contra Jesus, especialmente aquelas que zombam de Sua realeza e divindade. Pode ser um momento de silêncio e adoração."
  },
  11: {
    reflection: "No caminho para o Calvário, Jesus carrega a pesada cruz, símbolo do peso dos nossos pecados. Ele nos convida a tomar nossa própria cruz e segui-Lo, participando de Sua obra de redenção.",
    prayer: "\"Se alguém quer vir após mim, negue-se a si mesmo, tome a sua cruz cada dia, e siga-me.\" (Lucas 9:23). Peça a Jesus a graça de abraçar suas cruzes diárias com amor e de segui-Lo fielmente no caminho da salvação.",
    action: "Identifique uma cruz em sua vida que você tem dificuldade em carregar. Peça a Jesus a força e a graça para carregá-la com Ele, transformando-a em um instrumento de santificação."
  },
  12: {
    reflection: "A morte de Jesus na Cruz é o ápice de Seu amor sacrificial por nós. Ele entregou Sua vida para nos libertar do pecado e da morte eterna. Este mistério nos convida a contemplar o amor infinito de Deus e a responder com nossa própria entrega e amor.",
    prayer: "\"Pai, em tuas mãos entrego o meu espírito.\" (Lucas 23:46). Agradeça a Jesus por Seu sacrifício redentor e peça a graça de morrer para o pecado e viver para Deus.",
    action: "Dedique um tempo para meditar sobre o significado da Cruz em sua vida. Como você pode viver de forma mais plena o chamado à santidade que brota da Cruz de Cristo?"
  },
  13: {
    reflection: "Após Sua morte, o corpo de Jesus foi colocado no sepulcro. Este momento de silêncio e espera nos prepara para a alegria da Ressurreição. É um tempo para refletir sobre a transitoriedade da vida terrena e a esperança da vida eterna.",
    prayer: "\"Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que, segundo a sua grande misericórdia, nos gerou de novo para uma viva esperança.\" (1 Pedro 1:3). Peça a Deus a graça de viver na esperança da ressurreição e da vida eterna.",
    action: "Faça um ato de fé na ressurreição de Jesus e na promessa da vida eterna. Renove seu compromisso de viver como discípulo de Cristo, aguardando com esperança Sua vinda gloriosa."
  },
  14: {
    reflection: "A Ressurreição de Jesus é o fundamento da nossa fé e a fonte da nossa alegria. Ele venceu a morte e nos abriu o caminho para a vida eterna. Este mistério nos convida a viver como testemunhas da Ressurreição, anunciando a todos a esperança que Ele nos trouxe.",
    prayer: "\"Eu sou a ressurreição e a vida. Quem crê em mim, ainda que morra, viverá.\" (João 11:25). Agradeça a Jesus por Sua vitória sobre a morte e peça a graça de viver uma vida nova Nele.",
    action: "Compartilhe a alegria da Páscoa com alguém hoje. Anuncie que Cristo ressuscitou e que Ele vive! Seja um portador da esperança e da luz do Evangelho."
  },
  15: {
    reflection: "Após Sua ressurreição, Jesus apareceu várias vezes aos Seus discípulos, confirmando sua fé e enviando-os em missão. Este mistério nos lembra que Jesus está vivo e presente em Sua Igreja, e que Ele nos chama a sermos Suas testemunhas no mundo.",
    prayer: "\"Senhor meu e Deus meu!\" (João 20:28). Adore a Jesus ressuscitado e peça a Ele a graça de reconhecê-Lo em sua vida e de ser uma testemunha fiel de Seu amor e misericórdia.",
    action: "Procure oportunidades para compartilhar sua fé com os outros, testemunhando o amor de Cristo em suas palavras e ações."
  },
  16: {
    reflection: "Jesus, após completar Sua missão na terra, subiu aos céus para se sentar à direita do Pai. Sua ascensão nos lembra que nossa pátria definitiva não é este mundo, mas o Reino dos Céus, para o qual devemos aspirar.",
    prayer: "\"Eis que estou convosco todos os dias, até a consumação dos séculos.\" (Mateus 28:20). Peça a Jesus que o ajude a viver com os olhos fixos no céu, buscando as coisas do alto e vivendo em conformidade com a Sua vontade.",
    action: "Renove seu compromisso de seguir Jesus e de viver como cidadão do Reino dos Céus, mesmo enquanto peregrina nesta terra."
  },
  17: {
    reflection: "No dia de Pentecostes, o Espírito Santo desceu sobre os Apóstolos, transformando-os em testemunhas corajosas de Cristo. Este mistério nos lembra que o Espírito Santo é a alma da Igreja e a fonte de toda a vida cristã.",
    prayer: "\"Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor.\" Peça ao Espírito Santo que o renove com Seus dons e o capacite a ser um instrumento de Sua graça no mundo.",
    action: "Procure oportunidades para servir a Igreja e a comunidade, utilizando os dons que o Espírito Santo lhe concedeu."
  },
  18: {
    reflection: "A Assunção de Nossa Senhora é um sinal da nossa esperança na ressurreição e na vida eterna. Ela, como Mãe de Deus e primeira discípula, nos precede na glória do céu.",
    prayer: "\"Todas as gerações me proclamarão bem-aventurada.\" (Lucas 1:48). Peça a intercessão de Maria para que você possa viver uma vida santa e alcançar a glória do céu.",
    action: "Reze o Rosário com devoção, meditando sobre os mistérios da vida de Jesus e Maria, e peça a Nossa Senhora que o acompanhe em sua jornada de fé."
  },
  19: {
    reflection: "Maria, como Mãe do Rei do Universo, é coroada Rainha e intercede por nós junto a Seu Filho. Sua realeza é de serviço e amor, e ela nos convida a participar de seu reinado, servindo a Deus e aos nossos irmãos.",
    prayer: "Peça a Maria, Rainha do Céu e da Terra, que reine em sua vida e em seu coração, e que o ajude a ser um fiel súdito de seu Filho, Jesus Cristo.",
    action: "Procure maneiras de servir aos outros em sua comunidade, refletindo o amor e a realeza de Maria."
  },
  20: {
    reflection: "A Igreja é o Corpo Místico de Cristo, do qual somos membros. Somos chamados a viver em comunhão uns com os outros, compartilhando nossos dons e talentos para o bem comum e para a edificação do Reino de Deus.",
    prayer: "\"Para que todos sejam um, como tu, ó Pai, o és em mim, e eu em ti.\" (João 17:21). Peça a Deus a graça da unidade e da comunhão na Igreja.",
    action: "Participe ativamente da vida de sua paróquia ou comunidade, colaborando com os outros membros e buscando construir um ambiente de amor, fé e esperança."
  },
  21: {
    reflection: "A Igreja tem a missão de anunciar o Evangelho a todas as nações e de servir aos mais necessitados. Somos chamados a ser sal da terra e luz do mundo, transformando a sociedade com os valores do Reino de Deus.",
    prayer: "\"Ide por todo o mundo, pregai o evangelho a toda criatura.\" (Marcos 16:15). Peça a Deus a coragem e a sabedoria para ser um evangelizador eficaz em seu ambiente.",
    action: "Procure oportunidades para compartilhar sua fé com os outros, seja através de palavras, ações ou testemunho de vida. Seja um instrumento de paz."
  }
};

const rawPlans = [
  { day: 1, title: "A Anunciação", theme: "Abertura à Vontade de Deus", week: 1 },
  { day: 2, title: "A Visitação", theme: "Serviço ao Próximo", week: 1 },
  { day: 3, title: "O Nascimento", theme: "Simplicidade de Coração", week: 1 },
  { day: 4, title: "A Apresentação", theme: "Consagração a Deus", week: 1 },
  { day: 5, title: "O Encontro no Templo", theme: "Busca pela Sabedoria Divina", week: 1 },
  { day: 6, title: "As Bodas de Caná", theme: "Intercessão de Maria", week: 1 },
  { day: 7, title: "Proclamação do Reino", theme: "Chamado à Conversão", week: 1 },
  { day: 8, title: "Instituição da Eucaristia", theme: "Dom do Amor Sacrificial", week: 2 },
  { day: 9, title: "Agonia no Horto", theme: "Oração na Dificuldade", week: 2 },
  { day: 10, title: "Flagelação e Coroação", theme: "Sofrimento e Humilhação", week: 2 },
  { day: 11, title: "Caminho do Calvário", theme: "Carregar a Cruz", week: 2 },
  { day: 12, title: "Crucificação", theme: "Entrega Total", week: 2 },
  { day: 13, title: "A Sepultura", theme: "Espera da Ressurreição", week: 2 },
  { day: 14, title: "A Ressurreição", theme: "Vitória sobre a Morte", week: 2 },
  { day: 15, title: "Aparições de Jesus", theme: "Alegria da Presença Viva", week: 3 },
  { day: 16, title: "A Ascensão", theme: "Esperança do Céu", week: 3 },
  { day: 17, title: "Pentecostes", theme: "Dons do Espírito Santo", week: 3 },
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

  // @ts-ignore - Indexing with number
  const staticContent = DAILY_CONTENTS[p.day];

  return {
    day: p.day,
    title: p.title,
    theme: p.theme,
    weekTheme,
    mysteryType,
    mysteries,
    staticContent
  };
});