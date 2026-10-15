import { useEffect, useRef } from 'react';
import { AlertOctagon, BookOpen, CheckCircle2 } from 'lucide-react';
import type { TheoryBlock } from '../../data/types';
import { TeX } from '../math/TeX';
import { Card, SectionTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useProgress } from '../../store/progress';
import { cn } from '../../lib/cn';

/** Renderiza texto com trechos $...$ em KaTeX inline. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\$([^$]+)\$/g);
  return (
    <span className={className}>
      {parts.map((p, i) => (i % 2 === 1 ? <TeX key={i}>{p}</TeX> : <span key={i}>{p}</span>))}
    </span>
  );
}

function Block({ block }: { block: TheoryBlock }) {
  switch (block.kind) {
    case 'p':
      return <RichText text={block.text} className="text-sm leading-relaxed text-slate-300" />;
    case 'tex':
      return <TeX block className="rounded-lg bg-slate-950/60 px-4 py-3 text-base" children={block.tex} />;
    case 'list':
      return (
        <ul className="list-inside space-y-1.5 text-sm text-slate-300">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
              <RichText text={it} />
            </li>
          ))}
        </ul>
      );
    case 'trap':
      return (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-rose-300">
            <AlertOctagon size={16} /> {block.title}
          </p>
          <RichText text={block.text} className="mt-2 block text-sm leading-relaxed text-rose-100/90" />
        </div>
      );
    case 'rule':
      return (
        <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
            <BookOpen size={16} /> {block.title}
          </p>
          {block.tex && <TeX block className="mt-2 text-base text-indigo-100">{block.tex}</TeX>}
          {block.list && (
            <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
              {block.list.map((it, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  <RichText text={it} />
                </li>
              ))}
            </ul>
          )}
          {block.text && <RichText text={block.text} className="mt-2 block text-sm leading-relaxed text-slate-300" />}
        </div>
      );
  }
}

export function TheorySection({ id, title, blocks }: { id: string; title: string; blocks: TheoryBlock[] }) {
  const read = useProgress((s) => !!s.theoryRead[id]);
  const markTheory = useProgress((s) => s.markTheory);
  const ref = useRef<HTMLDivElement>(null);

  // marca como lida quando a seção entra na viewport por 1.5s
  useEffect(() => {
    if (read) return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        clearTimeout(timer);
        if (entries[0].isIntersecting) timer = setTimeout(() => markTheory(id), 1500);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, [id, read, markTheory]);

  return (
    <Card>
      <div ref={ref} className="flex items-start justify-between gap-3">
        <SectionTitle>{title}</SectionTitle>
        <Button
          variant={read ? 'secondary' : 'ghost'}
          className={cn('shrink-0 px-3 py-1.5 text-xs', read && 'text-emerald-300')}
          onClick={() => markTheory(id)}
        >
          <CheckCircle2 size={14} /> {read ? 'lida' : 'marcar como lida'}
        </Button>
      </div>
      <div className="mt-4 space-y-4">
        {blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </Card>
  );
}
