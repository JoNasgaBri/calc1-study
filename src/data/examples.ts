import type { WorkedExample } from './types';

const r = String.raw;

export const examples: WorkedExample[] = [
  // ---- M1 ----
  {
    id: 'ex-m1-varal',
    title: 'Inequação-produto com varal de sinais',
    problemTex: r`(2x - 1)(x + 3) < 0`,
    steps: [
      {
        tex: r`2x - 1 = 0 \implies x = \tfrac{1}{2}, \qquad x + 3 = 0 \implies x = -3`,
        note: 'Primeiro achamos onde cada fator zera: esses pontos dividem a reta real em intervalos de sinal constante.',
      },
      {
        text: 'Varal de sinais:',
        tex: r`\begin{array}{c|ccc} & x<-3 & -3<x<\tfrac12 & x>\tfrac12\\ \hline 2x-1 & - & - & +\\ x+3 & - & + & +\\ \hline \text{produto} & + & - & + \end{array}`,
        note: 'Em cada intervalo testamos o sinal de CADA fator (pode testar com um número qualquer do intervalo) e multiplicamos: (−)·(−)=+, (−)·(+)=−, (+)·(+)=+.',
      },
      {
        tex: r`S = \left(-3,\ \tfrac{1}{2}\right)`,
        note: 'O produto é negativo onde o varal dá "−". Extremos abertos porque a desigualdade é estrita (<).',
      },
    ],
  },
  {
    id: 'ex-m1-modulo',
    title: 'Inequação modular |u| < k',
    problemTex: r`|2x - 1| < 3`,
    steps: [
      {
        tex: r`|u| < k \iff -k < u < k`,
        note: 'Módulo mede distância até zero: |u| < 3 significa "u está a menos de 3 de zero", ou seja, u entre −3 e 3.',
      },
      {
        tex: r`-3 < 2x - 1 < 3`,
        note: 'Substituímos u = 2x − 1 na desigualdade DUPLA — é uma única condição simultânea, não duas alternativas.',
      },
      {
        tex: r`-2 < 2x < 4 \implies -1 < x < 2`,
        note: 'Resolvemos a desigualdade dupla nas três "faixas" ao mesmo tempo: somamos 1 nas três, depois dividimos as três por 2.',
      },
    ],
    conclusionTex: r`S = (-1,\ 2)`,
  },
  {
    id: 'ex-m1-fracao',
    title: 'Simplificar fração algébrica',
    problemTex: r`\dfrac{x^3 - 8}{x^2 - 4}`,
    steps: [
      {
        tex: r`x^3 - 8 = x^3 - 2^3 = (x-2)(x^2 + 2x + 4)`,
        note: 'Diferença de cubos: a³−b³ = (a−b)(a²+ab+b²). Reconhecer o 8 = 2³ é o primeiro passo.',
      },
      {
        tex: r`x^2 - 4 = (x-2)(x+2)`,
        note: 'Diferença de quadrados no denominador.',
      },
      {
        tex: r`\dfrac{(x-2)(x^2+2x+4)}{(x-2)(x+2)} = \dfrac{x^2+2x+4}{x+2},\quad x \neq 2,\ x \neq -2`,
        note: 'Só podemos cancelar FATORES (coisas que multiplicam o todo). E mesmo simplificada, x = 2 continua fora do domínio original.',
      },
    ],
  },
  // ---- M2 ----
  {
    id: 'ex-m2-dominio',
    title: 'Domínio com duas restrições',
    problemTex: r`f(x) = \dfrac{\sqrt{x - 1}}{x - 3}`,
    steps: [
      {
        tex: r`x - 1 \ge 0 \implies x \ge 1`,
        note: 'Restrição 1: raiz quadrada (índice par) exige radicando ≥ 0. Igualdade permitida porque √0 = 0 existe.',
      },
      {
        tex: r`x - 3 \neq 0 \implies x \neq 3`,
        note: 'Restrição 2: denominador nunca zero — aí a igualdade é PROIBIDA.',
      },
      {
        tex: r`D(f) = [1,\ 3) \cup (3,\ +\infty)`,
        note: 'O domínio é a INTERSEÇÃO das duas condições: os dois precisam valer ao mesmo tempo.',
      },
    ],
  },
  {
    id: 'ex-m2-razao',
    title: 'Razão incremental de f(x) = x²',
    problemTex: r`\dfrac{f(x+h) - f(x)}{h},\quad f(x) = x^2`,
    steps: [
      {
        tex: r`f(x+h) = (x+h)^2 = x^2 + 2xh + h^2`,
        note: 'Produto notável: (a+b)² = a² + 2ab + b². Expandir corretamente é a parte que mais derruba.',
      },
      {
        tex: r`f(x+h) - f(x) = 2xh + h^2`,
        note: 'O x² cancela — e TEM que cancelar: se sobrar termo sem h, a conta está errada.',
      },
      {
        tex: r`\dfrac{h(2x + h)}{h} = 2x + h`,
        note: 'Fatoramos o h para cancelar com o denominador. Esse padrão (cancelar o h) é o coração da derivada, que você verá em breve.',
      },
    ],
  },
  {
    id: 'ex-m2-composta',
    title: 'Domínio da composta f∘g',
    problemTex: r`f(x) = \sqrt{x},\quad g(x) = x - 3,\quad (f \circ g)(x) = ?`,
    steps: [
      {
        tex: r`(f \circ g)(x) = f(g(x)) = \sqrt{x - 3}`,
        note: 'Leitura: "g primeiro, depois f". O g(x) entra no lugar do x dentro de f.',
      },
      {
        tex: r`D(f \circ g) = \{x \in D(g) \mid g(x) \in D(f)\}`,
        note: 'Regra formal: x precisa poder entrar em g E a saída de g precisa poder entrar em f.',
      },
      {
        tex: r`D(g) = \mathbb{R},\quad g(x) \in D(f) \iff x - 3 \ge 0 \iff x \ge 3`,
        note: 'g aceita tudo, mas sua saída precisa ser ≥ 0 para entrar na raiz. Então D(f∘g) = [3, +∞).',
      },
    ],
  },
  // ---- M3 ----
  {
    id: 'ex-m3-fatora',
    title: '0/0 com fatoração',
    problemTex: r`\lim_{x \to 2}\ \dfrac{x^2 - 5x + 6}{x - 2}`,
    steps: [
      {
        tex: r`\text{Substituindo } x=2:\ \dfrac{4-10+6}{0} = \dfrac{0}{0}`,
        note: 'Passo 0 de sempre: substituição direta. Deu 0/0 → indeterminação → precisamos trabalhar a expressão.',
      },
      {
        tex: r`x^2 - 5x + 6 = (x-2)(x-3)`,
        note: 'Se deu 0/0 em x→2, o fator (x−2) TEM que aparecer — ele é o culpado do zero. Trinômio: raízes 2 e 3 (soma 5, produto 6).',
      },
      {
        tex: r`\lim_{x\to 2}(x-3) = -1`,
        note: 'Cancelar (x−2) é legítimo porque o limite usa x PERTO de 2, nunca x = 2. Depois do cancelamento, substituição direta funciona.',
      },
    ],
    conclusionTex: r`\lim_{x\to 2}\dfrac{x^2-5x+6}{x-2} = -1`,
  },
  {
    id: 'ex-m3-conjugado',
    title: '0/0 com raiz quadrada',
    problemTex: r`\lim_{x \to 4}\ \dfrac{\sqrt{x} - 2}{x - 4}`,
    steps: [
      {
        tex: r`\text{Substituindo: } \dfrac{\sqrt4 - 2}{0} = \dfrac{0}{0}`,
        note: '0/0 com raiz quadrada → a técnica é o conjugado: multiplicar por (√x + 2)/(√x + 2).',
      },
      {
        tex: r`\dfrac{(\sqrt{x}-2)(\sqrt{x}+2)}{(x-4)(\sqrt{x}+2)} = \dfrac{x - 4}{(x-4)(\sqrt{x}+2)}`,
        note: '(a−b)(a+b) = a² − b²: a raiz some no numerador e revela o fator (x−4) escondido.',
      },
      {
        tex: r`\lim_{x\to 4}\dfrac{1}{\sqrt{x}+2} = \dfrac{1}{4}`,
        note: 'Depois de cancelar (x−4), a substituição direta funciona.',
      },
    ],
    conclusionTex: r`\lim_{x\to 4}\dfrac{\sqrt{x}-2}{x-4} = \dfrac14`,
  },
  // ---- M4 ----
  {
    id: 'ex-m4-laterais',
    title: 'Limite de função por partes',
    problemTex: r`f(x) = \begin{cases} x + 1 & x < 2 \\ x^2 & x \ge 2 \end{cases},\quad \lim_{x\to 2} f(x) = ?`,
    steps: [
      {
        tex: r`\lim_{x\to 2^{-}} f(x) = 2 + 1 = 3`,
        note: 'Pela esquerda (x < 2) vale o ramo de cima. Valores tipo 1,999 entram em x+1.',
      },
      {
        tex: r`\lim_{x\to 2^{+}} f(x) = 2^2 = 4`,
        note: 'Pela direita (x > 2) vale o ramo de baixo.',
      },
      {
        tex: r`3 \neq 4 \implies \lim_{x\to 2} f(x)\ \text{não existe}`,
        note: 'O bilateral só existe quando os dois laterais coincidem. Aqui há um salto de 3 para 4.',
      },
    ],
  },
  {
    id: 'ex-m4-continua',
    title: 'Checklist de continuidade',
    problemTex: r`f(x) = \begin{cases} \dfrac{x^2-1}{x-1} & x \neq 1 \\ 3 & x = 1 \end{cases} \text{ é contínua em } x=1?`,
    steps: [
      {
        tex: r`1)\ f(1) = 3\ \checkmark`,
        note: 'Etapa 1 do checklist: f(a) existe? Sim, vale 3.',
      },
      {
        tex: r`2)\ \lim_{x\to 1}\dfrac{(x-1)(x+1)}{x-1} = \lim_{x\to 1}(x+1) = 2\ \checkmark`,
        note: 'Etapa 2: o limite existe? Sim, vale 2.',
      },
      {
        tex: r`3)\ \lim_{x\to 1}f(x) = 2 \neq 3 = f(1)\ \times`,
        note: 'Etapa 3 falha: limite ≠ valor. Descontinuidade REMOVÍVEL — bastaria redefinir f(1) = 2.',
      },
    ],
  },
  // ---- M5 ----
  {
    id: 'ex-m5-graus',
    title: 'Comparação de graus no infinito',
    problemTex: r`\lim_{x \to +\infty}\ \dfrac{3x^3 - 7x + 2}{5x^3 + 4x^2 + 8x - 1}`,
    steps: [
      {
        tex: r`\text{Dividir tudo por } x^3\ \text{(maior grau do denominador)}`,
        note: 'A técnica padrão: dividir cada termo pela maior potência que aparece. Termos com x no denominador morrem no infinito.',
      },
      {
        tex: r`\dfrac{3 - \frac{7}{x^2} + \frac{2}{x^3}}{5 + \frac{4}{x} + \frac{8}{x^2} - \frac{1}{x^3}}`,
        note: 'Cada fração com x no denominador tende a 0 quando x → ∞.',
      },
      {
        tex: r`\longrightarrow \dfrac{3 - 0 + 0}{5 + 0 + 0 - 0} = \dfrac{3}{5}`,
        note: 'Graus iguais → limite = razão dos coeficientes líderes. Regra de bolso válida SÓ no infinito.',
      },
    ],
  },
  {
    id: 'ex-m5-modulo',
    title: 'A armadilha do √(x²) = |x|',
    problemTex: r`\lim_{x \to -\infty}\ \dfrac{\sqrt{x^2 + 4}}{x + 4}`,
    steps: [
      {
        tex: r`\sqrt{x^2+4} = \sqrt{x^2\left(1+\tfrac{4}{x^2}\right)} = |x|\sqrt{1+\tfrac{4}{x^2}}`,
        note: 'Tirar x² da raiz dá |x|, NÃO x. Essa é a armadilha suprema dos limites no infinito.',
      },
      {
        tex: r`x \to -\infty \implies x < 0 \implies |x| = -x`,
        note: 'Para x negativo, o módulo "troca o sinal": |−5| = 5 = −(−5). É aqui que a resposta ganha o menos.',
      },
      {
        tex: r`\dfrac{-x\sqrt{1+\frac{4}{x^2}}}{x\left(1+\frac{4}{x}\right)} = \dfrac{-\sqrt{1+\frac{4}{x^2}}}{1+\frac{4}{x}} \longrightarrow -1`,
        note: 'O x cancela (com seu sinal já embutido no −x) e sobra −√1/1 = −1.',
      },
    ],
    conclusionTex: r`\lim_{x\to -\infty}\dfrac{\sqrt{x^2+4}}{x+4} = -1`,
  },
  // ---- M6 ----
  {
    id: 'ex-m6-senkx',
    title: 'Adaptando o limite fundamental sen(kx)/x',
    problemTex: r`\lim_{x \to 0}\ \dfrac{\sen(5x)}{x}`,
    steps: [
      {
        tex: r`\lim_{u\to 0}\dfrac{\sen u}{u} = 1`,
        note: 'O fundamental exige: o argumento do seno IGUAL ao denominador, e os dois indo a 0.',
      },
      {
        tex: r`\dfrac{\sen(5x)}{x} = 5\cdot\dfrac{\sen(5x)}{5x}`,
        note: 'Multiplicamos e dividimos por 5 para "fabricar" o denominador 5x que combina com o argumento.',
      },
      {
        tex: r`\xrightarrow[u=5x\to 0]{} 5 \cdot 1 = 5`,
        note: 'Com u = 5x, quando x → 0 também u → 0: vale o fundamental. Regra geral: sen(kx)/x → k.',
      },
    ],
  },
  {
    id: 'ex-m6-sanduiche',
    title: 'Teorema do Confronto (Sanduíche)',
    problemTex: r`\lim_{x \to 0}\ x^2\,\sen\!\left(\dfrac{1}{x}\right)`,
    steps: [
      {
        tex: r`-1 \le \sen\!\left(\tfrac{1}{x}\right) \le 1`,
        note: 'sen(1/x) oscila infinitamente perto de 0 e NÃO tem limite — mas é sempre limitado entre −1 e 1.',
      },
      {
        tex: r`-x^2 \le x^2\,\sen\!\left(\tfrac{1}{x}\right) \le x^2`,
        note: 'Multiplicamos as três pontas por x² (positivo, não inverte). O termo do meio fica espremido.',
      },
      {
        tex: r`\lim_{x\to 0}(-x^2) = \lim_{x\to 0} x^2 = 0 \implies \lim_{x\to 0} x^2\sen\!\left(\tfrac1x\right) = 0`,
        note: 'Sanduíche: se as duas "fatias de pão" vão ao mesmo lugar, o recheio vai junto. Padrão: (limitada)×(→0) = 0.',
      },
    ],
  },
];

export function exampleById(id: string): WorkedExample | undefined {
  return examples.find((e) => e.id === id);
}
