import { useState } from 'react';
import { ChevronRight, Lightbulb } from 'lucide-react';
import type { WorkedExample } from '../../data/types';
import { TeX } from '../math/TeX';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useProgress } from '../../store/progress';

export function WorkedExampleCard({ example }: { example: WorkedExample }) {
  const [revealed, setRevealed] = useState(0);
  const markExample = useProgress((s) => s.markExample);
  const seen = useProgress((s) => !!s.exampleSeen[example.id]);
  const done = revealed >= example.steps.length;

  const reveal = () => {
    const next = revealed + 1;
    setRevealed(next);
    if (next >= example.steps.length) markExample(example.id);
  };

  return (
    <Card className="border-indigo-500/20">
      <div className="flex flex-wrap items-center gap-2">
        <Badge color="indigo">exemplo resolvido</Badge>
        {seen && <Badge color="emerald">estudado</Badge>}
        <h3 className="font-semibold text-slate-100">{example.title}</h3>
      </div>
      <TeX block className="mt-3 text-lg">{example.problemTex}</TeX>

      <ol className="mt-4 space-y-3">
        {example.steps.slice(0, revealed).map((st, i) => (
          <li key={i} className="rounded-lg bg-slate-950/50 p-3">
            {st.text && <p className="text-sm text-slate-300">{st.text}</p>}
            {st.tex && <TeX block className="mt-1 text-base text-indigo-100">{st.tex}</TeX>}
            {st.note && (
              <p className="mt-2 flex gap-2 border-l-2 border-amber-500/50 pl-3 text-xs text-amber-200/90">
                <Lightbulb size={14} className="mt-0.5 shrink-0" />
                {st.note}
              </p>
            )}
          </li>
        ))}
      </ol>

      {!done && (
        <Button variant="secondary" className="mt-4" onClick={reveal}>
          <ChevronRight size={16} />
          {revealed === 0 ? 'Começar a resolução' : 'Próximo passo'}
        </Button>
      )}
      {done && example.conclusionTex && (
        <div className="mt-4 rounded-lg bg-emerald-500/10 px-4 py-3">
          <TeX className="text-emerald-300">{example.conclusionTex}</TeX>
        </div>
      )}
      {done && (
        <button onClick={() => setRevealed(0)} className="mt-3 text-xs text-slate-500 hover:text-slate-300">
          rever do início
        </button>
      )}
    </Card>
  );
}
