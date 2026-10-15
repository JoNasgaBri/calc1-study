import { useEffect, useRef } from 'react';
import katex from 'katex';
import { cn } from '../../lib/cn';

interface TeXProps {
  children: string;
  block?: boolean;
  className?: string;
}

export function TeX({ children, block = false, className }: TeXProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(children, ref.current, {
        displayMode: block,
        throwOnError: false,
        strict: false,
        trust: true,
        macros: { '\\sen': '\\operatorname{sen}', '\\tg': '\\operatorname{tg}' },
      });
    } catch {
      ref.current.textContent = children;
    }
  }, [children, block]);

  return <span ref={ref} className={cn(block && 'block overflow-x-auto py-1', className)} />;
}
