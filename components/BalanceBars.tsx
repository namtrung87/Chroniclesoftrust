
import React from 'react';
import { useGame } from '../GameContext';
import { AlertTriangle } from 'lucide-react';

const BalanceBars: React.FC = () => {
  const { balance } = useGame();

  const metrics = [
    { label: 'ECO', value: balance.eco, color: 'bg-emerald-500', shadow: 'shadow-emerald-500/40', glow: 'emerald' },
    { label: 'SOC', value: balance.soc, color: 'bg-blue-500', shadow: 'shadow-blue-500/40', glow: 'blue' },
    { label: 'ENV', value: balance.env, color: 'bg-teal-400', shadow: 'shadow-teal-400/40', glow: 'teal' },
  ];

  return (
    <div className="flex justify-around items-end h-48 w-full gap-4 px-6 py-4 bg-slate-950/60 rounded-2xl border border-slate-800/50 shadow-inner">
      {metrics.map((m) => {
        const isLow = m.value <= 20;
        return (
          <div key={m.label} className="flex flex-col items-center h-full w-full group">
            <div className="relative flex-1 w-5 bg-slate-900/80 rounded-full overflow-hidden flex flex-col justify-end border border-slate-800">
               {isLow && (
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 animate-pulse">
                   <AlertTriangle className="w-3 h-3 text-red-500" />
                 </div>
               )}
               <div 
                 className={`w-full transition-all duration-1000 ease-out ${isLow ? 'bg-red-500 shadow-red-500/50' : m.color} ${m.shadow} shadow-[0_0_15px_rgba(0,0,0,0.5)]`} 
                 style={{ height: `${m.value}%` }} 
               />
               {/* Internal Glow */}
               <div className={`absolute inset-0 opacity-20 pointer-events-none ${isLow ? 'bg-red-500' : m.color}`} />
            </div>
            <span className={`text-[10px] mt-2 mono font-black tracking-tighter ${isLow ? 'text-red-500 animate-pulse' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
              {m.label}
            </span>
            <span className={`text-[10px] mono font-bold ${isLow ? 'text-red-400' : 'text-slate-400'}`}>
              {m.value}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BalanceBars;
