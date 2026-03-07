import React from 'react';
import { Terminal, RefreshCw, Zap, ShieldCheck, Sparkles } from 'lucide-react';

const LevelCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-1000">
      <div className="relative mb-12">
        {/* Layered backgrounds for depth */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] rounded-full scale-150 animate-pulse" />
        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full scale-110 animate-pulse delay-700" />
        
        {/* Animated Ornaments */}
        <div className="absolute -top-6 -right-6 animate-bounce">
          <Sparkles className="w-8 h-8 text-emerald-400 opacity-50" />
        </div>
        <div className="absolute -bottom-4 -left-8 animate-pulse">
          <Zap className="w-6 h-6 text-blue-400 opacity-30" />
        </div>

        <div className="relative z-10 p-10 bg-slate-900 rounded-[3rem] border border-emerald-500/30 shadow-2xl overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
           <Terminal className="w-24 h-24 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
           <div className="mt-4 flex gap-1 justify-center">
             <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
             <div className="w-1 h-1 rounded-full bg-emerald-500/60 animate-ping delay-100" />
             <div className="w-1 h-1 rounded-full bg-emerald-500/30 animate-ping delay-200" />
           </div>
        </div>
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h1 className="mono text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
          Chronicles<br/><span className="text-emerald-500">of Trust</span>
        </h1>
        
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />
        
        <p className="text-slate-400 leading-relaxed text-sm md:text-base font-medium px-4">
          Establish neural link with the <span className="text-slate-100 font-bold">Infinite Balance</span>. 
          Correct the temporal anomalies that threaten human integrity.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 px-8 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 mono text-[10px] font-black uppercase tracking-[0.2em] shadow-xl group hover:bg-emerald-500/20 transition-all">
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          Synchronizing_Timeline_Relay
        </div>
        <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span className="mono text-[8px] font-bold uppercase tracking-widest text-slate-500">Integrity_Verified</span>
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LevelCard;