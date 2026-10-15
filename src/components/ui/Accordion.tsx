import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-slate-200 hover:bg-slate-800/40"
      >
        {title}
        <ChevronDown size={16} className={cn('shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="border-t border-slate-800 px-4 py-3">{children}</div>}
    </div>
  );
}
