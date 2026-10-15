import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Activity, FunctionSquare, Home, Infinity as InfinityIcon, Landmark, Layers, Menu, Sigma, Timer, TrendingUp, X } from 'lucide-react';
import { modules } from '../../data/modules';
import { cn } from '../../lib/cn';

const ICONS: Record<string, typeof Home> = {
  Sigma, FunctionSquare, TrendingUp, Activity, Infinity: InfinityIcon, Landmark,
};

const NAV = [
  { to: '/', label: 'Início', icon: Home, end: true },
  ...modules.map((m) => ({ to: `/modulo/${m.id}`, label: `${m.id}. ${m.title}`, icon: ICONS[m.icon] ?? Home, end: false })),
  { to: '/flashcards', label: 'Flashcards', icon: Layers, end: false },
  { to: '/simulado', label: 'Simulado FAMAT', icon: Timer, end: false },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive ? 'bg-indigo-500/15 text-indigo-300' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200',
            )
          }
        >
          <item.icon size={16} className="shrink-0" />
          <span className="truncate">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-full">
      {/* sidebar desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950/80 p-4 lg:block">
        <p className="mb-4 px-2 text-sm font-bold tracking-wide text-slate-100">
          Calc<span className="text-indigo-400">1</span> Study
        </p>
        <NavItems />
      </aside>

      {/* header mobile */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-800 bg-zinc-950/90 px-4 py-3 backdrop-blur lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="text-slate-300">
            <Menu size={22} />
          </button>
          <p className="text-sm font-bold text-slate-100">
            Calc<span className="text-indigo-400">1</span> Study
          </p>
        </header>

        {/* drawer mobile */}
        {mobileOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-slate-800 bg-slate-950 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-100">Menu</p>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400">
                  <X size={20} />
                </button>
              </div>
              <NavItems onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
