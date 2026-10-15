import { Link } from 'react-router-dom';
import { BookMarked, GraduationCap, Layers, Timer } from 'lucide-react';
import { modules } from '../data/modules';
import { exercises } from '../data/exercises';
import { useProgress } from '../store/progress';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';

export function HomePage() {
  const { exerciseStatus, theoryRead, quizHistory } = useProgress();

  const moduleProgress = modules.map((m) => {
    const exIds = m.sections.flatMap((s) => (s.type === 'exercises' ? s.exerciseIds : []));
    const theoryIds = m.sections.filter((s) => s.type === 'theory').map((s) => s.id);
    const done = exIds.filter((id) => exerciseStatus[id] === 'correct').length;
    const read = theoryIds.filter((id) => theoryRead[id]).length;
    const total = exIds.length + theoryIds.length;
    return { m, pct: total ? (done + read) / total : 0, done, total: exIds.length };
  });

  const totalDone = exercises.filter((e) => exerciseStatus[e.id] === 'correct').length;
  const lastQuiz = quizHistory[quizHistory.length - 1];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-100">Cálculo 1 — Trilha de Estudo</h1>
      <p className="mt-1 text-sm text-slate-400">
        Conteúdos 1 e 2 (FAMAT/UFU): fundamentos de pré-cálculo, funções, limites e continuidade —
        com teoria, exemplos resolvidos, ferramentas interativas e os exercícios reais das Listas 1 e 2.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Badge color="emerald">{totalDone} exercícios dominados</Badge>
        {lastQuiz && (
          <Badge color="indigo">
            último simulado: {lastQuiz.score}/{lastQuiz.total}
          </Badge>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {moduleProgress.map(({ m, pct, done, total }) => (
          <Link key={m.id} to={`/modulo/${m.id}`} className="group">
            <Card className="h-full transition-colors group-hover:border-indigo-500/50">
              <div className="flex items-center justify-between">
                <Badge color="indigo">Módulo {m.id}</Badge>
                <span className="text-xs text-slate-500">{Math.round(pct * 100)}%</span>
              </div>
              <h2 className="mt-3 font-semibold text-slate-100 group-hover:text-indigo-300">{m.title}</h2>
              <p className="mt-1 text-xs text-slate-400">{m.subtitle}</p>
              <ProgressBar value={pct} className="mt-4" />
              <p className="mt-2 text-xs text-slate-500">{done}/{total} exercícios</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link to="/flashcards" className="group">
          <Card className="flex h-full items-center gap-3 transition-colors group-hover:border-amber-500/50">
            <Layers className="text-amber-400" size={22} />
            <div>
              <p className="font-semibold text-slate-100">Flashcards de armadilhas</p>
              <p className="text-xs text-slate-400">Os erros que mais reprovam</p>
            </div>
          </Card>
        </Link>
        <Link to="/simulado" className="group">
          <Card className="flex h-full items-center gap-3 transition-colors group-hover:border-emerald-500/50">
            <Timer className="text-emerald-400" size={22} />
            <div>
              <p className="font-semibold text-slate-100">Simulado FAMAT</p>
              <p className="text-xs text-slate-400">5 questões cronometradas</p>
            </div>
          </Card>
        </Link>
        <Card className="flex items-center gap-3 border-slate-800/60">
          <GraduationCap className="text-indigo-400" size={22} />
          <div>
            <p className="font-semibold text-slate-100">Como estudar</p>
            <p className="text-xs text-slate-400">fundamentos → teoria → exemplo → aquecimento → lista</p>
          </div>
        </Card>
      </div>

      <Card className="mt-8 border-slate-800/60">
        <div className="flex items-start gap-3">
          <BookMarked className="mt-0.5 text-indigo-400" size={18} />
          <p className="text-sm text-slate-400">
            Referências: Listas 1 e 2 da FAMAT/UFU, com resoluções no estilo de Guidorizzi (Vol. 1) e
            Thomas (Vol. 1). Seu progresso fica salvo neste navegador.
          </p>
        </div>
      </Card>
    </div>
  );
}
