import { useState } from 'react';
import { RotateCcw, Shuffle } from 'lucide-react';
import { flashcards } from '../../data/flashcards';
import { useProgress } from '../../store/progress';
import { Button } from '../ui/Button';
import { TeX } from '../math/TeX';
import { cn } from '../../lib/cn';

export function FlashcardDeck() {
  const [order, setOrder] = useState<number[]>(() => flashcards.map((_, i) => i));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { flashcardStatus, markFlashcard } = useProgress();

  const card = flashcards[order[idx]];
  const status = card ? flashcardStatus[card.id] : undefined;

  const next = (known: boolean) => {
    markFlashcard(card.id, known);
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i + 1) % order.length), 150);
  };

  const shuffle = () => {
    setOrder((o) => [...o].sort(() => Math.random() - 0.5));
    setIdx(0);
    setFlipped(false);
  };

  if (!card) return null;
  const knownCount = order.filter((i) => flashcardStatus[flashcards[i].id] === 'known').length;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>
          cartão {idx + 1} de {order.length} · <span className="text-emerald-400">{knownCount} dominados</span>
        </span>
        <Button variant="ghost" className="px-2 py-1 text-xs" onClick={shuffle}>
          <Shuffle size={14} /> embaralhar
        </Button>
      </div>

      <div
        className={cn('flip-card mt-4 h-64 cursor-pointer select-none', flipped && 'flipped')}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flip-card-inner relative h-full w-full">
          <div className="flip-face absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">
            <span className="mb-2 text-xs uppercase tracking-wide text-indigo-400">armadilha de prova</span>
            <p className="text-base text-slate-100">{card.front}</p>
            {card.frontTex && <TeX block className="mt-3 text-lg">{card.frontTex}</TeX>}
            <span className="mt-4 text-xs text-slate-500">clique para virar</span>
          </div>
          <div className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-indigo-500/40 bg-indigo-950/60 p-6 text-center">
            <p className="text-sm leading-relaxed text-indigo-100">{card.back}</p>
            {card.backTex && <TeX block className="mt-3">{card.backTex}</TeX>}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <Button variant="danger" onClick={() => next(false)}>
          <RotateCcw size={15} /> Ainda erro
        </Button>
        <Button variant="success" onClick={() => next(true)}>
          Domino essa
        </Button>
      </div>
      {status && (
        <p className="mt-2 text-center text-xs text-slate-500">
          status atual: {status === 'known' ? 'dominado' : 'revisar'}
        </p>
      )}
    </div>
  );
}
