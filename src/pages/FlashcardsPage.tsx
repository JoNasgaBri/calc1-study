import { FlashcardDeck } from '../components/flashcards/FlashcardDeck';

export function FlashcardsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-100">Flashcards — Armadilhas de Prova</h1>
      <p className="mt-1 text-sm text-slate-400">
        Os erros que mais derrubam em Cálculo 1. Vire o cartão, confira e marque se você domina.
      </p>
      <div className="mt-6">
        <FlashcardDeck />
      </div>
    </div>
  );
}
