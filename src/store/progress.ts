import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type QuizTag = 'inequacao' | 'dominio' | 'limite-00' | 'continuidade' | 'infinito';

export interface QuizResult {
  date: string;
  score: number;
  total: number;
  minutes: number;
  perTag: Partial<Record<QuizTag, { correct: number; total: number }>>;
}

interface ProgressState {
  theoryRead: Record<string, boolean>;
  exerciseStatus: Record<string, 'correct' | 'incorrect'>;
  exampleSeen: Record<string, boolean>;
  flashcardStatus: Record<string, 'known' | 'unknown'>;
  quizHistory: QuizResult[];
  markTheory: (id: string) => void;
  markExercise: (id: string, ok: boolean) => void;
  markExample: (id: string) => void;
  markFlashcard: (id: string, known: boolean) => void;
  saveQuizResult: (r: QuizResult) => void;
  resetProgress: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      theoryRead: {},
      exerciseStatus: {},
      exampleSeen: {},
      flashcardStatus: {},
      quizHistory: [],
      markTheory: (id) => set((s) => ({ theoryRead: { ...s.theoryRead, [id]: true } })),
      markExercise: (id, ok) =>
        set((s) => ({ exerciseStatus: { ...s.exerciseStatus, [id]: ok ? 'correct' : 'incorrect' } })),
      markExample: (id) => set((s) => ({ exampleSeen: { ...s.exampleSeen, [id]: true } })),
      markFlashcard: (id, known) =>
        set((s) => ({ flashcardStatus: { ...s.flashcardStatus, [id]: known ? 'known' : 'unknown' } })),
      saveQuizResult: (r) => set((s) => ({ quizHistory: [...s.quizHistory, r] })),
      resetProgress: () =>
        set({ theoryRead: {}, exerciseStatus: {}, exampleSeen: {}, flashcardStatus: {}, quizHistory: [] }),
    }),
    { name: 'calc1-progress' },
  ),
);
