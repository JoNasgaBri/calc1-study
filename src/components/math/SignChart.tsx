import { Fragment, useMemo, useState } from 'react';
import { buildSignChart } from '../../lib/signAnalysis';
import { cn } from '../../lib/cn';
import { TeX } from './TeX';
import { Card, SectionTitle } from '../ui/Card';
import { Button } from '../ui/Button';

type Op = '>' | '<' | '≥' | '≤';

/** aceita "3", "-1.5", "3/2" */
function parseNum(s: string): number | null {
  const t = s.trim();
  if (t === '') return null;
  if (/^-?\d+\s*\/\s*-?\d+$/.test(t)) {
    const [a, b] = t.split('/').map(Number);
    if (b === 0) return null;
    return a / b;
  }
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
}

function parseList(s: string): number[] {
  return s
    .split(/[,;\s]+/)
    .map(parseNum)
    .filter((v): v is number => v !== null);
}

function fmt(v: number): string {
  if (Number.isInteger(v)) return String(v);
  const sign = v < 0 ? '-' : '';
  const abs = Math.abs(v);
  for (let d = 2; d <= 9; d++) {
    const n = abs * d;
    if (Math.abs(n - Math.round(n)) < 1e-9) return `${sign}${Math.round(n)}/${d}`;
  }
  return v.toFixed(2);
}

// (9−5x)/(2x−3) = −(5/2)·(x−9/5)/(x−3/2): constante negativa
const PRESETS = [
  { label: 'Ex. 1(i)', num: '9/5', den: '3/2', op: '≤' as Op, neg: true },
  { label: 'Ex. 1(k)', num: '14/3', den: '3', op: '>' as Op, neg: true },
  { label: 'Ex. 6(d)', num: '-3 3', den: '-1', op: '<' as Op, neg: false },
];

function factorLabel(r: number) {
  if (r === 0) return 'x';
  return r > 0 ? `x − ${fmt(r)}` : `x + ${fmt(-r)}`;
}

export function SignChart() {
  const [numInput, setNumInput] = useState('9/5');
  const [denInput, setDenInput] = useState('3/2');
  const [op, setOp] = useState<Op>('≤');
  const [neg, setNeg] = useState(true);

  const numRoots = useMemo(() => parseList(numInput), [numInput]);
  const denRoots = useMemo(() => parseList(denInput), [denInput]);
  const model = useMemo(() => {
    if (numRoots.length === 0 && denRoots.length === 0) return null;
    const dup = new Set<string>();
    for (const v of [...numRoots, ...denRoots]) {
      const k = v.toFixed(9);
      if (dup.has(k)) return null; // raiz duplicada entre num e den
      dup.add(k);
    }
    const m = buildSignChart(numRoots, denRoots, neg);
    let ni = 0;
    let di = 0;
    for (const row of m.rows) {
      if (row.kind === 'num' && row.rootIndex >= 0) row.label = factorLabel(numRoots[ni++]);
      else if (row.kind === 'den') row.label = `${factorLabel(denRoots[di++])}  (den.)`;
    }
    return m;
  }, [numRoots, denRoots, neg]);

  // solução: intervalos cujo sinal bate com o operador
  const solution = useMemo(() => {
    if (!model) return '';
    const wantPos = op === '>' || op === '≥';
    const resRow = model.rows[model.rows.length - 1];
    const parts: string[] = [];
    const n = model.roots.length;
    const closed = (v: number) =>
      (op === '≥' || op === '≤') &&
      !model.roots.find((rr) => rr.value === v)?.isDenominator;

    for (let i = 0; i <= n; i++) {
      const sign = resRow.signs[i];
      const match = wantPos ? sign === '+' : sign === '-';
      if (!match) continue;
      const left = i === 0 ? '-∞' : fmt(model.roots[i - 1].value);
      const right = i === n ? '+∞' : fmt(model.roots[i].value);
      const lb = i === 0 ? '(' : closed(model.roots[i - 1].value) ? '[' : '(';
      const rb = i === n ? ')' : closed(model.roots[i].value) ? ']' : ')';
      parts.push(`${lb}${left}, ${right}${rb}`);
    }
    return parts.length ? parts.join(' \\cup ') : '\\varnothing';
  }, [model, op]);

  return (
    <Card>
      <SectionTitle>Varal de Sinais Dinâmico</SectionTitle>
      <p className="mt-1 text-sm text-slate-400">
        Escreva a expressão como <span className="text-slate-300">c · (x − r₁)(x − r₂)… / (x − s₁)…</span> e
        informe as raízes (separe por espaço; frações como <code className="text-indigo-300">9/5</code> funcionam).
        Se a constante c for negativa — ex.: <span className="text-slate-300">9 − 5x = −5(x − 9/5)</span> — marque a
        opção abaixo, pois ela inverte todos os sinais.
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="text-xs text-slate-400">
          Raízes do numerador
          <input
            value={numInput}
            onChange={(e) => setNumInput(e.target.value)}
            className="mt-1 block w-40 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
            placeholder="ex.: 9/5  ou  -3 3"
          />
        </label>
        <label className="text-xs text-slate-400">
          Raízes do denominador
          <input
            value={denInput}
            onChange={(e) => setDenInput(e.target.value)}
            className="mt-1 block w-40 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
            placeholder="ex.: 3/2"
          />
        </label>
        <label className="text-xs text-slate-400">
          Sinal pedido
          <div className="mt-1 flex gap-1">
            {(['>', '<', '≥', '≤'] as Op[]).map((o) => (
              <button
                key={o}
                onClick={() => setOp(o)}
                className={cn(
                  'h-9 w-9 rounded-lg border text-sm font-bold',
                  op === o
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500',
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </label>
        <div className="flex gap-1 pb-1">
          {PRESETS.map((p) => (
            <Button
              key={p.label}
              variant="secondary"
              className="px-2 py-1 text-xs"
              onClick={() => {
                setNumInput(p.num);
                setDenInput(p.den);
                setOp(p.op);
                setNeg(p.neg);
              }}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={neg} onChange={(e) => setNeg(e.target.checked)} className="accent-indigo-500" />
        constante c negativa
      </label>

      {!model && (
        <p className="mt-4 text-sm text-amber-400">
          Insira pelo menos uma raiz (e evite a mesma raiz no numerador e no denominador).
        </p>
      )}

      {model && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-center text-sm">
            <thead>
              <tr>
                <th className="border-b border-slate-700 px-2 py-1 text-left text-xs text-slate-400">fator</th>
                {model.rows[0].signs.map((_, i) => {
                  const rt = model.roots[i];
                  return (
                    <Fragment key={`h${i}`}>
                      <th className="border-b border-slate-700" />
                      <th className="border-b border-slate-700 px-1 py-1">
                        {rt && (
                          <span className={cn('font-mono text-xs font-bold', rt.isDenominator ? 'text-rose-400' : 'text-slate-200')}>
                            {fmt(rt.value)}
                          </span>
                        )}
                      </th>
                    </Fragment>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {model.rows.map((row, ri) => (
                <tr key={ri} className={cn(row.kind === 'result' && 'font-bold')}>
                  <td className="px-2 py-1.5 text-left text-xs text-slate-400 whitespace-nowrap">
                    {row.label}
                  </td>
                  {row.signs.map((s, i) => {
                    const root = i < model.roots.length ? model.roots[i] : null;
                    const isOwnRoot = row.rootIndex === i;
                    return (
                      <Fragment key={i}>
                        <td
                          className={cn(
                            'min-w-[3rem] px-2 py-1.5',
                            row.kind === 'result'
                              ? s === '+'
                                ? 'bg-emerald-500/15 text-emerald-300'
                                : 'bg-rose-500/15 text-rose-300'
                              : s === '+'
                                ? 'text-emerald-400/70'
                                : 'text-rose-400/70',
                          )}
                        >
                          {s}
                        </td>
                        <td className="w-6 border-l border-slate-700 px-1 py-1.5 text-xs">
                          {isOwnRoot && root ? (
                            <span className={root.isDenominator ? 'text-rose-400' : 'text-slate-300'}>
                              {root.isDenominator ? '∄' : '0'}
                            </span>
                          ) : row.kind === 'result' && root ? (
                            <span className={root.isDenominator ? 'text-rose-400' : 'text-slate-300'}>
                              {root.isDenominator ? '∄' : '0'}
                            </span>
                          ) : null}
                        </td>
                      </Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* reta real */}
          <svg viewBox="0 0 600 70" className="mt-4 w-full max-w-2xl">
            {(() => {
              const n = model.roots.length;
              const step = 560 / (n + 1);
              const xs = model.roots.map((_, i) => 20 + (i + 1) * step);
              const res = model.rows[model.rows.length - 1].signs;
              const wantPos = op === '>' || op === '≥';
              return (
                <>
                  <line x1="20" y1="35" x2="580" y2="35" stroke="#475569" strokeWidth="2" />
                  {res.map((s, i) => {
                    const x0 = i === 0 ? 20 : xs[i - 1];
                    const x1 = i === n ? 580 : xs[i];
                    const ok = wantPos ? s === '+' : s === '-';
                    return (
                      <g key={`seg${i}`}>
                        {ok && <line x1={x0} y1="35" x2={x1} y2="35" stroke="#34d399" strokeWidth="5" strokeOpacity="0.6" />}
                        <text x={(x0 + x1) / 2} y={22} textAnchor="middle" fontSize="14" fontWeight="bold" fill={s === '+' ? '#34d399' : '#fb7185'}>
                          {s}
                        </text>
                      </g>
                    );
                  })}
                  {model.roots.map((rt, i) => {
                    const filled = !rt.isDenominator && (op === '≥' || op === '≤');
                    return (
                      <g key={`r${i}`}>
                        <circle cx={xs[i]} cy={35} r={6} fill={filled ? '#818cf8' : '#0f172a'} stroke={rt.isDenominator ? '#f43f5e' : '#818cf8'} strokeWidth={2} />
                        <text x={xs[i]} y={60} textAnchor="middle" fill="#94a3b8" fontSize="12">
                          {fmt(rt.value)}
                        </text>
                      </g>
                    );
                  })}
                </>
              );
            })()}
          </svg>

          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-slate-950/60 px-4 py-3">
            <span className="text-sm text-slate-400">Solução para expressão {op} 0:</span>
            <TeX className="text-emerald-300">{`S = ${solution}`}</TeX>
          </div>
        </div>
      )}
    </Card>
  );
}
