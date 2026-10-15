import { useEffect, useRef, useState } from 'react';
import JXG from 'jsxgraph';
import { Check, X } from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TeX } from './TeX';
import { cn } from '../../lib/cn';

const r = String.raw;
const INDIGO = '#818cf8';
const EMERALD = '#34d399';
const ROSE = '#fb7185';

type CaseId = 'jump' | 'removable' | 'infinite';

interface ContinuityCase {
  label: string;
  tex: string;
  a: number;
  left: (x: number) => number;
  right: (x: number) => number;
  /** f(a), ou undefined se não definido */
  fa?: number;
  /** domínio de cada ramo para o gráfico */
  leftDomain: [number, number];
  rightDomain: [number, number];
  bounds: [number, number, number, number];
  limLeft: string;
  limRight: string;
  bilateral: string;
  checklist: [boolean, boolean, boolean];
  verdict: string;
  verticalAsymptote?: number;
}

const CASES: Record<CaseId, ContinuityCase> = {
  jump: {
    label: 'Salto',
    tex: r`f(x) = \dfrac{|x|}{x},\quad a = 0`,
    a: 0,
    left: () => -1,
    right: () => 1,
    leftDomain: [-6, -0.02],
    rightDomain: [0.02, 6],
    bounds: [-6, 4, 6, -4],
    limLeft: '-1',
    limRight: '+1',
    bilateral: 'não existe',
    checklist: [false, false, false],
    verdict: 'Descontinuidade de SALTO: os laterais existem mas são diferentes. f(0) nem é definida.',
  },
  removable: {
    label: 'Removível',
    tex: r`f(x) = \begin{cases} \dfrac{x^2-1}{x-1} & x \neq 1 \\ 3 & x = 1 \end{cases},\quad a = 1`,
    a: 1,
    left: (x) => (x * x - 1) / (x - 1),
    right: (x) => (x * x - 1) / (x - 1),
    fa: 3,
    leftDomain: [-4, 0.98],
    rightDomain: [1.02, 6],
    bounds: [-4, 6, 6, -3],
    limLeft: '2',
    limRight: '2',
    bilateral: '2',
    checklist: [true, true, false],
    verdict:
      'Descontinuidade REMOVÍVEL: f(1) existe e o limite existe, mas 3 ≠ 2. "Removível" porque redefinir f(1) = 2 consertaria.',
  },
  infinite: {
    label: 'Infinita',
    tex: r`f(x) = \dfrac{1}{x},\quad a = 0`,
    a: 0,
    left: (x) => 1 / x,
    right: (x) => 1 / x,
    leftDomain: [-6, -0.05],
    rightDomain: [0.05, 6],
    bounds: [-6, 6, 6, -6],
    limLeft: '-∞',
    limRight: '+∞',
    bilateral: 'não existe',
    checklist: [false, false, false],
    verdict: 'Descontinuidade INFINITA: os laterais explodem em sentidos opostos — x = 0 é assíntota vertical.',
    verticalAsymptote: 0,
  },
};

export function ContinuitySim() {
  const [caseId, setCaseId] = useState<CaseId>('jump');
  const [delta, setDelta] = useState(1.2);
  const c = CASES[caseId];
  const boxId = useRef(`jxg-cont-${Math.random().toString(36).slice(2)}`);
  const boardRef = useRef<JXG.Board | null>(null);
  const deltaRef = useRef(delta);
  deltaRef.current = delta;

  useEffect(() => {
    const cc = CASES[caseId];
    const board = JXG.JSXGraph.initBoard(boxId.current, {
      boundingbox: cc.bounds,
      axis: true,
      showCopyright: false,
      showNavigation: false,
      pan: { enabled: false },
      zoom: { wheel: false, needShift: true },
    });
    boardRef.current = board;

    if (cc.verticalAsymptote !== undefined) {
      board.create('line', [[cc.verticalAsymptote, 0], [cc.verticalAsymptote, 1]], {
        straightFirst: true, straightLast: true, strokeColor: ROSE, dash: 2, fixed: true, highlight: false,
      });
    }

    board.create('functiongraph', [cc.left, ...cc.leftDomain], { strokeColor: INDIGO, strokeWidth: 2.5, highlight: false });
    board.create('functiongraph', [cc.right, ...cc.rightDomain], { strokeColor: INDIGO, strokeWidth: 2.5, highlight: false });

    // pontos abertos nas extremidades dos ramos
    const eps = 0.02;
    board.create('point', [cc.a - eps, cc.left(cc.a - eps)], {
      name: '', size: 4, face: 'o', fillColor: '#0f172a', strokeColor: INDIGO, strokeWidth: 2, fixed: true, highlight: false,
    });
    board.create('point', [cc.a + eps, cc.right(cc.a + eps)], {
      name: '', size: 4, face: 'o', fillColor: '#0f172a', strokeColor: INDIGO, strokeWidth: 2, fixed: true, highlight: false,
    });
    if (cc.fa !== undefined) {
      board.create('point', [cc.a, cc.fa], {
        name: `f(${cc.a}) = ${cc.fa}`, size: 4, face: 'o', fillColor: EMERALD, strokeColor: EMERALD, fixed: true, highlight: false,
        label: { fontSize: 12, strokeColor: '#a7f3d0' },
      });
    }

    // aproximações móveis
    board.create('point', [() => cc.a - deltaRef.current, () => cc.left(cc.a - deltaRef.current)], {
      name: 'x→a⁻', size: 4.5, fillColor: ROSE, strokeColor: ROSE, fixed: true, highlight: false,
      label: { fontSize: 12, strokeColor: '#fecdd3', offset: [-30, -10] },
    });
    board.create('point', [() => cc.a + deltaRef.current, () => cc.right(cc.a + deltaRef.current)], {
      name: 'x→a⁺', size: 4.5, fillColor: EMERALD, strokeColor: EMERALD, fixed: true, highlight: false,
      label: { fontSize: 12, strokeColor: '#a7f3d0', offset: [8, -10] },
    });

    return () => {
      JXG.JSXGraph.freeBoard(board);
      boardRef.current = null;
    };
  }, [caseId]);

  useEffect(() => {
    boardRef.current?.update();
  }, [delta]);

  const fmtVal = (v: number) => (Number.isFinite(v) ? v.toFixed(3) : '—');

  return (
    <Card>
      <SectionTitle>Simulador de Continuidade</SectionTitle>
      <p className="mt-1 text-sm text-slate-400">
        Escolha o tipo de descontinuidade e aproxime o ponto deslizando δ → 0. O ponto rosa vem pela
        esquerda (a − δ) e o verde pela direita (a + δ).
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {(Object.keys(CASES) as CaseId[]).map((k) => (
          <button
            key={k}
            onClick={() => setCaseId(k)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-sm font-medium',
              caseId === k
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200'
                : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500',
            )}
          >
            {CASES[k].label}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <TeX>{c.tex}</TeX>
      </div>

      <div className="mt-3">
        <div id={boxId.current} className="jxgbox w-full rounded-lg border border-slate-700 bg-slate-900" style={{ height: 340 }} />
      </div>

      <label className="mt-4 block text-xs text-slate-400">
        distância δ até a = {c.a}: <span className="font-mono text-indigo-300">{delta.toFixed(3)}</span>
        <input
          type="range"
          min={0.001}
          max={2.5}
          step={0.001}
          value={delta}
          onChange={(e) => setDelta(Number(e.target.value))}
          className="mt-1 w-full accent-indigo-500"
        />
      </label>

      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <div className="rounded-lg bg-slate-950/60 px-3 py-2">
          <span className="text-rose-300">esquerda:</span> f({c.a} − δ) = f({(c.a - delta).toFixed(3)}) ={' '}
          <span className="font-mono text-rose-300">{fmtVal(c.left(c.a - delta))}</span>
          <span className="block text-xs text-slate-500">→ lim x→a⁻ = {c.limLeft}</span>
        </div>
        <div className="rounded-lg bg-slate-950/60 px-3 py-2">
          <span className="text-emerald-300">direita:</span> f({c.a} + δ) = f({(c.a + delta).toFixed(3)}) ={' '}
          <span className="font-mono text-emerald-300">{fmtVal(c.right(c.a + delta))}</span>
          <span className="block text-xs text-slate-500">→ lim x→a⁺ = {c.limRight}</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Checklist de continuidade</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {[
            `f(${c.a}) existe`,
            'limite bilateral existe',
            `lim = f(${c.a})`,
          ].map((label, i) => (
            <li key={i} className="flex items-center gap-2">
              {c.checklist[i] ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <X size={16} className="text-rose-400" />
              )}
              <span className={c.checklist[i] ? 'text-slate-300' : 'text-slate-500 line-through-none'}>{label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <Badge color="amber">{c.verdict}</Badge>
        </div>
      </div>
    </Card>
  );
}
