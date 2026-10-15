import { cn } from '../../lib/cn';

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-800', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
