import type { Module } from './types';

const r = String.raw;

export const modules: Module[] = [
  {
    id: 1,
    title: 'Números Reais e Inequações',
    subtitle: 'Intervalos, módulo, varal de sinais e as armadilhas algébricas',
    icon: 'Sigma',
    sections: [
      {
        type: 'theory',
        id: 'm1-fund',
        title: 'Fundamentos: a base que a prova cobra sem avisar',
        blocks: [
          {
            kind: 'p',
            text: 'Antes de resolver inequações, precisamos dominar quatro ferramentas de álgebra que aparecem em TODA questão de Cálculo 1: intervalos, produtos notáveis, fatoração e frações algébricas.',
          },
          {
            kind: 'rule',
            title: 'Intervalos na reta real',
            text: 'Colchete [a, b] INCLUI o extremo; parêntese (a, b) exclui. ∪ une conjuntos ("ou"). Ex.: x ≥ 2 vira [2, +∞); x < −1 ou x ≥ 3 vira (−∞, −1) ∪ [3, +∞). Infinito é sempre aberto: nunca escreva +∞].',
          },
          {
            kind: 'rule',
            title: 'Produtos notáveis',
            tex: r`(a+b)^2 = a^2 + 2ab + b^2 \qquad (a-b)^2 = a^2 - 2ab + b^2 \qquad (a+b)(a-b) = a^2 - b^2`,
            text: 'O erro número 1 do pré-cálculo: (a+b)² NÃO é a² + b². O termo do meio 2ab existe sempre.',
          },
          {
            kind: 'rule',
            title: 'Fatoração — as 4 formas da prova',
            tex: r`\begin{aligned} &\text{fator comum: } ax + ay = a(x+y)\\ &\text{trinômio: } x^2 + bx + c = (x - r_1)(x - r_2)\\ &\text{dif. quadrados: } a^2 - b^2 = (a-b)(a+b)\\ &\text{dif. cubos: } a^3 - b^3 = (a-b)(a^2 + ab + b^2) \end{aligned}`,
            text: 'A diferença de cubos tem +ab no segundo fator — o sinal troca em relação ao cubo. A Lista 1 cobra isso diretamente no Ex. 3.',
          },
          {
            kind: 'trap',
            title: 'Frações algébricas: só se corta o que multiplica',
            text: 'Em (x+1)/x você NÃO pode "cortar o x" — o x da esquerda está somando, não multiplicando. Só se cancela fatores: (x−1)(x+1)/(x−1) = x+1. Para somar frações com denominadores diferentes, use MMC algébrico.',
          },
        ],
      },
      {
        type: 'theory',
        id: 'm1-ineq',
        title: 'Inequações produto e quociente',
        blocks: [
          {
            kind: 'p',
            text: 'Resolver uma inequação é achar os intervalos da reta onde a expressão tem o sinal pedido. O método universal é o varal de sinais: achar onde cada fator zera, dividir a reta e estudar o sinal em cada intervalo.',
          },
          {
            kind: 'trap',
            title: 'NUNCA multiplique em cruz com variável no denominador',
            text: 'Em x/(2x−3) ≤ 3, multiplicar em cruz significa multiplicar por (2x−3) — que pode ser negativo, e aí a desigualdade inverte sem você ver. O caminho seguro: passar o 3 para a esquerda, juntar numa fração só e fazer o varal. Só pode multiplicar em cruz quando o denominador é SEMPRE positivo (ex.: x²+1).',
          },
          {
            kind: 'rule',
            title: 'Receita do varal de sinais',
            list: [
              'Junte tudo num único membro: expressão > 0 (ou <, ≤, ≥)',
              'Fatore completamente numerador e denominador',
              'Marque na reta TODAS as raízes: fechadas se do numerador com ≤/≥, abertas se do denominador ou desigualdade estrita',
              'Teste o sinal de cada fator em cada intervalo e multiplique',
              'Escolha os intervalos com o sinal pedido',
            ],
          },
        ],
      },
      {
        type: 'theory',
        id: 'm1-modulo',
        title: 'Valor absoluto (módulo)',
        blocks: [
          {
            kind: 'p',
            text: '|x| é a distância de x até 0 na reta. Por isso |x| < 3 significa "x está a menos de 3 de zero" e vira um intervalo; |x| > 3 significa "x está longe de zero" e vira duas pontas.',
          },
          {
            kind: 'rule',
            title: 'As duas aberturas fundamentais',
            tex: r`|u| \le k \iff -k \le u \le k \qquad\qquad |u| \ge k \iff u \le -k \ \text{ou}\ u \ge k`,
            text: 'Memória: "menor" fecha num intervalo (E), "maior" abre em duas pontas (OU).',
          },
          {
            kind: 'rule',
            title: 'Módulo com módulo: eleve ao quadrado',
            tex: r`|A| < |B| \iff A^2 < B^2`,
            text: 'Válido porque os dois lados são ≥ 0. Vira inequação quadrática comum.',
          },
          {
            kind: 'trap',
            title: 'Dois módulos somados/subtraídos: casos',
            text: 'Em |x−1| − |x+2| > x não dá para elevar ao quadrado (o lado direito x pode ser negativo). O caminho é abrir em casos pelos pontos que zeram cada módulo (−2 e 1) — e lembrar que a solução de cada caso só vale dentro da sua própria faixa.',
          },
        ],
      },
      { type: 'examples', id: 'm1-ex', title: 'Exemplos resolvidos', exampleIds: ['ex-m1-varal', 'ex-m1-modulo', 'ex-m1-fracao'] },
      { type: 'tool', id: 'm1-tool', title: 'Laboratório: Varal de Sinais Dinâmico', tool: 'signchart' },
      {
        type: 'exercises',
        id: 'm1-warm',
        title: 'Aquecimento — construindo a base',
        exerciseIds: ['l1-ineq-1a', 'l1-ineq-1c', 'l1-ineq-6a', 'l1-ineq-6j', 'l1-eq-8a', 'l1-eq-8c', 'l1-ineq-9b', 'l1-sinal-2a', 'l1-simpl-5a'],
      },
      {
        type: 'exercises',
        id: 'm1-lista',
        title: 'Exercícios da Lista 1',
        exerciseIds: ['l1-ineq-1i', 'l1-ineq-1k', 'l1-ineq-1n', 'l1-ineq-6d', 'l1-ineq-6q', 'l1-ineq-9i', 'l1-ineq-9g'],
      },
    ],
  },
  {
    id: 2,
    title: 'Funções, Domínio e Compostas',
    subtitle: 'Checklist de domínio, composição com restrições e paridade',
    icon: 'FunctionSquare',
    sections: [
      {
        type: 'theory',
        id: 'm2-fund',
        title: 'Fundamentos: o que é domínio',
        blocks: [
          {
            kind: 'p',
            text: 'O domínio D(f) é o conjunto dos x que podem entrar na função — onde a conta não quebra. Achar o domínio é listar o que é PROIBIDO e jogar fora.',
          },
          {
            kind: 'rule',
            title: 'Checklist das 3 restrições',
            list: [
              'Denominador ≠ 0 (divisão por zero não existe)',
              'Radicando de raiz PAR ≥ 0 (√, ⁴√, … — igualdade permitida)',
              'Argumento de log > 0 (ln, log — igualdade PROIBIDA)',
            ],
          },
          {
            kind: 'trap',
            title: 'Simplificar não cura o domínio',
            text: 'Em f(x) = (x²−1)/(x−1), depois de simplificar vira x+1 — mas x = 1 continua fora do domínio original. Sempre marque as restrições ANTES de simplificar.',
          },
          {
            kind: 'rule',
            title: 'Composição de funções',
            tex: r`(f \circ g)(x) = f(g(x)) \qquad D(f \circ g) = \{x \in D(g) \mid g(x) \in D(f)\}`,
            text: 'Leitura: "g primeiro, f depois". Dupla restrição: o x precisa entrar em g E a saída de g precisa entrar em f.',
          },
          {
            kind: 'rule',
            title: 'Razão incremental',
            tex: r`\dfrac{f(x+h) - f(x)}{h},\quad h \neq 0`,
            text: 'A conta que vira a derivada. Padrão: expandir f(x+h), subtrair f(x) (os termos sem h TÊM que cancelar), fatorar o h e cancelar.',
          },
        ],
      },
      {
        type: 'theory',
        id: 'm2-paridade',
        title: 'Paridade: funções pares e ímpares',
        blocks: [
          {
            kind: 'rule',
            title: 'Definição (da Lista 1)',
            tex: r`f(-x) = f(x) \Rightarrow f\ \text{par} \qquad\qquad f(-x) = -f(x) \Rightarrow f\ \text{ímpar}`,
            text: 'Par: espelho no eixo y (como x², |x|, cos x). Ímpar: rotação de 180° na origem (como x³, sen x, 1/x).',
          },
          {
            kind: 'p',
            text: 'Atalho de potências: potência par "apaga" o sinal ((−x)² = x²), potência ímpar preserva ((−x)³ = −x³). Polinômio só com potências pares é par; só com ímpares é ímpar; misturado, em geral, não é nenhuma.',
          },
        ],
      },
      { type: 'examples', id: 'm2-ex', title: 'Exemplos resolvidos', exampleIds: ['ex-m2-dominio', 'ex-m2-razao', 'ex-m2-composta'] },
      { type: 'tool', id: 'm2-tool', title: 'Laboratório: Explorador de Paridade', tool: 'parity' },
      {
        type: 'exercises',
        id: 'm2-warm',
        title: 'Aquecimento',
        exerciseIds: ['l1-fun-1a', 'l1-fun-1h', 'l1-fun-1i', 'l1-fun-4a', 'l1-fun-4b'],
      },
      {
        type: 'exercises',
        id: 'm2-lista',
        title: 'Exercícios da Lista 1',
        exerciseIds: ['l1-fun-1j', 'l1-fun-1f', 'l1-fun-2d', 'l1-fun-3d', 'l1-fun-4f', 'l1-fun-5f', 'l1-fun-6a'],
      },
    ],
  },
  {
    id: 3,
    title: 'Limites Algébricos e a Indeterminação 0/0',
    subtitle: 'Fatoração, conjugado, raízes cúbicas e Briot-Ruffini',
    icon: 'TrendingUp',
    sections: [
      {
        type: 'theory',
        id: 'm3-fund',
        title: 'Fundamentos: o que é um limite',
        blocks: [
          {
            kind: 'p',
            text: 'lim x→a f(x) pergunta: "para que valor f(x) se aproxima quando x chega perto de a?" — sem nunca chegar em a. Por isso o limite pode existir mesmo quando f(a) não existe.',
          },
          {
            kind: 'rule',
            title: 'Passo 0: sempre substituição direta',
            text: 'Antes de qualquer técnica, substitua x = a. Se der número → é a resposta. Se der 0/0, ∞/∞, ∞−∞, 0·∞ → indeterminação: hora de trabalhar a expressão.',
          },
          {
            kind: 'trap',
            title: '0/0 não é resposta — é um recado',
            text: '0/0 significa "há um fator comum zerando os dois lados". Sua missão é encontrá-lo e cancelá-lo. Depois do cancelamento, a substituição funciona. Cancelar (x−a) é legítimo porque o limite nunca usa x = a.',
          },
        ],
      },
      {
        type: 'theory',
        id: 'm3-tecnicas',
        title: 'A árvore de decisão do 0/0',
        blocks: [
          {
            kind: 'rule',
            title: 'Polinômios → fatoração',
            tex: r`x^2 - a^2 = (x-a)(x+a) \qquad x^3 - a^3 = (x-a)(x^2+ax+a^2)`,
            text: 'Trinômios: raízes por soma/produto ou Bhaskara. Graus ≥ 3 sem fator óbvio: Briot-Ruffini com a raiz a (o resto será 0, garantido).',
          },
          {
            kind: 'rule',
            title: 'Raiz quadrada → conjugado',
            tex: r`(\sqrt{A} - B)(\sqrt{A} + B) = A - B^2`,
            text: 'Multiplica em cima e embaixo pelo conjugado. A raiz some e revela o fator escondido.',
          },
          {
            kind: 'rule',
            title: 'Raiz cúbica → a³−b³ ou mudança de variável',
            tex: r`a^3 - b^3 = (a-b)(a^2+ab+b^2) \qquad\text{ou}\qquad u = \sqrt[3]{x}`,
            text: 'Com u = ∛x, o denominador x−1 vira u³−1 — que é diferença de cubos conhecida. Lembre: o ponto do limite muda junto (x→1 vira u→1).',
          },
        ],
      },
      { type: 'examples', id: 'm3-ex', title: 'Exemplos resolvidos', exampleIds: ['ex-m3-fatora', 'ex-m3-conjugado'] },
      { type: 'tool', id: 'm3-tool', title: 'Laboratório: Árvore de Decisão Interativa', tool: 'tree' },
      {
        type: 'exercises',
        id: 'm3-warm',
        title: 'Aquecimento — substituição e fatoração simples',
        exerciseIds: ['l2-lim-1a', 'l2-lim-1d', 'l2-lim-2a', 'l2-lim-2c', 'l2-lim-2d'],
      },
      {
        type: 'exercises',
        id: 'm3-lista',
        title: 'Exercícios da Lista 2',
        exerciseIds: ['l2-lim-2e', 'l2-lim-2k', 'l2-lim-2l', 'l2-lim-2m', 'l2-lim-2n', 'l2-lim-2o', 'l2-lim-2p', 'l2-lim-5'],
      },
    ],
  },
  {
    id: 4,
    title: 'Limites Laterais e Continuidade',
    subtitle: 'Funções por partes, saltos, e o checklist de 3 etapas',
    icon: 'Activity',
    sections: [
      {
        type: 'theory',
        id: 'm4-fund',
        title: 'Fundamentos: por que existem dois lados',
        blocks: [
          {
            kind: 'p',
            text: 'x → a⁻ vem pela esquerda (valores menores que a); x → a⁺ vem pela direita (maiores). O limite bilateral só existe quando os dois laterais existem E são iguais.',
          },
          {
            kind: 'rule',
            title: 'Função por partes: cada lateral usa o seu ramo',
            text: 'Para x → a⁻, use o ramo que vale para x < a. Para x → a⁺, o ramo de x > a. O valor f(a) não entra na conta do limite.',
          },
          {
            kind: 'rule',
            title: 'Checklist de continuidade em x = a',
            list: [
              '1) f(a) existe (a está no domínio)',
              '2) lim x→a f(x) existe (laterais iguais)',
              '3) lim x→a f(x) = f(a)',
            ],
            text: 'Falhou na 2 → salto. Falhou na 3 com limite existindo → removível. Limite infinito → descontinuidade infinita (assíntota vertical).',
          },
          {
            kind: 'rule',
            title: 'Achar constantes para "colar" os ramos',
            tex: r`\lim_{x\to a^-} f = \lim_{x\to a^+} f = f(a)`,
            text: 'Com constantes c, k nos ramos: cada ponto de emenda dá UMA equação igualando os laterais. Duas emendas → sistema 2×2.',
          },
        ],
      },
      { type: 'examples', id: 'm4-ex', title: 'Exemplos resolvidos', exampleIds: ['ex-m4-laterais', 'ex-m4-continua'] },
      { type: 'tool', id: 'm4-tool', title: 'Laboratório: Simulador de Continuidade', tool: 'continuity' },
      {
        type: 'exercises',
        id: 'm4-warm',
        title: 'Aquecimento',
        exerciseIds: ['l2-cont-6', 'l2-cont-8f', 'l2-cont-8g'],
      },
      {
        type: 'exercises',
        id: 'm4-lista',
        title: 'Exercícios da Lista 2',
        exerciseIds: ['l2-cont-8h', 'l2-cont-8b', 'l2-cont-8c', 'l2-cont-9', 'l2-cont-10', 'l2-cont-11', 'l2-cont-12', 'l2-cont-23a', 'l2-cont-23c'],
      },
    ],
  },
  {
    id: 5,
    title: 'Limites no Infinito e Assíntotas',
    subtitle: 'Comparação de graus, a armadilha do |x| e o ∞−∞',
    icon: 'Infinity',
    sections: [
      {
        type: 'theory',
        id: 'm5-fund',
        title: 'Fundamentos: infinito não é número',
        blocks: [
          {
            kind: 'p',
            text: 'x → +∞ significa "x cresce sem parar". Não se substitui ∞ na conta — a técnica é comparar velocidades de crescimento: o termo de maior grau manda.',
          },
          {
            kind: 'rule',
            title: 'Comparação de graus (função racional no infinito)',
            list: [
              'grau num < grau den → limite 0',
              'grau num = grau den → razão dos coeficientes líderes',
              'grau num > grau den → ±∞ (analise o sinal do quociente dos líderes)',
            ],
          },
          {
            kind: 'trap',
            title: 'A armadilha suprema: √(x²) = |x|',
            text: 'Ao tirar x² da raiz sai |x|. Para x → +∞, |x| = x e tudo bem. Mas para x → −∞, x é negativo e |x| = −x — errar isso troca o sinal da resposta inteira. É o erro nº 1 das provas FAMAT.',
          },
          {
            kind: 'rule',
            title: '∞ − ∞ com raiz → conjugado',
            text: '√A − B explode como indeterminação. Multiplique e divida por √A + B para virar fração, depois coloque a maior potência em evidência.',
          },
          {
            kind: 'rule',
            title: 'Assíntota horizontal',
            tex: r`y = L \text{ é assíntota se } \lim_{x\to+\infty} f(x) = L \text{ ou } \lim_{x\to -\infty} f(x) = L`,
            text: 'Calcule os DOIS lados — podem dar valores diferentes (cada um é uma assíntota).',
          },
        ],
      },
      { type: 'examples', id: 'm5-ex', title: 'Exemplos resolvidos', exampleIds: ['ex-m5-graus', 'ex-m5-modulo'] },
      {
        type: 'exercises',
        id: 'm5-warm',
        title: 'Aquecimento — comparação de graus',
        exerciseIds: ['l2-inf-13a', 'l2-inf-13c', 'l2-inf-13e', 'l2-inf-13n'],
      },
      {
        type: 'exercises',
        id: 'm5-lista',
        title: 'Exercícios da Lista 2',
        exerciseIds: ['l2-inf-13u', 'l2-inf-13t', 'l2-inf-14a', 'l2-inf-14b', 'l2-inf-14c', 'l2-inf-14d', 'l2-inf-15a', 'l2-inf-16a', 'l2-inf-16h', 'l2-inf-16e'],
      },
    ],
  },
  {
    id: 6,
    title: 'Limites Fundamentais e o Teorema do Confronto',
    subtitle: 'sen u/u, o número e, e o sanduíche das funções limitadas',
    icon: 'Landmark',
    sections: [
      {
        type: 'theory',
        id: 'm6-fund',
        title: 'Fundamentos: os quatro padrões',
        blocks: [
          {
            kind: 'p',
            text: 'Alguns limites 0/0 (e 1^∞) não se resolvem por álgebra — são fatos provados geometricamente, chamados limites fundamentais. O trabalho é reconhecer o PADRÃO e adaptar a expressão.',
          },
          {
            kind: 'rule',
            title: 'Trigonométricos',
            tex: r`\lim_{u\to 0}\dfrac{\sen u}{u} = 1 \qquad\qquad \lim_{u\to 0}\dfrac{1-\cos u}{u} = 0`,
            text: 'Exigem o MESMO u em cima e embaixo, indo a 0. sen(3x)/x → 3: o fator escapa. E (1−cos u)/u → 0, não 1.',
          },
          {
            kind: 'rule',
            title: 'Exponenciais',
            tex: r`\lim_{u\to\infty}\left(1+\tfrac{1}{u}\right)^u = e \qquad \lim_{u\to 0}(1+u)^{1/u} = e \qquad \lim_{u\to 0}\dfrac{e^u-1}{u} = 1 \qquad \lim_{u\to 0}\dfrac{a^u-1}{u} = \ln a`,
            text: 'As duas formas do e são a mesma com u → ∞ ou 1/u → 0. Padrão geral: (1 + k/x)^x → e^k.',
          },
          {
            kind: 'trap',
            title: 'Só vale com a indeterminação certa',
            text: 'O fundamental do seno exige u → 0 nos DOIS lugares. O do e exige 1^∞ (expoente explodindo): (1+2x)^x com x → 0 é só 1⁰ = 1 — não é e²! Confira a forma antes de aplicar.',
          },
          {
            kind: 'rule',
            title: 'Teorema do Confronto (Sanduíche)',
            tex: r`g(x) \le f(x) \le h(x) \ \text{e}\ \lim g = \lim h = L \implies \lim f = L`,
            text: 'Uso clássico: sen e cos ficam presos entre −1 e 1. (função limitada) × (algo → 0) = 0. Ex.: x·sen(1/x) → 0, mesmo sen(1/x) não tendo limite.',
          },
        ],
      },
      { type: 'examples', id: 'm6-ex', title: 'Exemplos resolvidos', exampleIds: ['ex-m6-senkx', 'ex-m6-sanduiche'] },
      {
        type: 'exercises',
        id: 'm6-warm',
        title: 'Aquecimento',
        exerciseIds: ['l2-fun-17a', 'l2-fun-17f', 'l2-fun-18c'],
      },
      {
        type: 'exercises',
        id: 'm6-lista',
        title: 'Exercícios da Lista 2',
        exerciseIds: ['l2-fun-17b', 'l2-fun-17c', 'l2-fun-17d', 'l2-fun-17e', 'l2-fun-18a', 'l2-fun-18e', 'l2-fun-18f', 'l2-fun-18g', 'l2-fun-19a', 'l2-fun-19c', 'l2-fun-19d'],
      },
    ],
  },
];

export function moduleById(id: number): Module | undefined {
  return modules.find((m) => m.id === id);
}
