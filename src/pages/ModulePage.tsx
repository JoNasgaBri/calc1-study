import { useParams, Navigate } from 'react-router-dom';
import { moduleById } from '../data/modules';
import { exampleById } from '../data/examples';
import { exerciseById } from '../data/exercises';
import type { Section } from '../data/types';
import { TheorySection } from '../components/exercise/TheorySection';
import { WorkedExampleCard } from '../components/exercise/WorkedExampleCard';
import { ExerciseCard } from '../components/exercise/ExerciseCard';
import { SignChart } from '../components/math/SignChart';
import { ParityExplorer } from '../components/math/ParityExplorer';
import { DecisionTree } from '../components/math/DecisionTree';
import { ContinuitySim } from '../components/math/ContinuitySim';
import { SectionTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useProgress } from '../store/progress';

function ToolSection({ tool }: { tool: string }) {
  switch (tool) {
    case 'signchart':
      return <SignChart />;
    case 'parity':
      return <ParityExplorer />;
    case 'tree':
      return <DecisionTree />;
    case 'continuity':
      return <ContinuitySim />;
    default:
      return null;
  }
}

function SectionView({ s, index }: { s: Section; index: number }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-300">
          {index + 1}
        </span>
        <h2 className="text-base font-semibold text-slate-200">{s.title}</h2>
      </div>

      {s.type === 'theory' && <TheorySection id={s.id} title={s.title} blocks={s.blocks} />}

      {s.type === 'examples' && (
        <div className="space-y-4">
          {s.exampleIds.map((id) => {
            const ex = exampleById(id);
            return ex ? <WorkedExampleCard key={id} example={ex} /> : null;
          })}
        </div>
      )}

      {s.type === 'tool' && <ToolSection tool={s.tool} />}

      {s.type === 'exercises' && (
        <div className="space-y-4">
          {s.exerciseIds.map((id) => {
            const ex = exerciseById(id);
            return ex ? <ExerciseCard key={id} exercise={ex} /> : null;
          })}
        </div>
      )}
    </section>
  );
}

export function ModulePage() {
  const { id } = useParams();
  const mod = moduleById(Number(id));
  const { exerciseStatus } = useProgress();

  if (!mod) return <Navigate to="/" replace />;

  const allEx = mod.sections.flatMap((s) => (s.type === 'exercises' ? s.exerciseIds : []));
  const doneCount = allEx.filter((eid) => exerciseStatus[eid] === 'correct').length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge color="indigo">Módulo {mod.id}</Badge>
        <h1 className="text-xl font-bold text-slate-100">{mod.title}</h1>
      </div>
      <p className="mt-1 text-sm text-slate-400">{mod.subtitle}</p>
      <p className="mt-2 text-xs text-slate-500">
        {doneCount}/{allEx.length} exercícios dominados
      </p>

      <div className="mt-8 space-y-10">
        {mod.sections.map((s, i) => (
          <SectionView key={s.id} s={s} index={i} />
        ))}
      </div>

      <div className="mt-10 border-t border-slate-800 pt-4">
        <SectionTitle className="text-sm">Pronto para o próximo passo?</SectionTitle>
        <p className="mt-1 text-sm text-slate-400">
          Revise as armadilhas nos <a className="text-indigo-300 underline" href="#/flashcards">flashcards</a> ou faça o{' '}
          <a className="text-indigo-300 underline" href="#/simulado">simulado</a>.
        </p>
      </div>
    </div>
  );
}
