
import React from 'react';
import { User, Activity, Clock, Box, RotateCcw, ShieldCheck, History, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { useGame } from '../GameContext';
import { SCENARIOS } from '../constants';
import BalanceBars from './BalanceBars';
import ShardRepository from './ShardRepository';

const Sidebar: React.FC<{ onShowTutorial?: () => void }> = ({ onShowTutorial }) => {
  const { currentLevel, resetGame, collectedShards, history } = useGame();
  const scenario = SCENARIOS[currentLevel] || SCENARIOS[0];

  const handleReset = () => {
    if (confirm("ARCHIVIST: This will collapse the current timeline and erase all recovered Shards. Are you certain?")) {
      resetGame();
      window.location.reload();
    }
  };

  const getDecisionLog = (decision: { levelId: number, choiceId: string }) => {
    const sc = SCENARIOS.find(s => s.id === decision.levelId);
    if (!sc) return null;
    const choice = sc.choices.find(c => c.id === decision.choiceId);
    if (!choice) return null;
    return { title: sc.title, year: sc.year, choiceLabel: choice.label, type: choice.type };
  };

  return (
    <aside className="w-80 h-full flex flex-col bg-slate-950/80 border-r border-slate-800/50 backdrop-blur-xl p-8 select-none overflow-y-auto no-print">
      {/* Header */}
      <div className="mb-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur group-hover:bg-emerald-500/40 transition-all duration-500" />
            <div className="relative w-12 h-12 rounded-full bg-slate-900 border border-emerald-500/30 flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="mono text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Archivist</h2>
            <p className="text-[9px] text-slate-500 mono font-bold">CF-2025-001</p>
          </div>
        </div>
        <button onClick={onShowTutorial} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-10 flex-1">
        {/* Timeline Widget */}
        <section>
          <div className="flex items-center gap-3 mb-4 text-slate-500 mono text-[9px] font-black uppercase tracking-[0.3em]">
            <Clock className="w-4 h-4" /> Current_Era
          </div>
          <div className="glass p-5 rounded-2xl border border-emerald-500/20 relative overflow-hidden group shadow-lg">
            <div className="text-3xl mono font-black text-white tracking-tighter group-hover:text-emerald-400 transition-colors">{scenario.year}</div>
            <div className="text-[9px] text-emerald-500/50 mono mt-1 font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              OS_SYNC: NOMINAL
            </div>
          </div>
        </section>

        {/* Balance Widget */}
        <section>
          <div className="flex items-center gap-3 mb-4 text-slate-500 mono text-[9px] font-black uppercase tracking-[0.3em]">
            <Activity className="w-4 h-4" /> Infinite_Balance
          </div>
          <BalanceBars />
        </section>

        {/* Shard Widget */}
        <section>
          <div className="flex items-center gap-3 mb-4 text-slate-500 mono text-[9px] font-black uppercase tracking-[0.3em]">
            <Box className="w-4 h-4" /> Shard_Vault
          </div>
          <ShardRepository />
          <p className="mt-3 text-[8px] mono text-slate-600 text-center font-black uppercase tracking-widest">{collectedShards.length} / 6 SHARDS SECURED</p>
        </section>

        {/* Log Widget */}
        <section className="min-h-0 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-slate-500 mono text-[9px] font-black uppercase tracking-[0.3em]">
            <History className="w-4 h-4" /> Archival_Logs
          </div>
          <div className="space-y-3 overflow-y-auto max-h-56 pr-3 custom-scrollbar">
            {history.length === 0 ? (
              <div className="text-[10px] mono text-slate-700 italic border border-slate-900 p-4 rounded-xl text-center">Awaiting archival input...</div>
            ) : (
              history.slice().reverse().map((decision, idx) => {
                const log = getDecisionLog(decision);
                if (!log) return null;
                return (
                  <div key={idx} className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] mono text-slate-500 font-black uppercase tracking-widest">{log.year}</span>
                      {log.type === 'correct' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : 
                       log.type === 'wrong' ? <AlertCircle className="w-3 h-3 text-red-500" /> : 
                       <HelpCircle className="w-3 h-3 text-amber-500" />}
                    </div>
                    <div className="text-[10px] text-slate-300 mono leading-snug font-medium line-clamp-2" title={log.choiceLabel}>{log.choiceLabel}</div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Footer / Reset */}
      <div className="mt-auto pt-8 border-t border-slate-900">
        <button onClick={handleReset} className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 text-red-500/40 hover:text-red-500 border border-red-500/10 hover:border-red-500/30 transition-all active:scale-95 group">
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
          <span className="mono text-[10px] uppercase font-black tracking-[0.2em]">Reset_Simulation</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
