/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OperatorType = 'VIVO' | 'TIM' | 'CLARO';

export interface PlanOption {
  id: string;
  name: string;
  dataGb: string;
  price: number;
  highlight?: boolean;
  features: string[];
  operator: OperatorType;
  productCode: string;
  hasCalling: boolean;
  description: string;
  checkoutLink: string;
}

export interface BonusCard {
  id: string;
  title: string;
  text: string;
  badges: string[];
  category: 'internet' | 'cinema' | 'perfume' | 'cashback';
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  avatarUrl?: string; // We can use elegant initials or placeholder faces
  comment: string;
  verified: boolean;
  repliesToObjection?: string; // An indicator of the objection this review helps break down (e.g. "prepayment", "connection", "scam")
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Global Static Data to keep component files completely focused on pure UI presentation
export const OPERATOR_DETAILS: Record<OperatorType, { name: string; color: string; bg: string; border: string; desc: string; speedIndicator: string }> = {
  VIVO: {
    name: 'Vivo',
    color: 'text-brand-500',
    bg: 'bg-brand-50/70',
    border: 'border-brand-300',
    desc: 'Líder nacional em cobertura 4G/5G com máxima estabilidade.',
    speedIndicator: 'Até 450Mbps no 5G'
  },
  TIM: {
    name: 'TIM',
    color: 'text-blue-600',
    bg: 'bg-blue-50/70',
    border: 'border-blue-300',
    desc: 'A maior rede 5G com excelente cobertura na estrada e interior.',
    speedIndicator: 'Até 400Mbps no 5G'
  },
  CLARO: {
    name: 'Claro',
    color: 'text-red-600',
    bg: 'bg-red-50/70',
    border: 'border-red-300',
    desc: 'A velocidade de internet móvel mais rápida premiada no Brasil.',
    speedIndicator: 'Até 480Mbps no 5G'
  }
};

export const PLANS: PlanOption[] = [
  // TIM PLANS
  {
    id: 'tim-100gb',
    name: 'TIM',
    dataGb: '100GB',
    price: 69.90,
    highlight: true,
    operator: 'TIM',
    productCode: 'tim100',
    hasCalling: true,
    description: 'Internet + benefícios exclusivos.',
    features: [
      '100GB de Internet 4G/5G de alta prioridade',
      'Ligações ilimitadas para todo o Brasil',
      'eSIM ativado em 15min ou Chip Físico Correios',
      'Ativação assistida passo a passo',
      'Sem fidelidade contratual ou multas',
      'Suporte humano direto no WhatsApp'
    ],
    checkoutLink: 'https://pingopay.com.br/checkout.php?p=421f8adf47e90a5ef22925f971c106fc'
  },
  {
    id: 'tim-200gb',
    name: 'TIM',
    dataGb: '200GB',
    price: 159.90,
    highlight: false,
    operator: 'TIM',
    productCode: 'tim200',
    hasCalling: false,
    description: 'Internet + benefícios exclusivos.',
    features: [
      '200GB de Internet 4G/5G ultra velocidade',
      'Ideal para Roteadores, Modems ou Tablets',
      'eSIM ativado em 15min ou Chip Físico Correios',
      'Ativação assistida passo a passo',
      'Sem fidelidade contratual ou multas',
      'Suporte humano direto no WhatsApp'
    ],
    checkoutLink: 'https://pingopay.com.br/checkout.php?p=4b07ce982106d6126c0fa81edb3001cd'
  },
  // CLARO PLANS
  {
    id: 'claro-80gb',
    name: 'CLARO',
    dataGb: '80GB',
    price: 69.90,
    highlight: true,
    operator: 'CLARO',
    productCode: 'claro80',
    hasCalling: true,
    description: 'Internet + benefícios exclusivos.',
    features: [
      '80GB de Internet 4G/5G de alta prioridade',
      'Ligações ilimitadas para todo o Brasil',
      'eSIM ativado em 15min ou Chip Físico Correios',
      'Ativação assistida passo a passo',
      'Sem fidelidade contratual ou multas',
      'Suporte humano direto no WhatsApp'
    ],
    checkoutLink: 'https://pingopay.com.br/checkout.php?p=eaa4b68026b8c920f3dbb8a6b14f0bd9'
  },
  {
    id: 'claro-150gb',
    name: 'CLARO',
    dataGb: '150GB',
    price: 99.90,
    highlight: false,
    operator: 'CLARO',
    productCode: 'claro150',
    hasCalling: true,
    description: 'Internet + benefícios exclusivos.',
    features: [
      '150GB de Internet 4G/5G de alta prioridade',
      'Ligações ilimitadas para todo o Brasil',
      'eSIM ativado em 15min ou Chip Físico Correios',
      'Ativação assistida passo a passo',
      'Sem fidelidade contratual ou multas',
      'Suporte humano direto no WhatsApp'
    ],
    checkoutLink: 'https://pingopay.com.br/checkout.php?p=68663042eae498a5ff8906206e4dbe16'
  }
];

export const BONUS_CARDS: BonusCard[] = [
  {
    id: 'bonus-1',
    title: 'De 40 GB a 300 GB de Internet 4G/5G',
    text: 'Navegue utilizando a cobertura da TIM, Vivo ou Claro com alta velocidade e estabilidade corporativa em todo Brasil, livre das travas tradicionais.',
    badges: ['Escolha sua operadora', 'Tecnologia 4G/5G', 'eSIM disponível'],
    category: 'internet'
  },
  {
    id: 'bonus-2',
    title: 'Cinema Todo Mês',
    text: 'Receba mensalmente o benefício de 1 ingresso individual para utilizar em redes de cinema parceiras em nível nacional para assistir aos blockbusters.',
    badges: ['Benefício mensal', 'Salas de cinema parceiras', 'Resgate simplificado'],
    category: 'cinema'
  },
  {
    id: 'bonus-3',
    title: 'Fragrância de Perfume Importado',
    text: 'Acesso garantido às campanhas e testes exclusivos de fragrâncias de luxo autênticas enviadas diretamente pela central de benefícios.',
    badges: ['Amostra premium de verdade', 'Benefício exclusivo', 'Campanhas periódicas'],
    category: 'perfume'
  },
  {
    id: 'bonus-4',
    title: 'Clube de Benefícios & Cashback',
    text: 'Economize ativamente em lojas virtuais de marcas renomadas com cupons, descontos corporativos e cashback depositado direto em sua conta.',
    badges: ['Cashback comprovado', 'Cupom VIP em mais de 10mil lojas', 'Economia ativa'],
    category: 'cashback'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'review-1',
    author: 'Marcos Almeida',
    role: 'Motorista de Aplicativo (Uber / 99)',
    location: 'São Paulo - SP',
    rating: 5,
    verified: true,
    repliesToObjection: 'prepayment',
    date: 'Há 3 dias',
    comment: 'Pensei que era golpe, mas ativaram meu eSIM no mesmo dia. Como eu rodo de Uber 12 horas por dia, a internet antiga sempre acabava. Agora uso o dia inteiro com o Waze e Spotify e roda perfeito. Pago menos da metade do meu plano antigo e recomendo demais para quem trabalha na rua.'
  },
  {
    id: 'review-2',
    author: 'Tatiane Mendes',
    role: 'Estudante de Odontologia',
    location: 'Belo Horizonte - MG',
    rating: 5,
    verified: true,
    repliesToObjection: 'scam',
    date: 'Há 1 semana',
    comment: 'Estava super receosa de fazer o cadastro associativo e pagar a habilitação antes de testar. Mas me chamaram no WhatsApp na mesma hora, me guiaram na instalação do eSIM e em 10 minutos já estava funcionando. O cancelamento é muito mais simples que na operadora tradicional porque não tem fidelidade nenhuma!'
  },
  {
    id: 'review-3',
    author: 'Rodrigo Fontes',
    role: 'Arquiteto Autônomo',
    location: 'Curitiba - PR',
    rating: 5,
    verified: true,
    repliesToObjection: 'fidelity',
    date: 'Há 2 semanas',
    comment: 'Uso no Uber e funciona perfeitamente quando preciso compartilhar o sinal para o tablet. O fato de não ter contrato de fidelidade de 12 meses me deu muita segurança para assinar. Comecei com o chip físico e depois mudei pro eSIM. É internet normal da operadora TIM com sinal excelente.'
  },
  {
    id: 'review-4',
    author: 'Carla Vasconcellos',
    role: 'Representante Comercial',
    location: 'Goiânia - GO',
    rating: 5,
    verified: true,
    repliesToObjection: 'prepayment',
    date: 'Há 5 dias',
    comment: 'Pago menos da metade do meu plano antigo de R$180. O atendimento humano pelo WhatsApp faz toda a diferença jurídica e técnica. Eles me mandaram o código de rastreamento do chip físico menos de 1 hora após a solicitação. Aprovado de ponta a ponta!'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'O pagamento é mensal?',
    answer: 'Sim, o pagamento é feito de forma mensal e descomplicada. Sem faturas surpresa no fim do mês ou cobranças desconhecidas. Você realiza o pagamento correspondente ao seu plano e aproveita todos os GB e ligações sem dor de cabeça.'
  },
  {
    id: 'faq-2',
    question: 'Tem fidelidade?',
    answer: 'Não! Aqui você tem liberdade total. Não há fidelidade obrigatória, contratos de 12 meses ou multas abusivas por cancelamento. Você permanece conosco apenas pelo tempo que desejar e achar vantajoso.'
  },
  {
    id: 'faq-3',
    question: 'Funciona em qualquer celular?',
    answer: 'Sim! Funciona em qualquer celular homologado pela ANATEL que possua entrada para chip físico ou suporte para eSIM (chip virtual), desde que o aparelho esteja desbloqueado para operadores nacionais.'
  },
  {
    id: 'faq-4',
    question: 'Posso manter meu número?',
    answer: 'Sim! Nós oferecemos a opção de portabilidade numérica completa. Após habilitar a sua linha dentro da nossa associação parceira, basta solicitar a portabilidade ao nosso suporte humano via WhatsApp que faremos o processo sem custos adicionais.'
  },
  {
    id: 'faq-5',
    question: 'Tem chip físico?',
    answer: 'Sim! Se o seu smartphone não for compatível com eSIM ou se você simplesmente preferir o formato de chip convencional, nós realizamos a postagem imediata do chip físico original via Correios, contendo código de rastreamento oficial.'
  },
  {
    id: 'faq-6',
    question: 'Como funciona o eSIM?',
    answer: 'O eSIM é um chip digital que já vem nativo no seu aparelho celular. A ativação é feita remotamente em menos de 15 minutos: enviamos um código QR exclusivo no seu WhatsApp, você aponta a câmera do celular para ler e a linha já é conectada imediatamente, sem precisar de frete.'
  },
  {
    id: 'faq-7',
    question: 'É internet normal da operadora?',
    answer: 'Sim, é a conexão original e legítima de altíssima velocidade 4G/5G das maiores operadoras do Brasil (Vivo, TIM ou Claro). Como utilizamos lotes de linhas corporativas empresariais, você usufruirá de máxima prioridade de banda de sinal sem a necessidade de VPN ou aplicativos de terceiros.'
  },
  {
    id: 'faq-8',
    question: 'Funciona em roteador?',
    answer: 'Sim! O nosso chip físico e o eSIM são totalmente compatíveis com roteadores portáteis, modems 4G/5G, tablets e centrais multimídia de veículos, sendo ótimos para viagens ou trabalho em equipe.'
  },
  {
    id: 'faq-9',
    question: 'Como funciona o cadastro associativo?',
    answer: 'O cadastro associativo permite que pessoas de todo o Brasil usufruam de negociações de telecom de grande escala que antes eram exclusivas apenas para grandes corporações (CNPJ). Não realizamos consulta ao SPC ou Serasa para sua aprovação.'
  },
  {
    id: 'faq-10',
    question: 'Tem suporte humano?',
    answer: 'Com certeza! Nós valorizamos o atendimento real. Nada de robôs te deixando sem respostas em loops infinitos: você terá acompanhamento de ponta a ponta feito por especialistas nativos conectados diretamente no WhatsApp comercial.'
  },
  {
    id: 'faq-11',
    question: 'Posso cancelar quando quiser?',
    answer: 'Sim, o cancelamento é totalmente livre de burocracias ou cobranças ocultas. Como não existe fidelidade contratual, basta solicitar a interrupção ao suporte via WhatsApp a qualquer momento e nada mais será cobrado.'
  },
  {
    id: 'faq-12',
    question: 'E se minha linha não ativar?',
    answer: 'Nossa prioridade absoluta é a sua satisfação. Se por qualquer motivo técnico ou geográfico a sua linha da TIM, Vivo ou Claro não for ativada com sucesso, garantimos a devolução de 100% do valor pago imediatamente de forma transparente.'
  }
];
