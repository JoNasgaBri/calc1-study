import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { TeX } from './TeX';
import { cn } from '../../lib/cn';

const r = String.raw;

type Step = 'sub' | 'shape' | 'done';

interface Result {
  title: string;
  tex?: string;
  body: string;
  variant: 'ok' | 'tech';
}

const RESULTS: Record<string, Result> = {
  numero: {
    title: 'Substituição direta resolveu',
    body: 'Se a substituição deu um número (e o denominador não zerou), esse número é o limite. Técnica encerrada — a maioria dos limites "de verdade" cai aqui depois de uma simplificação.',
    variant: 'ok',
  },
  'nao-zero': {
    title: 'Denominador zero, numerador não → infinito',
    body: 'Se deu número/0, o limite explode: analise os laterais e o sinal do denominador de cada lado. Resultado: +∞, −∞ ou não existe (laterais opostos). É o caso do Ex. 15 da Lista 2.',
    tex: r`\dfrac{k}{0},\ k\neq 0 \;\Rightarrow\; \pm\infty\ \text{(conferir laterais)}`,
    variant: 'ok',
  },
  infinitos: {
    title: '∞/∞ ou ∞ − ∞',
    body: '∞/∞ em fração → coloque a maior potência em evidência (ou compare graus). ∞ − ∞ com raiz → conjugado; sem raiz → ponha o termo dominante em evidência.',
    tex: r`\sqrt{A} - B = \dfrac{A - B^2}{\sqrt{A} + B}`,
    variant: 'tech',
  },
  poli: {
    title: '0/0 com polinômios → FATORAÇÃO',
    tex: r`x^2 - a^2 = (x-a)(x+a) \qquad x^3 - a^3 = (x-a)(x^2+ax+a^2)`,
    body: 'O fator (x − a) está garantido nos dois lados. Trinômio: soma/produto ou Bhaskara. Grau ≥ 3: Briot-Ruffini com a raiz a. Cancele e substitua de novo.',
    variant: 'tech',
  },
  raiz2: {
    title: '0/0 com raiz quadrada → CONJUGADO',
    tex: r`(\sqrt{A} - B)(\sqrt{A} + B) = A - B^2`,
    body: 'Multiplique em cima e embaixo pelo conjugado. A raiz some do numerador e revela o fator (x − a) para cancelar.',
    variant: 'tech',
  },
  raiz3: {
    title: '0/0 com raiz cúbica → a³ − b³ ou u = ∛x',
    tex: r`a^3 - b^3 = (a-b)(a^2+ab+b^2) \qquad\text{ou}\qquad u = \sqrt[3]{x}\ (x = u^3)`,
    body: 'Caminho 1: fatore o outro lado como diferença de cubos. Caminho 2 (mais rápido): troca de variável u = ∛x — lembre que o ponto do limite muda junto (x → 1 vira u → 1).',
    variant: 'tech',
  },
};

const BTN = 'rounded-lg border px-4 py-2.5 text-sm font-medium text-left transition-colors';

export function DecisionTree() {
  const [step, setStep] = useState<Step>('sub');
  const [result, setResult] = useState<string | null>(null);

  const reset = () => {
    setStep('sub');
    setResult(null);
  };

  const pick = (key: string) => {
    if (key === 'zero-zero') setStep('shape');
    else {
      setResult(key);
      setStep('done');
    }
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <SectionTitle>Árvore de Decisão do Limite</SectionTitle>
          <p className="mt-1 text-sm text-slate-400">
            Simule o raciocínio: cada resposta sua leva à próxima pergunta ou à técnica certa.
          </p>
        </div>
        {(step !== 'sub' || result) && (
          <button onClick={reset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300">
            <RotateCcw size={14} /> recomeçar
          </button>
        )}
      </div>

      {step === 'sub' && (
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-200">
            Passo 0 — Ao substituir <TeX>x = a</TeX> na expressão, o que acontece?
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              { k: 'numero', label: 'Deu um número', desc: 'ex.: 7/2' },
              { k: 'nao-zero', label: 'Número sobre zero', desc: 'ex.: 5/0' },
              { k: 'zero-zero', label: 'Deu 0/0', desc: 'numerador e denominador zeram' },
              { k: 'infinitos', label: '∞/∞ ou ∞ − ∞', desc: 'limites no infinito' },
            ].map((o) => (
              <button
                key={o.k}
                onClick={() => pick(o.k)}
                className={cn(BTN, 'border-slate-700 bg-slate-950 text-slate-200 hover:border-indigo-500 hover:bg-indigo-500/10')}
              >
                <span className="block">{o.label}</span>
                <span className="block text-xs text-slate-500">{o.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'shape' && (
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-200">
            Deu <TeX>0/0</TeX>. Agora: qual é a estrutura da expressão?
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              { k: 'poli', label: 'Só polinômios', desc: 'ex.: (x³−x²−x+10)/(x²+3x+2)' },
              { k: 'raiz2', label: 'Tem √ ', desc: 'ex.: (√(x+5) − 2)/(x+1)' },
              { k: 'raiz3', label: 'Tem ∛', desc: 'ex.: (∛x − 1)/(x−1)' },
            ].map((o) => (
              <button
                key={o.k}
                onClick={() => {
                  setResult(o.k);
                  setStep('done');
                }}
                className={cn(BTN, 'border-slate-700 bg-slate-950 text-slate-200 hover:border-indigo-500 hover:bg-indigo-500/10')}
              >
                <span className="block">{o.label}</span>
                <span className="block text-xs text-slate-500">{o.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'done' && result && (
        <div
          className={cn(
            'mt-4 rounded-lg border p-4',
            RESULTS[result].variant === 'tech' ? 'border-indigo-500/40 bg-indigo-500/10' : 'border-emerald-500/40 bg-emerald-500/10',
          )}
        >
          <p className="font-semibold text-slate-100">{RESULTS[result].title}</p>
          {RESULTS[result].tex && <TeX block className="mt-2 text-indigo-200">{RESULTS[result].tex!}</TeX>}
          <p className="mt-2 text-sm text-slate-300">{RESULTS[result].body}</p>
          <button onClick={reset} className="mt-3 text-xs text-indigo-300 hover:text-indigo-200">
            ← testar outro caminho
          </button>
        </div>
      )}
    </Card>
  );
}
