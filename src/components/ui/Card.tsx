import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-slate-800 bg-slate-900/60 p-5', className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn('text-lg font-semibold text-slate-100', className)}>{children}</h2>;
}
