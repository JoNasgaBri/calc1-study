import type { Flashcard } from './types';

const r = String.raw;

export const flashcards: Flashcard[] = [
  {
    id: 'fc-modulo-x2',
    front: 'Ao tirar x² de dentro de uma raiz em limite com x → −∞, o que sai?',
    frontTex: r`\sqrt{x^2} = \ ?`,
    back: 'Sai |x|, não x! E quando x → −∞, x é negativo, logo |x| = −x. Esquecer isso troca o sinal da resposta.',
    backTex: r`\sqrt{x^2} = |x| = -x \ \ (x < 0)`,
  },
  {
    id: 'fc-cruzar',
    front: 'Por que não posso multiplicar em cruz em x/(2x−3) ≤ 3?',
    back: 'Multiplicar em cruz multiplica por (2x−3), cujo sinal é desconhecido: se for negativo, a desigualdade inverte. O certo é passar tudo para um lado e fazer varal de sinais. Só pode multiplicar quando o denominador é sempre positivo (ex.: x²+1).',
  },
  {
    id: 'fc-inverte',
    front: 'Quando o sinal de uma desigualdade inverte?',
    back: 'Ao multiplicar ou dividir os dois lados por número NEGATIVO (ou expressão negativa). Ex.: −2x > 4 ⟹ x < −2.',
    backTex: r`-2x > 4 \implies x < -2`,
  },
  {
    id: 'fc-quadrado-modulo',
    front: 'Quando posso elevar ao quadrado para tirar módulo?',
    back: 'Só quando os DOIS lados são ≥ 0. |A| < |B| ⟺ A² < B² vale porque módulo é sempre ≥ 0. Com expressões que podem ser negativas, elevar ao quadrado cria soluções falsas.',
    backTex: r`|A| < |B| \iff A^2 < B^2`,
  },
  {
    id: 'fc-cancelar',
    front: 'O que posso cancelar numa fração algébrica?',
    back: 'Só FATORES (expressões que multiplicam o numerador/denominador inteiro). Nunca "termos" somados: (x+1)/x ≠ 2. E o ponto cancelado continua fora do domínio.',
    backTex: r`\dfrac{x^2-1}{x-1} = x+1 \ \ (x \neq 1)`,
  },
  {
    id: 'fc-composta-dominio',
    front: 'A composta g∘f virou uma expressão simples tipo "x − 4". O domínio é ℝ?',
    back: 'Não necessariamente! D(g∘f) exige x ∈ D(f) E f(x) ∈ D(g). A fórmula simplificada esconde a restrição do domínio de f. Ex.: f = √(x−2), g = x²−2 → g∘f = x−4 só vale para x ≥ 2.',
    backTex: r`D(g\circ f) = \{x \in D(f) \mid f(x) \in D(g)\}`,
  },
  {
    id: 'fc-00',
    front: 'O que significa obter 0/0 ao substituir num limite?',
    back: 'Que o limite está INDETERMINADO — não que é 0, nem que não existe. É um sinal para usar técnica algébrica: fatoração, conjugado ou mudança de variável.',
    backTex: r`\dfrac{0}{0} = \text{indeterminação, não resposta}`,
  },
  {
    id: 'fc-cancelar-limite',
    front: 'Por que posso cancelar (x−a) num limite se ele vale zero em x = a?',
    back: 'Porque o limite x → a usa valores PRÓXIMOS de a, nunca o próprio a. Para x ≠ a, o fator (x−a) é diferente de zero e o cancelamento é legítimo.',
  },
  {
    id: 'fc-tres-etapas',
    front: 'Quais são as 3 condições para f ser contínua em x = a?',
    back: '1) f(a) existe (a ∈ domínio). 2) O limite bilateral existe (laterais iguais). 3) lim = f(a). Falhando qualquer uma, há descontinuidade.',
    backTex: r`\lim_{x\to a} f(x) = f(a)`,
  },
  {
    id: 'fc-laterais',
    front: 'Os limites laterais são diferentes. O que digo sobre o bilateral?',
    back: 'Que NÃO EXISTE. Não se responde os dois valores — o bilateral só existe quando os laterais coincidem. É o caso do salto, como f(x) = |x|/x em 0.',
    backTex: r`\lim_{x\to a^-} \neq \lim_{x\to a^+} \implies \nexists \lim_{x\to a}`,
  },
  {
    id: 'fc-fundamental-sen',
    front: 'Qual a forma exata do limite fundamental trigonométrico?',
    back: 'sen(u)/u → 1 com u → 0. Exige o MESMO argumento em cima e embaixo indo a zero. sen(3x)/x → 3 (não 1) — ajuste com u = 3x.',
    backTex: r`\lim_{u\to 0}\dfrac{\sen u}{u} = 1`,
  },
  {
    id: 'fc-fundamental-e',
    front: 'Qual a forma do limite fundamental exponencial e a pegadinha clássica?',
    back: '(1 + 1/u)^u → e com u → ∞. A pegadinha: o expoente precisa EXPLODIR. (1+2x)^x com x → 0 dá 1⁰ = 1, não e² — o expoente não vai a ∞.',
    backTex: r`\lim_{u\to\infty}\left(1+\tfrac1u\right)^u = e`,
  },
  {
    id: 'fc-sanduiche',
    front: 'Quando usar o Teorema do Confronto (Sanduíche)?',
    back: 'Quando aparece função limitada (sen, cos — presas entre −1 e 1) multiplicada por algo que vai a 0 ou explode. Padrão: limitada × (→0) = 0. Ex.: x·sen(1/x) → 0.',
    backTex: r`-|x| \le x\sen\tfrac1x \le |x| \to 0`,
  },
  {
    id: 'fc-inf-menos-inf',
    front: 'O que fazer com indeterminação ∞ − ∞ com raiz quadrada?',
    back: 'Multiplicar e dividir pelo conjugado (√A + B). Isso transforma em fração: (√A − B)(√A + B) = A − B². Depois coloque a maior potência em evidência.',
    backTex: r`\sqrt{x^2+x}-x = \dfrac{x}{\sqrt{x^2+x}+x} \to \tfrac12`,
  },
  {
    id: 'fc-paridade',
    front: 'Como testar se f é par ou ímpar?',
    back: 'Calcule f(−x): se igual a f(x) → par (espelho no eixo y); se igual a −f(x) → ímpar (rotação 180° na origem); se nenhum → nenhuma das duas. Potência par apaga sinal, ímpar preserva.',
    backTex: r`f(-x)=f(x)\ \text{par};\quad f(-x)=-f(x)\ \text{ímpar}`,
  },
];
