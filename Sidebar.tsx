
import React from 'react';
import { User, Activity, Clock, Box, RotateCcw, History, CheckCircle2, AlertCircle, HelpCircle, BookOpen, X, Map } from 'lucide-react';
import { useGame } from './GameContext';
import { SCENARIOS, LEVEL_ICONS } from './constants';
import BalanceBars from './components/BalanceBars';
import ShardRepository from './components/ShardRepository';

interface SidebarProps {
  onClose?: () => void;
  onShowTutorial?: () => void;
  onShowHelpBook?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, onShowTutorial, onShowHelpBook }) => {
  const { currentLevel, setCurrentLevel, resetGame, collectedShards, history } = useGame();
  const scenario = SCENARIOS[currentLevel] || SCENARIOS[0];

  const handleReset = () => {
    if (confirm("REBOOT PROTOCOL: This will collapse the current timeline. Are you sure?")) {
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
    <aside className="w-full h-full flex flex-col bg-slate-900/95 md:bg-slate-900/50 border-r border-slate-800/50 backdrop-blur-xl p-6 select-none overflow-y-auto relative no-print custom-scrollbar">
      {/* Mobile Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="mb-10 mt-6 md:mt-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <User className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="mono text-[10px] font-black text-emerald-500 uppercase tracking-widest">ARCHIVIST_UNIT</h2>
            <p className="text-[9px] text-slate-500 mono font-bold">ALPHA-2025</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div className="flex flex-col gap-2">
          <button
            onClick={onShowTutorial}
            className="w-full flex items-center gap-3 p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-[10px] mono font-bold uppercase tracking-widest"
          >
            <HelpCircle className="w-4 h-4" /> Operations_Guide
          </button>

          <button
            onClick={onShowHelpBook}
            className="w-full flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all text-[10px] mono font-bold uppercase tracking-widest"
          >
            <BookOpen className="w-4 h-4" /> Archivist_Archive
          </button>
        </div>

        {/* Timeline Map - Fully Unlocked */}
        <section className="pt-2">
          <div className="flex items-center gap-2 mb-3 text-slate-500">
            <Map className="w-3.5 h-3.5" />
            <h3 className="mono text-[9px] uppercase font-bold tracking-widest">Timeline_Navigator</h3>
          </div>
          <div className="grid grid-cols-6 gap-1 bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
            {SCENARIOS.map((s, idx) => {
              const isResolved = history.some(h => h.levelId === s.id);
              const iconNode = LEVEL_ICONS[s.icon];
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentLevel(idx)}
                  className={`h-10 rounded-lg flex items-center justify-center transition-all mono text-[10px] font-black relative overflow-hidden group/item
                    ${currentLevel === idx ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-900/60 text-slate-600 border border-slate-800 hover:border-slate-700'}`}
                  title={`${s.title} (${s.year})`}
                >
                  <div className={`transition-transform duration-500 ${currentLevel === idx ? 'scale-110' : 'scale-75 opacity-50'}`}>
                    {iconNode}
                  </div>
                  {isResolved && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,1)]" />}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[8px] mono text-slate-600 uppercase font-bold tracking-widest text-center">Temporal access granted to all nodes</p>
        </section>

        {/* Status */}
        <section>
          <div className="flex items-center gap-2 mb-3 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <h3 className="mono text-[9px] uppercase font-bold tracking-widest">Current_Node</h3>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/50">
            <div className="text-2xl mono font-black text-slate-100 tracking-tighter">
              {currentLevel >= 6 ? '2150 CE' : scenario.year}
            </div>
            <div className="text-[8px] text-emerald-500/60 mono mt-1 flex items-center gap-1 font-bold">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
              {currentLevel >= 6 ? 'MISSION_ACCOMPLISHED' : 'OS_SYNC: NOMINAL'}
            </div>
          </div>
        </section>

        {/* Balance */}
        <section>
          <div className="flex items-center gap-2 mb-3 text-slate-500">
            <Activity className="w-3.5 h-3.5" />
            <h3 className="mono text-[9px] uppercase font-bold tracking-widest">Equilibrium</h3>
          </div>
          <BalanceBars />
        </section>

        {/* Repository */}
        <section>
          <div className="flex items-center gap-2 mb-3 text-slate-500">
            <Box className="w-3.5 h-3.5" />
            <h3 className="mono text-[9px] uppercase font-bold tracking-widest">Shard_Vault</h3>
          </div>
          <ShardRepository />
          <div className="mt-2 text-[8px] mono text-slate-600 text-center font-bold uppercase tracking-widest">
            {collectedShards.length} / 6 SECURED
          </div>
        </section>

        {/* Logs */}
        <section className="min-h-0 flex flex-col pt-2">
          <div className="flex items-center gap-2 mb-3 text-slate-500">
            <History className="w-3.5 h-3.5" />
            <h3 className="mono text-[9px] uppercase font-bold tracking-widest">Archival_Log</h3>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-48 pr-2 custom-scrollbar">
            {history.length === 0 ? (
              <div className="text-[9px] mono text-slate-700 italic p-3">Awaiting logs...</div>
            ) : (
              // Group by levelId to show history of attempts
              [...new Set(history.map(h => h.levelId))].reverse().map(levelId => {
                const nodeHistory = history.filter(h => h.levelId === levelId);
                const scenario = SCENARIOS.find(s => s.id === levelId);
                if (!scenario) return null;

                return (
                  <div key={levelId} className="space-y-1">
                    <div className="text-[7px] mono text-slate-600 font-bold ml-1 uppercase">{scenario.year}</div>
                    {nodeHistory.slice().reverse().map((decision, idx) => {
                      const log = getDecisionLog(decision);
                      if (!log) return null;
                      return (
                        <div key={idx} className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/30 flex flex-col gap-1 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="text-[9px] text-slate-400 mono leading-tight truncate max-w-[80%]">{log.choiceLabel}</div>
                            {log.type === 'correct' ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> : <AlertCircle className="w-2.5 h-2.5 text-red-500" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-800/30">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/30 hover:bg-red-500/10 text-slate-600 hover:text-red-400 border border-slate-700/30 transition-all group"
        >
          <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />
          <span className="mono text-[9px] uppercase font-black tracking-widest">Reset_Sim</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
