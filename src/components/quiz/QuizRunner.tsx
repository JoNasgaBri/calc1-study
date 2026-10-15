import { useEffect, useMemo, useRef, useState } from 'react';
import { Timer } from 'lucide-react';
import type { Exercise } from '../../data/types';
import { TAG_LABELS } from '../../data/quiz';
import { TeX } from '../math/TeX';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

export function QuizRunner({
  questions,
  minutes,
  onFinish,
}: {
  questions: Exercise[];
  minutes: number;
  onFinish: (answers: number[]) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => Array(questions.length).fill(-1));
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const finishedRef = useRef(false);

  const finish = useMemo(
    () => (ans: number[]) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onFinish(ans);
    },
    [onFinish],
  );

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) finish(answers);
  }, [secondsLeft, answers, finish]);

  const q = questions[current];
  const mm = Math.floor(Math.max(0, secondsLeft) / 60);
  const ss = Math.max(0, secondsLeft) % 60;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge color="indigo">
          questão {current + 1} de {questions.length}
        </Badge>
        <Badge color={secondsLeft < 120 ? 'rose' : 'slate'}>
          <Timer size={13} /> {mm}:{String(ss).padStart(2, '0')}
        </Badge>
      </div>

      <Card className="mt-4">
        <div className="flex items-center gap-2">
          <Badge color="slate">{q.source}</Badge>
          <Badge color="amber">{TAG_LABELS[q.tags[0]]}</Badge>
        </div>
        <TeX block className="mt-4 text-lg">{q.statementTex}</TeX>
        {q.statementNote && <p className="mt-1 text-sm text-slate-400">{q.statementNote}</p>}

        <div className="mt-5 space-y-2">
          {q.quiz!.optionsTex.map((opt, i) => (
            <button
              key={i}
              onClick={() =>
                setAnswers((a) => {
                  const n = [...a];
                  n[current] = i;
                  return n;
                })
              }
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                answers[current] === i
                  ? 'border-indigo-500 bg-indigo-500/15'
                  : 'border-slate-700 bg-slate-950 hover:border-slate-500',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                  answers[current] === i ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-slate-600 text-slate-400',
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <TeX>{opt}</TeX>
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-between">
        <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
          ← anterior
        </Button>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'h-2.5 w-2.5 rounded-full',
                i === current ? 'bg-indigo-400' : answers[i] >= 0 ? 'bg-emerald-500' : 'bg-slate-700',
              )}
            />
          ))}
        </div>
        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent((c) => c + 1)}>próxima →</Button>
        ) : (
          <Button variant="success" onClick={() => finish(answers)}>
            Entregar simulado
          </Button>
        )}
      </div>
    </div>
  );
}
