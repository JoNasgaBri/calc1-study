/**
 * Lógica pura do Varal de Sinais.
 * Dado um produto/quociente de fatores lineares (x - r_i), particiona a reta
 * real nas raízes e calcula o sinal de cada fator e do resultado em cada intervalo.
 */

export interface SignRow {
  label: string; // ex.: "(x - 3)" ou "num/den"
  kind: 'num' | 'den' | 'result';
  signs: ('+' | '-')[];
  /** índice do ponto crítico (raiz) associado à linha, ou -1 */
  rootIndex: number;
}

export interface SignChartModel {
  /** pontos críticos ordenados */
  roots: { value: number; isDenominator: boolean }[];
  rows: SignRow[];
}

/**
 * @param negativeConstant true quando a expressão tem uma constante negativa multiplicando
 *   (ex.: 9 − 5x = −5(x − 9/5)), o que inverte todos os sinais do resultado.
 */
export function buildSignChart(numRoots: number[], denRoots: number[], negativeConstant = false): SignChartModel {
  const allRoots = [
    ...numRoots.map((v) => ({ value: v, isDenominator: false })),
    ...denRoots.map((v) => ({ value: v, isDenominator: true })),
  ].sort((a, b) => a.value - b.value);

  const n = allRoots.length;
  const intervals = n + 1;

  // ponto de teste de cada intervalo
  const testPoints: number[] = [];
  for (let i = 0; i < intervals; i++) {
    if (i === 0) testPoints.push(allRoots[0].value - 1);
    else if (i === n) testPoints.push(allRoots[n - 1].value + 1);
    else testPoints.push((allRoots[i - 1].value + allRoots[i].value) / 2);
  }

  const factorSign = (t: number, r: number): '+' | '-' => (t - r > 0 ? '+' : '-');

  const rows: SignRow[] = [];

  numRoots.forEach((r, i) => {
    const rootIndex = allRoots.findIndex((a) => a.value === r && !a.isDenominator);
    rows.push({
      label: `fator ${i + 1} do numerador`,
      kind: 'num',
      signs: testPoints.map((t) => factorSign(t, r)),
      rootIndex,
    });
  });

  denRoots.forEach((r, i) => {
    const rootIndex = allRoots.findIndex((a) => a.value === r && a.isDenominator);
    rows.push({
      label: `fator ${i + 1} do denominador`,
      kind: 'den',
      signs: testPoints.map((t) => factorSign(t, r)),
      rootIndex,
    });
  });

  if (negativeConstant) {
    rows.push({ label: 'constante (−)', kind: 'num', signs: testPoints.map(() => '-' as const), rootIndex: -1 });
  }

  const resultSigns = testPoints.map((t) => {
    let pos = !negativeConstant;
    for (const r of numRoots) if (t - r < 0) pos = !pos;
    for (const r of denRoots) if (t - r < 0) pos = !pos;
    return pos ? ('+' as const) : ('-' as const);
  });

  rows.push({ label: 'expressão', kind: 'result', signs: resultSigns, rootIndex: -1 });

  return { roots: allRoots, rows };
}
