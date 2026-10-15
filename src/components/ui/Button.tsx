import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger' | 'hint';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
  secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
  ghost: 'hover:bg-slate-800 text-slate-300',
  success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
  danger: 'bg-rose-600 hover:bg-rose-500 text-white',
  hint: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30',
};

export function Button({ variant = 'primary', className, children, ...rest }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40',
        styles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
