import { useEffect, useRef } from 'react';
import JXG from 'jsxgraph';
import { cn } from '../../lib/cn';

interface Props {
  /** chamado com o board já criado; deve retornar cleanup opcional */
  setup: (board: JXG.Board) => void;
  boundingbox?: [number, number, number, number];
  height?: number;
  className?: string;
  /** força recriação quando mudar */
  deps?: unknown[];
}

let idCounter = 0;

export function JXGBoard({ setup, boundingbox = [-6, 5, 6, -5], height = 340, className, deps = [] }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(`jgx-box-${++idCounter}`);
  const boardRef = useRef<JXG.Board | null>(null);

  useEffect(() => {
    const board = JXG.JSXGraph.initBoard(idRef.current, {
      boundingbox,
      axis: true,
      showCopyright: false,
      showNavigation: false,
      pan: { enabled: false },
      zoom: { wheel: false, needShift: true },
    });
    boardRef.current = board;
    setup(board);
    return () => {
      JXG.JSXGraph.freeBoard(board);
      boardRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return (
    <div
      id={idRef.current}
      ref={boxRef}
      className={cn('jxgbox w-full rounded-lg border border-slate-700 bg-slate-900', className)}
      style={{ height }}
    />
  );
}
