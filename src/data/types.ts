import type { QuizTag } from '../store/progress';

export type { QuizTag };

export interface SolutionStep {
  /** texto corrido em pt-BR explicando o passo */
  text?: string;
  /** fórmula LaTeX do passo */
  tex?: string;
  /** "por quê" do passo — usado em exemplos resolvidos */
  note?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  problemTex: string;
  steps: SolutionStep[];
  conclusionTex?: string;
}

export interface Exercise {
  id: string;
  /** ex.: 'Lista 1 · Ex. 1(i)' ou 'Aquecimento' */
  source: string;
  module: 1 | 2 | 3 | 4 | 5 | 6;
  level: 'aquecimento' | 'lista';
  tags: QuizTag[];
  statementTex: string;
  /** complemento do enunciado (ex.: "encontre k para que exista o limite") */
  statementNote?: string;
  /** Botão 1: estratégia, sem fazer conta */
  hintFirstStep: string;
  /** Botão 2: erro comum */
  hintTrap: string;
  solutionSteps: SolutionStep[];
  answerTex: string;
  quiz?: { optionsTex: string[]; answerIndex: number };
}

export interface Flashcard {
  id: string;
  front: string;
  frontTex?: string;
  back: string;
  backTex?: string;
}

export type TheoryBlock =
  | { kind: 'p'; text: string }
  | { kind: 'tex'; tex: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'trap'; title: string; text: string }
  | { kind: 'rule'; title: string; tex?: string; text?: string; list?: string[] };

export type ToolId = 'signchart' | 'parity' | 'tree' | 'continuity';

export type Section =
  | { type: 'theory'; id: string; title: string; blocks: TheoryBlock[] }
  | { type: 'examples'; id: string; title: string; exampleIds: string[] }
  | { type: 'tool'; id: string; title: string; tool: ToolId }
  | { type: 'exercises'; id: string; title: string; exerciseIds: string[] };

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  sections: Section[];
}
