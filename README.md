# Calc1 Study

Aplicação web interativa para estudo de **Cálculo 1**, com foco em ensino ativo: teoria gradual, exemplos resolvidos passo a passo, ferramentas visuais, exercícios com dicas socráticas, flashcards de armadilhas e um simulado cronometrado.

Acesse a versão publicada em:

**https://jonasgabri.github.io/calc1-study/**

---

## Conteúdo

O app está organizado em 6 módulos que cobrem os fundamentos de Cálculo 1:

1. **Números Reais e Inequações** — produto/quociente, valor absoluto e varal de sinais interativo.
2. **Funções, Domínio e Compostas** — restrições de domínio, composição formal, razão incremental e visualização de paridade.
3. **Limites Algébricos e Indeterminações `0/0`** — árvore de decisão com fatoração, conjugado e racionalização.
4. **Limites Laterais e Continuidade** — simulador visual de saltos, pontos removíveis e assíntotas verticais.
5. **Limites no Infinito e Assíntotas Horizontais** — comparação de graus, `|x|` em `−∞` e indeterminações `∞−∞`.
6. **Limites Fundamentais e Teorema do Confronto** — limites trigonométricos, exponenciais e sanduíche.

Cada módulo segue uma trilha de aprendizado:

- Fundamentos de pré-cálculo
- Teoria sintética e regras
- Exemplo resolvido com revelação gradual
- Exercícios de aquecimento
- Exercícios reais das listas de estudo

---

## Funcionalidades

- **Renderização matemática** com KaTeX (LaTeX estrito).
- **Gráficos interativos** com JSXGraph: funções, paridade, descontinuidades e assíntotas.
- **Varal de Sinais dinâmico**: insira raízes de numerador/denominador e visualize intervalos, sinais e pontos abertos/fechados.
- **Modo socrático** nos exercícios: primeiro passo → armadilha → resolução completa.
- **Flashcards** com erros mais comuns de prova.
- **Simulado cronometrado** de 5 questões (15, 25 ou 40 min) com relatório de pontos fortes e fracos.
- **Progresso persistente** no navegador via `localStorage` (Zustand).
- **Layout responsivo** para desktop e celular, com tema escuro.

---

## Stack Tecnológica

- [React](https://react.dev/) 18 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [KaTeX](https://katex.org/)
- [JSXGraph](https://jsxgraph.uni-bayreuth.de/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com/) (HashRouter)
- [Lucide React](https://lucide.dev/)

---

## Como rodar localmente

Requisitos: Node.js 18+ e npm.

```bash
# Clone o repositório
git clone https://github.com/JoNasgaBri/calc1-study.git
cd calc1-study

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
```

O build estático será gerado na pasta `dist/`.

---

## Estrutura do projeto

```
calc1-study/
├── .github/workflows/    # Workflow de deploy no GitHub Pages
├── public/               # Assets estáticos
├── src/
│   ├── components/       # Componentes React (UI, matemática, exercício, quiz)
│   ├── data/             # Conteúdo educacional: módulos, exercícios, exemplos, flashcards, quiz
│   ├── lib/              # Helpers e lógica de análise de sinais
│   ├── pages/            # Páginas principais (Home, Module, Flashcards, Quiz)
│   ├── store/            # Zustand: progresso do estudante
│   ├── App.tsx           # Rotas e HashRouter
│   └── main.tsx          # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

Os conteúdos dos 6 módulos ficam em `src/data/modules.ts`, `src/data/exercises.ts` e `src/data/examples.ts`, separados da camada de apresentação para facilitar manutenção e expansão.

---

## Deploy

O deploy é feito automaticamente para o GitHub Pages a cada push na branch `main`, via GitHub Actions. O workflow:

1. Instala as dependências.
2. Executa `npm run build`.
3. Faz upload do conteúdo de `dist/` como artefato.
4. Publica no GitHub Pages.

A configuração usa `HashRouter` e `base: './'` no Vite, então funciona em qualquer host estático sem necessidade de regras de rewrite no servidor.

---

## Como contribuir ou expandir

- Para adicionar novos exercícios, edite `src/data/exercises.ts` e siga o schema em `src/data/types.ts`.
- Para adicionar novos exemplos resolvidos, use `src/data/examples.ts`.
- Para aumentar o banco do simulado, adicione alternativas (`quiz`) em exercícios com as tags correspondentes.
- Novas ferramentas interativas podem ser adicionadas em `src/components/math/` e referenciadas nos módulos.

---

## Licença

Este projeto é de uso pessoal/educacional. O código-fonte está disponível publicamente no GitHub.
