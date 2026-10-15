import { useState } from 'react';
import { Play, Timer } from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { QUIZ_TAGS, TAG_LABELS } from '../../data/quiz';
import { cn } from '../../lib/cn';

export function QuizSetup({ onStart }: { onStart: (minutes: number) => void }) {
  const [minutes, setMinutes] = useState(25);

  return (
    <Card className="mx-auto max-w-2xl">
      <SectionTitle>Simulador de Prova FAMAT</SectionTitle>
      <p className="mt-2 text-sm text-slate-400">
        5 questões sorteadas, uma de cada tema — como nas provas de Conteúdo 1 e 2:
      </p>
      <ul className="mt-3 space-y-1 text-sm text-slate-300">
        {QUIZ_TAGS.map((t) => (
          <li key={t} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
            {TAG_LABELS[t]}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <p className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <Timer size={15} /> Tempo de prova
        </p>
        <div className="mt-2 flex gap-2">
          {[15, 25, 40].map((m) => (
            <button
              key={m}
              onClick={() => setMinutes(m)}
              className={cn(
                'rounded-lg border px-4 py-2 text-sm font-medium',
                minutes === m
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200'
                  : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500',
              )}
            >
              {m} min
            </button>
          ))}
        </div>
      </div>

      <Button className="mt-6" onClick={() => onStart(minutes)}>
        <Play size={15} /> Começar simulado
      </Button>
    </Card>
  );
}
