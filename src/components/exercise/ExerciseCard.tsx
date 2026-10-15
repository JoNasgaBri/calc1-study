import { useState } from 'react';
import { AlertTriangle, Check, Eye, Footprints, X } from 'lucide-react';
import type { Exercise } from '../../data/types';
import { TeX } from '../math/TeX';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useProgress } from '../../store/progress';
import { cn } from '../../lib/cn';

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [hintLevel, setHintLevel] = useState(0); // 0 nada, 1 passo, 2 armadilha, 3 solução
  const status = useProgress((s) => s.exerciseStatus[exercise.id]);
  const markExercise = useProgress((s) => s.markExercise);

  return (
    <Card
      className={cn(
        status === 'correct' && 'border-emerald-500/40',
        status === 'incorrect' && 'border-rose-500/40',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge color={exercise.level === 'aquecimento' ? 'emerald' : 'indigo'}>
          {exercise.level === 'aquecimento' ? 'aquecimento' : exercise.source}
        </Badge>
        {exercise.level === 'aquecimento' && <Badge color="slate">{exercise.source}</Badge>}
        {status === 'correct' && <Badge color="emerald"><Check size={12} /> acertei</Badge>}
        {status === 'incorrect' && <Badge color="rose"><X size={12} /> errei</Badge>}
      </div>

      <TeX block className="mt-3 text-base">{exercise.statementTex}</TeX>
      {exercise.statementNote && <p className="mt-1 text-sm text-slate-400">{exercise.statementNote}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        {hintLevel < 1 && (
          <Button variant="hint" onClick={() => setHintLevel(1)}>
            <Footprints size={15} /> Qual é o primeiro passo?
          </Button>
        )}
        {hintLevel < 2 && hintLevel >= 1 && (
          <Button variant="hint" onClick={() => setHintLevel(2)}>
            <AlertTriangle size={15} /> Qual é a armadilha aqui?
          </Button>
        )}
        {hintLevel < 3 && (
          <Button variant="secondary" onClick={() => setHintLevel(3)}>
            <Eye size={15} /> Ver resolução completa
          </Button>
        )}
      </div>

      {hintLevel >= 1 && (
        <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-100">
          <span className="font-semibold text-amber-300">Estratégia: </span>
          {exercise.hintFirstStep}
        </div>
      )}
      {hintLevel >= 2 && (
        <div className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-sm text-rose-100">
          <span className="font-semibold text-rose-300">Armadilha: </span>
          {exercise.hintTrap}
        </div>
      )}
      {hintLevel >= 3 && (
        <div className="mt-3 rounded-lg border border-slate-700 bg-slate-950/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resolução</p>
          <ol className="mt-2 space-y-3">
            {exercise.solutionSteps.map((st, i) => (
              <li key={i}>
                {st.text && <p className="text-sm text-slate-300">{st.text}</p>}
                {st.tex && <TeX block className="mt-1">{st.tex}</TeX>}
                {st.note && <p className="mt-1 border-l-2 border-amber-500/50 pl-3 text-xs text-amber-200/90">{st.note}</p>}
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-lg bg-emerald-500/10 px-4 py-3">
            <span className="mr-2 text-xs font-semibold uppercase text-emerald-400">Resposta</span>
            <TeX className="text-emerald-300">{exercise.answerTex}</TeX>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-slate-500">Como foi sua tentativa?</span>
            <Button variant="success" className="px-3 py-1.5 text-xs" onClick={() => markExercise(exercise.id, true)}>
              <Check size={14} /> Acertei
            </Button>
            <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={() => markExercise(exercise.id, false)}>
              <X size={14} /> Errei
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
