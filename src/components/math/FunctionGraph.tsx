import { JXGBoard } from './JXGBoard';

export interface PlotPiece {
  fn: (x: number) => number;
  domain: [number, number];
  color?: string;
  dashed?: boolean;
  strokeWidth?: number;
}

export interface PlotSpec {
  pieces: PlotPiece[];
  openPoints?: [number, number][];
  closedPoints?: [number, number][];
  /** retas verticais x = c tracejadas */
  vLines?: number[];
  /** retas horizontais y = c tracejadas */
  hLines?: number[];
  bounds?: [number, number, number, number];
  height?: number;
}

const INDIGO = '#818cf8';

export function FunctionGraph({ spec }: { spec: PlotSpec }) {
  return (
    <JXGBoard
      boundingbox={spec.bounds ?? [-6, 5, 6, -5]}
      height={spec.height ?? 340}
      setup={(board) => {
        for (const p of spec.pieces) {
          board.create(
            'functiongraph',
            [p.fn, p.domain[0], p.domain[1]],
            {
              strokeColor: p.color ?? INDIGO,
              strokeWidth: p.strokeWidth ?? 2.5,
              dash: p.dashed ? 2 : 0,
              highlight: false,
            },
          );
        }
        for (const c of spec.vLines ?? []) {
          board.create('line', [[c, 0], [c, 1]], {
            straightFirst: true,
            straightLast: true,
            strokeColor: '#f43f5e',
            dash: 2,
            fixed: true,
            highlight: false,
          });
        }
        for (const c of spec.hLines ?? []) {
          board.create('line', [[0, c], [1, c]], {
            straightFirst: true,
            straightLast: true,
            strokeColor: '#f59e0b',
            dash: 2,
            fixed: true,
            highlight: false,
          });
        }
        for (const [x, y] of spec.openPoints ?? []) {
          board.create('point', [x, y], {
            name: '',
            size: 4,
            face: 'o',
            fillColor: '#0f172a',
            strokeColor: INDIGO,
            strokeWidth: 2,
            fixed: true,
            highlight: false,
          });
        }
        for (const [x, y] of spec.closedPoints ?? []) {
          board.create('point', [x, y], {
            name: '',
            size: 4,
            face: 'o',
            fillColor: INDIGO,
            strokeColor: INDIGO,
            fixed: true,
            highlight: false,
          });
        }
      }}
      deps={[JSON.stringify({ o: spec.openPoints, c: spec.closedPoints, v: spec.vLines, h: spec.hLines, b: spec.bounds })]}
    />
  );
}
