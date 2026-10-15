import { useState } from 'react';
import type { Exercise, QuizTag } from '../data/types';
import { buildQuiz } from '../data/quiz';
import { QuizSetup } from '../components/quiz/QuizSetup';
import { QuizRunner } from '../components/quiz/QuizRunner';
import { QuizReport } from '../components/quiz/QuizReport';
import { useProgress } from '../store/progress';

type Phase = 'setup' | 'running' | 'report';

export function QuizPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [questions, setQuestions] = useState<Exercise[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [minutes, setMinutes] = useState(25);
  const saveQuizResult = useProgress((s) => s.saveQuizResult);

  const start = (m: number) => {
    setMinutes(m);
    setQuestions(buildQuiz());
    setPhase('running');
  };

  const finish = (ans: number[]) => {
    setAnswers(ans);
    const perTag: Partial<Record<QuizTag, { correct: number; total: number }>> = {};
    let score = 0;
    questions.forEach((q, i) => {
      const tag = q.tags[0];
      perTag[tag] = perTag[tag] ?? { correct: 0, total: 0 };
      perTag[tag]!.total++;
      if (ans[i] === q.quiz!.answerIndex) {
        perTag[tag]!.correct++;
        score++;
      }
    });
    saveQuizResult({ date: new Date().toISOString(), score, total: questions.length, minutes, perTag });
    setPhase('report');
  };

  if (phase === 'running') {
    return (
      <QuizRunner
        questions={questions}
        minutes={minutes}
        onFinish={finish}
      />
    );
  }
  if (phase === 'report') {
    return (
      <QuizReport
        questions={questions}
        answers={answers}
        minutes={minutes}
        onRestart={() => setPhase('setup')}
      />
    );
  }
  return <QuizSetup onStart={start} />;
}
