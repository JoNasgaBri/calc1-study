import { quizPoolByTag } from './exercises';
import type { Exercise, QuizTag } from './types';

export const QUIZ_TAGS: QuizTag[] = ['inequacao', 'dominio', 'limite-00', 'continuidade', 'infinito'];

export const TAG_LABELS: Record<QuizTag, string> = {
  inequacao: 'Inequações e módulo',
  dominio: 'Domínio e composta',
  'limite-00': 'Limites 0/0',
  continuidade: 'Laterais e continuidade',
  infinito: 'Limites no infinito',
};

/** Sorteia uma questão com alternativas de cada tema (total 5). */
export function buildQuiz(): Exercise[] {
  const picked: Exercise[] = [];
  for (const tag of QUIZ_TAGS) {
    const pool = quizPoolByTag(tag).filter((e) => !picked.includes(e));
    if (pool.length === 0) continue;
    picked.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  return picked;
}
