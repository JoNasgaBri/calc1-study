# Calc1 Study

App de estudo de Cálculo 1 (FAMAT/UFU) — React 18 + TypeScript + Vite, Tailwind, KaTeX, JSXGraph, Zustand (persist em localStorage, chave `calc1-progress`). Conteúdo em pt-BR.

## Comandos
- `npm run dev` — servidor de desenvolvimento (http://localhost:5173)
- `npm run build` — `tsc --noEmit` + build estático em `dist/` (HashRouter, `base: './'`, funciona em qualquer host estático)

## Estrutura
- `src/data/` — todo o conteúdo: `modules.ts` (seções/teoria), `exercises.ts` (exercícios reais das Listas 1 e 2 em `Lista1.pdf`/`Lista2.pdf`), `examples.ts`, `flashcards.ts`, `quiz.ts`
- Exercícios com `quiz` (alternativas) entram no sorteio do simulado por `tags`; manter ≥3 por tag
- LaTeX: usar `String.raw` (`r\`...\``); macros `\sen` e `\tg` definidas em `components/math/TeX.tsx`
- Gráficos JSXGraph: sempre via `JXGBoard` (faz `freeBoard` no cleanup)
- CSS do JSXGraph importado por caminho relativo a `node_modules` (o pacote não exporta o subpath)
