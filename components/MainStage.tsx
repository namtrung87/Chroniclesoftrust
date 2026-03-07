
import React from 'react';
import { ShieldAlert, History, Save, Sparkles } from 'lucide-react';
import { useGame } from '../GameContext';

interface MainStageProps {
  children: React.ReactNode;
}

const MainStage: React.FC<MainStageProps> = ({ children }) => {
  const { isGlitching, glitchMode, showSaveToast, toastMessage, toastType } = useGame();

  const getGlitchStyle = () => {
    if (!isGlitching) return '';
    const base = 'animate-glitch backdrop-blur-sm ';
    if (glitchMode === 'error') return base + 'border-red-500/80 shadow-[0_0_80px_rgba(239,68,68,0.4)] contrast-150 saturate-200';
    if (glitchMode === 'success') return base + 'border-emerald-400/80 shadow-[0_0_80px_rgba(16,185,129,0.4)]';
    return base + 'border-blue-400/80 brightness-110';
  };

  return (
    <main className="flex-1 h-full relative overflow-hidden flex flex-col items-center justify-start p-4 md:p-6 lg:p-8">
      {/* Immersive Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        
        {/* Floating Data Particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-emerald-500/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Save Toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out transform ${showSaveToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'}`}>
        <div className={`glass px-8 py-4 rounded-2xl flex items-center gap-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] border-t border-emerald-500/20`}>
          {toastType === 'load' ? (
            <div className="p-2 bg-blue-500/20 rounded-lg"><History className="w-5 h-5 text-blue-400" /></div>
          ) : (
            <div className="p-2 bg-emerald-500/20 rounded-lg"><Save className="w-5 h-5 text-emerald-400" /></div>
          )}
          <div className="flex flex-col">
            <span className="mono text-[8px] text-slate-500 font-black uppercase tracking-[0.4em]">Archival_Event</span>
            <span className={`mono text-sm ${toastType === 'load' ? 'text-blue-400' : 'text-emerald-400'} font-black tracking-widest uppercase`}>
              {toastMessage}
            </span>
          </div>
        </div>
      </div>

      {/* Content Wrapper - Widened for Panoramic View */}
      <div 
        className={`w-full max-w-[1600px] z-10 transition-all duration-500 transform h-full flex flex-col
          ${isGlitching ? 'scale-[1.01] skew-x-0.5' : 'scale-100'}
          ${getGlitchStyle()}`}
      >
        <div className={`glass relative rounded-[1.5rem] p-4 md:p-6 lg:p-8 shadow-2xl overflow-hidden group border border-slate-800/50 flex-1 flex flex-col
          ${isGlitching && glitchMode === 'error' ? 'bg-red-950/20 border-red-500/40' : ''}
          ${isGlitching && glitchMode === 'success' ? 'bg-emerald-950/20 border-emerald-500/40' : ''}`}>
           
           {/* Futuristic Corner Bezels */}
           <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-emerald-500/20 rounded-tl-[1.5rem] pointer-events-none group-hover:border-emerald-500/50 transition-all duration-500" />
           <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-[1.5rem] pointer-events-none group-hover:border-emerald-500/50 transition-all duration-500" />
           <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-emerald-500/20 rounded-bl-[1.5rem] pointer-events-none group-hover:border-emerald-500/50 transition-all duration-500" />
           <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-emerald-500/20 rounded-br-[1.5rem] pointer-events-none group-hover:border-emerald-500/50 transition-all duration-500" />
           
           {children}
        </div>
      </div>

      {/* Environmental Footer */}
      <div className="mt-4 w-full max-w-[1600px] px-4 flex justify-between items-center opacity-40 select-none no-print pointer-events-none z-10">
        <div className="flex items-center gap-3">
          <Sparkles className="w-3 h-3 text-emerald-500" />
          <span className="mono text-[8px] tracking-[0.4em] text-slate-400 font-black uppercase">Archivist_Engine_v3.1</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="mono text-[8px] tracking-widest text-slate-400 font-bold uppercase">Node: Timeline_Synchronous</span>
          <div className="flex gap-1">
             <div className="w-1 h-3 bg-emerald-500/50 rounded-full" />
             <div className="w-1 h-3 bg-emerald-500/30 rounded-full" />
             <div className="w-1 h-3 bg-emerald-500/10 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainStage;
