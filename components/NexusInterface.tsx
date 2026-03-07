
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Activity, Zap, ShieldCheck, HelpCircle, Lock, Loader2, Sparkles, Info, Scale } from 'lucide-react';
import { useGame } from '../GameContext';

const NexusInterface: React.FC = () => {
  const { setCurrentLevel, addShard, updateBalance } = useGame();
  const [phase, setPhase] = useState<'tuner' | 'pillars'>('tuner');
  const [weights, setWeights] = useState({ eco: 10, soc: 80, env: 10 });
  const [mappings, setMappings] = useState<Record<string, string>>({
    p1: "", p2: "", p3: "", p4: "", p5: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const problems = [
    { id: "p1", text: "AI denies housing loans based on historical bias.", correct: "Fairness" },
    { id: "p2", text: "Social platform tracks movement without user consent.", correct: "Privacy" },
    { id: "p3", text: "Algorithm cannot explain why it flagged a medical diagnosis.", correct: "Transparency" },
    { id: "p4", text: "Training data used without compensating creators.", correct: "Ownership" },
    { id: "p5", text: "Autonomous vehicle has no legal protocol for accidents.", correct: "Accountability" }
  ];

  const pillars = ["Fairness", "Privacy", "Transparency", "Ownership", "Accountability"];

  const isBalanced = useMemo(() => {
    return weights.eco >= 30 && weights.eco <= 40 &&
           weights.soc >= 30 && weights.soc <= 40 &&
           weights.env >= 30 && weights.env <= 40;
  }, [weights]);

  const allMappingsCorrect = useMemo(() => {
    return problems.every(p => mappings[p.id] === p.correct);
  }, [mappings]);

  const handleSliderChange = (key: keyof typeof weights, val: number) => {
    setWeights(prev => ({ ...prev, [key]: val }));
  };

  const handleMappingChange = (id: string, val: string) => {
    setMappings(prev => ({ ...prev, [id]: val }));
  };

  const finishGame = () => {
    addShard("The Apex of Stewardship");
    updateBalance({ soc: 30, eco: 20, env: 20 });
    setCurrentLevel(6);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-12 animate-in fade-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-blue-500/30 flex items-center justify-center relative z-10 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent" />
             <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
          </div>
        </div>
        <div className="space-y-6 text-center max-w-sm">
          <div className="mono text-[10px] text-blue-500/60 uppercase tracking-[0.6em] font-black">Planetary_Sync_Initiated</div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Harmonizing Nexus</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Negotiating ethical parameters with the Sentience Harmony Protocol...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h2 className="mono text-2xl font-black text-slate-100 uppercase tracking-tighter">NEXUS_SYNCHRONIZER</h2>
          <div className="flex gap-2 mt-2">
            <div className={`h-1 w-16 rounded-full transition-all duration-700 ${phase === 'tuner' ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-emerald-900'}`} />
            <div className={`h-1 w-16 rounded-full transition-all duration-700 ${phase === 'pillars' ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-slate-800'}`} />
          </div>
        </div>
        <div className={`px-6 py-2 rounded-2xl border mono text-[10px] flex items-center gap-3 transition-all duration-700 font-black tracking-widest ${isBalanced ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-2xl shadow-emerald-500/10' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
           <Activity className={`w-4 h-4 ${isBalanced ? 'animate-pulse' : ''}`} />
           SYSTEM: {isBalanced ? 'STABLE_EQUILIBRIUM' : 'OSCILLATING_DANGER'}
        </div>
      </div>

      {/* Instructional Briefing Panel */}
      <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-3xl flex gap-6 items-start shadow-xl">
         <div className="p-3 bg-blue-500/20 rounded-2xl shrink-0">
            <Info className="w-6 h-6 text-blue-400" />
         </div>
         <div>
            <h4 className="mono text-xs font-black text-blue-400 uppercase tracking-widest mb-1">
              {phase === 'tuner' ? 'Phase 1: Infinite Balance Calibration' : 'Phase 2: Ethical Logic Mapping'}
            </h4>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              {phase === 'tuner' 
                ? "Humanity's future depends on a fragile triad. If Economy dominates, we face dystopia. If Society dominates without growth, we stagnate. If Environment fails, we perish. Tune the sliders to achieve a 33/33/33 harmonic state."
                : "The machine world lacks context. You must map specific digital injustices to the five Ethical Pillars of the Future. Correct all five mappings to hardcode a soul into the global system."
              }
            </p>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      {phase === 'tuner' ? (
        <div className="bg-slate-950/40 p-10 rounded-[2.5rem] border border-slate-800/50 space-y-12 animate-in slide-in-from-left-8 duration-700 shadow-2xl mt-4">
          <div className="space-y-6">
            <div className="flex justify-between text-[11px] mono text-emerald-500 font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Economic Prosperity</span>
              <span>{weights.eco}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={weights.eco} 
              onChange={(e) => handleSliderChange('eco', parseInt(e.target.value))}
              className="w-full h-3 bg-slate-900 rounded-full appearance-none cursor-pointer accent-emerald-500 transition-all hover:bg-slate-800"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between text-[11px] mono text-blue-500 font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><Activity className="w-3.5 h-3.5" /> Social Cohesion</span>
              <span>{weights.soc}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={weights.soc} 
              onChange={(e) => handleSliderChange('soc', parseInt(e.target.value))}
              className="w-full h-3 bg-slate-900 rounded-full appearance-none cursor-pointer accent-blue-500 transition-all hover:bg-slate-800"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between text-[11px] mono text-teal-500 font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> Biosphere Integrity</span>
              <span>{weights.env}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={weights.env} 
              onChange={(e) => handleSliderChange('env', parseInt(e.target.value))}
              className="w-full h-3 bg-slate-900 rounded-full appearance-none cursor-pointer accent-teal-400 transition-all hover:bg-slate-800"
            />
          </div>

          <button 
            disabled={!isBalanced}
            onClick={() => setPhase('pillars')}
            className={`w-full py-6 rounded-3xl font-black mono text-sm uppercase tracking-[0.4em] transition-all hover:scale-[1.01] active:scale-[0.98] mt-8
              ${isBalanced ? 'bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-500/20' : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'}`}
          >
            {isBalanced ? 'Commence_Ethics_Mapping' : 'Achieve_Balance_to_Proceed'} <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-700 mt-4">
           <div className="grid grid-cols-1 gap-4">
             {problems.map(prob => (
               <div key={prob.id} className="bg-slate-900/40 p-6 border border-slate-800/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:bg-slate-900/60 hover:border-emerald-500/30 group">
                 <div className="flex items-start gap-4">
                   <div className="p-2 bg-slate-950 rounded-lg group-hover:text-emerald-400 transition-colors">
                      <HelpCircle className="w-5 h-5" />
                   </div>
                   <span className="text-base text-slate-200 font-medium">{prob.text}</span>
                 </div>
                 <select 
                   value={mappings[prob.id]} 
                   onChange={(e) => handleMappingChange(prob.id, e.target.value)}
                   className="bg-slate-950 border-2 border-slate-800 text-slate-300 text-xs rounded-xl px-4 py-3 mono focus:border-emerald-500 outline-none transition-all cursor-pointer hover:bg-slate-900"
                 >
                   <option value="">-- RESOLUTION PILLAR --</option>
                   {pillars.map(p => <option key={p} value={p}>{p}</option>)}
                 </select>
               </div>
             ))}
           </div>

           <button 
              disabled={!allMappingsCorrect}
              onClick={finishGame}
              className={`w-full py-8 rounded-[2rem] font-black flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl mt-8 mb-12
                ${allMappingsCorrect 
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/40' 
                  : 'bg-slate-900/50 text-slate-600 border border-slate-800'}`}
           >
             <span className="flex items-center gap-3 text-2xl uppercase tracking-tighter">
               {allMappingsCorrect ? <Zap className="w-8 h-8 animate-bounce" /> : <Lock className="w-7 h-7" />}
               FINALIZE_CHRONICLES
             </span>
             <span className="mono text-[10px] uppercase font-black tracking-[0.6em] opacity-40">Protocol: Ascension_Sequence_01</span>
           </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default NexusInterface;
