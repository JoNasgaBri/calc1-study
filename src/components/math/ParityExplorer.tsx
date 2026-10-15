import { useState } from 'react';
import { JXGBoard } from './JXGBoard';
import { Card, SectionTitle } from '../ui/Card';
import { TeX } from './TeX';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/cn';

const r = String.raw;

interface Fn {
  label: string;
  tex: string;
  fn: (x: number) => number;
  verdict: 'par' | 'ímpar' | 'nenhuma';
  domain?: (x: number) => boolean;
}

const FNS: Fn[] = [
  { label: 'x²', tex: r`f(x) = x^2`, fn: (x) => x * x, verdict: 'par' },
  { label: '|x|', tex: r`f(x) = |x|`, fn: (x) => Math.abs(x), verdict: 'par' },
  { label: '(x²−1)/(x²+1)', tex: r`f(x) = \dfrac{x^2-1}{x^2+1}`, fn: (x) => (x * x - 1) / (x * x + 1), verdict: 'par' },
  { label: 'x³', tex: r`f(x) = x^3`, fn: (x) => x * x * x, verdict: 'ímpar' },
  { label: '∛x', tex: r`f(x) = \sqrt[3]{x}`, fn: (x) => Math.cbrt(x), verdict: 'ímpar' },
  { label: '1/x', tex: r`f(x) = \dfrac{1}{x}`, fn: (x) => 1 / x, verdict: 'ímpar', domain: (x) => x !== 0 },
  { label: 'x² + x', tex: r`f(x) = x^2 + x`, fn: (x) => x * x + x, verdict: 'nenhuma' },
  { label: '(x−1)/(x+1)', tex: r`f(x) = \dfrac{x-1}{x+1}`, fn: (x) => (x - 1) / (x + 1), verdict: 'nenhuma', domain: (x) => x !== -1 },
];

const VERDICT_COLOR = { par: 'emerald', ímpar: 'indigo', nenhuma: 'amber' } as const;

export function ParityExplorer() {
  const [sel, setSel] = useState(0);
  const f = FNS[sel];

  return (
    <Card>
      <SectionTitle>Explorador de Paridade</SectionTitle>
      <p className="mt-1 text-sm text-slate-400">
        Escolha uma função e arraste o ponto <em>t</em>. O ponto azul é P = (t, f(t)); o verde é
        P′ = (−t, f(−t)). Compare as alturas: se coincidem sempre → par; se fica o simétrico invertido → ímpar.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {FNS.map((fn, i) => (
          <button
            key={fn.label}
            onClick={() => setSel(i)}
            className={cn(
              'rounded-lg border px-3 py-1.5 font-mono text-sm',
              i === sel
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200'
                : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500',
            )}
          >
            {fn.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <JXGBoard
          key={sel}
          boundingbox={[-5, 6, 5, -6]}
          height={360}
          setup={(board) => {
            board.create('functiongraph', [f.fn, -5, 5], {
              strokeColor: '#818cf8',
              strokeWidth: 2.5,
              highlight: false,
            });
            const t = board.create('slider', [[-4.5, 5.4], [-1.5, 5.4], [-4, 2, 4]], {
              name: 't',
              snapWidth: 0.01,
            });
            board.create(
              'point',
              [
                () => t.Value(),
                () => {
                  const v = t.Value();
                  if (f.domain && !f.domain(v)) return NaN;
                  return f.fn(v);
                },
              ],
              { name: 'P = (t, f(t))', size: 4, fillColor: '#818cf8', strokeColor: '#818cf8', label: { fontSize: 12, strokeColor: '#c7d2fe' } },
            );
            board.create(
              'point',
              [
                () => -t.Value(),
                () => {
                  const v = t.Value();
                  if (f.domain && !f.domain(-v)) return NaN;
                  return f.fn(-v);
                },
              ],
              { name: "P' = (−t, f(−t))", size: 4, fillColor: '#34d399', strokeColor: '#34d399', label: { fontSize: 12, strokeColor: '#a7f3d0' } },
            );
            // ponto fantasma: onde f(−t) deveria estar se f fosse par: (−t, f(t))
            board.create(
              'point',
              [() => -t.Value(), () => f.fn(t.Value())],
              { name: '(−t, f(t))', size: 3, face: 'o', fillColor: '#0f172a', strokeColor: '#64748b', label: { fontSize: 11, strokeColor: '#94a3b8' } },
            );
          }}
          deps={[sel]}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <TeX>{f.tex}</TeX>
        <Badge color={VERDICT_COLOR[f.verdict]}>
          {f.verdict === 'par' && 'função par: f(−x) = f(x)'}
          {f.verdict === 'ímpar' && 'função ímpar: f(−x) = −f(x)'}
          {f.verdict === 'nenhuma' && 'nem par nem ímpar'}
        </Badge>
      </div>
      {f.verdict === 'nenhuma' && (
        <p className="mt-2 text-xs text-slate-500">
          Repare: o ponto verde não coincide nem com o azul (falha par) nem com o oposto do azul (falha ímpar).
        </p>
      )}
    </Card>
  );
}
