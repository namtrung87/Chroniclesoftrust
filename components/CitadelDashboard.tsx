
import React, { useState, useEffect } from 'react';
import { ShieldAlert, ArrowRight, TrendingUp, DollarSign, Users, Database, Search, CheckCircle, Loader2, ShieldCheck, AlertCircle, Terminal, Info } from 'lucide-react';
import { useGame } from '../GameContext';
import { playEthicalSound } from '../audioUtils';

const CitadelDashboard: React.FC = () => {
  const { setCurrentLevel, addShard, updateBalance } = useGame();
  const [foundAlerts, setFoundAlerts] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to simulate scanning large datasets
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const fraudTriangle = [
    { id: 'pressure', label: 'Pressure', description: 'CEO Personal Debt Discovered. Executive bonus structures tied to impossible quarterly targets.', icon: <DollarSign className="w-6 h-6" /> },
    { id: 'opportunity', label: 'Opportunity', description: 'Internal controls disabled. The audit logs have been periodically "auto-deleted" by a back-door script.', icon: <Database className="w-6 h-6" /> },
    { id: 'rationalization', label: 'Rationalization', description: '"I’m just borrowing it. The company owes me after I saved it last year." Mindset identified.', icon: <Users className="w-6 h-6" /> }
  ];

  const handleAlertClick = (id: string) => {
    if (!foundAlerts.includes(id)) {
      setFoundAlerts([...foundAlerts, id]);
      playEthicalSound('success');
    }
    setShowPopup(id);
  };

  const isComplete = foundAlerts.length === 3;

  const handleNext = () => {
    playEthicalSound('transition');
    addShard("The Shield of the Whistleblower");
    updateBalance({ soc: 15, eco: 10 });
    setCurrentLevel(5);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
          <Loader2 className="w-16 h-16 text-emerald-500 animate-spin relative z-10" />
        </div>
        <div className="space-y-3 text-center">
          <h2 className="mono text-xl font-bold text-white uppercase tracking-[0.3em]">Forensic_Audit_Init</h2>
          <div className="flex gap-2 justify-center">
             <div className="h-1 w-8 bg-emerald-500 animate-bounce" />
             <div className="h-1 w-8 bg-emerald-500 animate-bounce delay-100" />
             <div className="h-1 w-8 bg-emerald-500 animate-bounce delay-200" />
          </div>
          <p className="mono text-[10px] text-slate-500 uppercase tracking-widest mt-4">Scanning_Ledgers_For_Anomalies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative animate-in fade-in duration-700 space-y-8 h-full flex flex-col pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="mono text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Search className="w-6 h-6 text-emerald-500" /> CITADEL_CORE_ANALYTICS
          </h2>
          <p className="mono text-[10px] text-emerald-500/60 uppercase font-bold tracking-widest">Protocol: FORENSIC_AUDIT_3.0</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-slate-950 px-6 py-3 rounded-xl border border-slate-800 mono text-[10px] flex items-center justify-between gap-4">
            <span className="text-slate-500 uppercase tracking-widest">AUDIT_PROGRESS:</span> 
            <span className={`font-black text-sm ${isComplete ? "text-emerald-500" : "text-amber-500"}`}>{foundAlerts.length}/3</span>
          </div>
        </div>
      </div>

      {/* Persistent Task Directive */}
      {!isComplete && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl flex gap-6 items-center shadow-xl shadow-amber-500/5 animate-pulse">
           <div className="p-3 bg-amber-500/20 rounded-2xl">
              <AlertCircle className="w-6 h-6 text-amber-500" />
           </div>
           <div>
              <h4 className="mono text-xs font-black text-amber-500 uppercase tracking-widest mb-1">Current_Objective: Detect_Corrupt_Pillars</h4>
              <p className="text-sm text-slate-300 font-medium">The 'Fraud Triangle' is hidden within these widgets. Find and click the flashing <ShieldAlert className="inline w-4 h-4 mx-1" /> icons to extract the evidence.</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
        <div className={`p-10 rounded-[2.5rem] border transition-all duration-700 relative group overflow-hidden glass-vibrant ${foundAlerts.includes('pressure') ? 'border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.15)]' : 'border-white/5 hover:border-emerald-500/30'}`}>
          <div className="text-[10px] mono text-emerald-500/60 mb-2 uppercase tracking-[0.4em] font-black group-hover:text-emerald-400 transition-colors">Market Confidence Index</div>
          <div className="text-5xl mono font-black text-white group-hover:scale-105 transition-transform duration-500 origin-left">92.4%</div>
          <TrendingUp className="absolute bottom-6 right-6 w-32 h-32 text-emerald-500/5 group-hover:text-emerald-500/10 transition-all duration-1000 rotate-12" />
          {!foundAlerts.includes('pressure') && (
            <button 
              onClick={() => handleAlertClick('pressure')}
              className="absolute top-8 right-8 p-4 bg-amber-500/20 rounded-2xl hover:bg-amber-500/40 transition-all cursor-pointer animate-bounce border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.4)] group/btn"
              title="Anomaly Detected: Click to Scan"
            >
              <ShieldAlert className="w-10 h-10 text-amber-500 group-hover/btn:scale-110 transition-transform" />
            </button>
          )}
          {foundAlerts.includes('pressure') && <div className="absolute top-8 right-8 mono text-[11px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 bg-emerald-500/10 px-5 py-3 rounded-2xl border border-emerald-500/30 animate-in zoom-in-90"><CheckCircle className="w-5 h-5"/> PRESSURE_VERIFIED</div>}
        </div>
        
        <div className={`p-10 rounded-[2.5rem] border transition-all duration-700 relative group overflow-hidden glass-vibrant ${foundAlerts.includes('opportunity') ? 'border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.15)]' : 'border-white/5 hover:border-blue-500/30'}`}>
          <div className="text-[10px] mono text-blue-500/60 mb-2 uppercase tracking-[0.4em] font-black group-hover:text-blue-400 transition-colors">System Log Integrity</div>
          <div className="text-5xl mono font-black text-white group-hover:scale-105 transition-transform duration-500 origin-left uppercase">Nominal</div>
          <ShieldCheck className="absolute bottom-6 right-6 w-32 h-32 text-blue-500/5 group-hover:text-blue-500/10 transition-all duration-1000 -rotate-12" />
          {!foundAlerts.includes('opportunity') && (
            <button 
              onClick={() => handleAlertClick('opportunity')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-amber-500/20 rounded-2xl hover:bg-amber-500/40 transition-all cursor-pointer animate-pulse border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.4)] group/btn"
              title="Anomaly Detected: Click to Scan"
            >
              <ShieldAlert className="w-10 h-10 text-amber-500 group-hover/btn:scale-110 transition-transform" />
            </button>
          )}
          {foundAlerts.includes('opportunity') && <div className="absolute top-8 right-8 mono text-[11px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 bg-blue-500/10 px-5 py-3 rounded-2xl border border-blue-500/30 animate-in zoom-in-90"><CheckCircle className="w-5 h-5"/> OPPORTUNITY_VERIFIED</div>}
        </div>

        <div className={`p-10 rounded-[2.5rem] border transition-all duration-700 relative group overflow-hidden glass-vibrant ${foundAlerts.includes('rationalization') ? 'border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.15)]' : 'border-white/5 hover:border-purple-500/30'}`}>
          <div className="text-[10px] mono text-purple-500/60 mb-2 uppercase tracking-[0.4em] font-black group-hover:text-purple-400 transition-colors">Employee Trust Index</div>
          <div className="text-5xl mono font-black text-white group-hover:scale-105 transition-transform duration-500 origin-left uppercase">Stable</div>
          <Users className="absolute bottom-6 right-6 w-32 h-32 text-purple-500/5 group-hover:text-purple-500/10 transition-all duration-1000 rotate-6" />
          {!foundAlerts.includes('rationalization') && (
            <button 
              onClick={() => handleAlertClick('rationalization')}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 p-4 bg-amber-500/20 rounded-2xl hover:bg-amber-500/40 transition-all cursor-pointer animate-bounce border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.4)] group/btn"
              title="Anomaly Detected: Click to Scan"
            >
              <ShieldAlert className="w-10 h-10 text-amber-500 group-hover/btn:scale-110 transition-transform" />
            </button>
          )}
          {foundAlerts.includes('rationalization') && <div className="absolute top-8 right-8 mono text-[11px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-2 bg-purple-500/10 px-5 py-3 rounded-2xl border border-purple-500/30 animate-in zoom-in-90"><CheckCircle className="w-5 h-5"/> RATIONALIZATION_VERIFIED</div>}
        </div>
      </div>

      <div className="rounded-[4rem] border border-white/5 p-16 h-80 flex flex-col items-center justify-center relative overflow-hidden glass-vibrant">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <svg width="100%" height="100%" viewBox="0 0 400 100" className="opacity-20 relative z-10">
          <path d="M0,80 L40,75 L80,85 L120,40 L160,50 L200,10 L240,20 L280,45 L320,35 L360,55 L400,30" fill="none" stroke="#10b981" strokeWidth="2" />
          <path d="M0,90 L50,88 L100,92 L150,85 L200,89 L250,84 L300,88 L350,82 L400,85" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
        </svg>
        <div className="flex items-center gap-2 mono text-[10px] text-slate-600 uppercase tracking-[0.5em] mt-8 font-black relative z-10">
          <Terminal className="w-4 h-4" /> Archivist_Forensic_Link_Active
        </div>
      </div>

      {showPopup && (
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center p-12 text-center z-[110] animate-in fade-in duration-300">
          <div className="max-w-md space-y-8">
            <div className="w-28 h-28 bg-amber-500/20 border border-amber-500/40 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/20 animate-in zoom-in-95">
              {fraudTriangle.find(t => t.id === showPopup)?.icon}
            </div>
            <div className="space-y-4">
              <h3 className="mono text-4xl font-black text-amber-500 uppercase tracking-tight">System anomaly: {fraudTriangle.find(t => t.id === showPopup)?.label}</h3>
              <p className="text-slate-300 text-xl leading-relaxed font-medium italic">"{fraudTriangle.find(t => t.id === showPopup)?.description}"</p>
            </div>
            <button 
              onClick={() => setShowPopup(null)}
              className="px-16 py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl text-xs mono font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-emerald-500/30 flex items-center gap-3 mx-auto"
            >
              Continue_Scanning <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {isComplete && !showPopup && (
        <div className="mt-12 flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center gap-4 text-emerald-400 mono text-sm font-black mb-10 bg-emerald-500/10 px-10 py-5 rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
            <CheckCircle className="w-7 h-7" /> TIMELINE_STABILIZED: SYSTEMIC_FRAUD_DECODED
          </div>
          <button 
            onClick={handleNext}
            className="w-full max-w-sm bg-emerald-500 hover:bg-emerald-600 text-slate-950 py-7 rounded-[2rem] font-black mono text-base uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-2xl shadow-emerald-500/40 transition-all hover:scale-[1.05] active:scale-95 group"
          >
            EXTRACT_ETHICAL_SHARD <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CitadelDashboard;
