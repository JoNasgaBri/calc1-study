import { Check, RotateCcw, X } from 'lucide-react';
import type { Exercise, QuizTag } from '../../data/types';
import { TAG_LABELS } from '../../data/quiz';
import { TeX } from '../math/TeX';
import { Card, SectionTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { cn } from '../../lib/cn';

export function QuizReport({
  questions,
  answers,
  minutes,
  onRestart,
}: {
  questions: Exercise[];
  answers: number[];
  minutes: number;
  onRestart: () => void;
}) {
  const score = questions.filter((q, i) => answers[i] === q.quiz!.answerIndex).length;
  const perTag: Partial<Record<QuizTag, { correct: number; total: number }>> = {};
  questions.forEach((q, i) => {
    const tag = q.tags[0];
    perTag[tag] = perTag[tag] ?? { correct: 0, total: 0 };
    perTag[tag]!.total++;
    if (answers[i] === q.quiz!.answerIndex) perTag[tag]!.correct++;
  });
  const weak = (Object.entries(perTag) as [QuizTag, { correct: number; total: number }][])
    .filter(([, v]) => v.correct < v.total)
    .map(([k]) => TAG_LABELS[k]);
  const strong = (Object.entries(perTag) as [QuizTag, { correct: number; total: number }][])
    .filter(([, v]) => v.correct === v.total)
    .map(([k]) => TAG_LABELS[k]);

  const pct = Math.round((score / questions.length) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <SectionTitle>Resultado do simulado</SectionTitle>
        <div className="mt-3 flex items-end gap-3">
          <span className={cn('text-5xl font-bold', pct >= 60 ? 'text-emerald-400' : 'text-rose-400')}>
            {score}/{questions.length}
          </span>
          <span className="pb-1 text-sm text-slate-400">({pct}%) · tempo previsto: {minutes} min</span>
        </div>

        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-emerald-500/10 p-3">
            <p className="font-semibold text-emerald-300">Pontos fortes</p>
            <p className="mt-1 text-emerald-100/80">{strong.length ? strong.join(' · ') : 'nenhum tema dominado ainda'}</p>
          </div>
          <div className="rounded-lg bg-rose-500/10 p-3">
            <p className="font-semibold text-rose-300">Revisar</p>
            <p className="mt-1 text-rose-100/80">
              {weak.length ? weak.join(' · ') : 'nenhum ponto fraco neste simulado!'}
            </p>
          </div>
        </div>

        <Button variant="primary" className="mt-5" onClick={onRestart}>
          <RotateCcw size={15} /> Novo simulado
        </Button>
      </Card>

      <div className="mt-6 space-y-3">
        <p className="text-sm font-semibold text-slate-300">Correção questão a questão</p>
        {questions.map((q, i) => {
          const ok = answers[i] === q.quiz!.answerIndex;
          return (
            <Accordion
              key={q.id}
              title={
                <span className="flex items-center gap-2">
                  {ok ? <Check size={15} className="text-emerald-400" /> : <X size={15} className="text-rose-400" />}
                  <span className={ok ? 'text-slate-300' : 'text-rose-300'}>
                    {i + 1}. {q.source}
                  </span>
                </span>
              }
            >
              <TeX block>{q.statementTex}</TeX>
              <div className="mt-3 space-y-1.5">
                {q.quiz!.optionsTex.map((opt, j) => (
                  <div
                    key={j}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm',
                      j === q.quiz!.answerIndex
                        ? 'border-emerald-500/50 bg-emerald-500/10'
                        : j === answers[i]
                          ? 'border-rose-500/50 bg-rose-500/10'
                          : 'border-slate-800',
                    )}
                  >
                    <span className="font-bold text-slate-400">{String.fromCharCode(65 + j)}.</span>
                    <TeX>{opt}</TeX>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                {q.solutionSteps.map((st, j) => (
                  <div key={j}>
                    {st.text && <p className="text-sm text-slate-300">{st.text}</p>}
                    {st.tex && <TeX block>{st.tex}</TeX>}
                  </div>
                ))}
              </div>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
