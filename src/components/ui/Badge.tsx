import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

const colors = {
  indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  slate: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
};

export function Badge({
  children,
  color = 'slate',
  className,
}: {
  children: ReactNode;
  color?: keyof typeof colors;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        colors[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
