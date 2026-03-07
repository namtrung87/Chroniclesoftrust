import React, { useState } from 'react';
import { X, Book, Info, ShieldCheck, Scale, History, ChevronRight, ChevronLeft, Zap, Sparkles, Lightbulb, Globe, Target, Compass } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [page, setPage] = useState(0);

  const content = [
    {
      title: "The Archivist's Duty",
      icon: <History className="w-8 h-8 text-emerald-500" />,
      text: "You are the Ethical Archivist, tasked with repairing the Time Rift. Across six levels, you will learn that ethics isn't static—it's a technology that must evolve as human power grows.",
      highlight: "Law is the Floor, Ethics is the Ceiling."
    },
    {
      title: "Evolution of Scope",
      icon: <Target className="w-8 h-8 text-cyan-500" />,
      text: "Your 'Circle of Concern' expands as you travel: Level 0 (Bio/Me) -> Level 1 (Self/Character) -> Level 2 (Trade/Strangers) -> Level 4 (Institutions) -> Level 5 (The Planet).",
      highlight: "From 'ME' to 'THE WORLD'."
    },
    {
      title: "Evolution of Trust",
      icon: <Compass className="w-8 h-8 text-blue-500" />,
      text: "Trust changes definitions over time. In Prehistory, it was Insurance (Reciprocity). In Greece, it was Predictability (Integrity). In the Enlightenment, it was Contractual (Justice). Today, it is Stewardship.",
      highlight: "TRUST IS HUMANITY'S MOST COMPLEX TECHNOLOGY."
    },
    {
      title: "The Tri-Modal Balance",
      icon: <Scale className="w-8 h-8 text-amber-500" />,
      text: "Society rests on ECO (Prosperity), SOC (Cohesion), and ENV (Stability). Keeping these in equilibrium is the mark of a Supreme Steward. If any metric collapses to zero, the timeline fails.",
      highlight: "STABILITY THROUGH EQUILIBRIUM."
    },
    {
      title: "The Legal vs. Ethical Gap",
      icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
      text: "As history advances, laws often lag behind reality. Antagonists will argue 'It’s not illegal.' Your mission is to prove that legality is just the minimum requirement—not the standard.",
      highlight: "INTEGRITY IS WHAT YOU DO WHEN NO ONE IS WATCHING."
    },
    {
      title: "Archival Intelligence",
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      text: "Consult the 'Oracle' (AI) for deep historical synthesis and era visualizations. Your decisions today determine the 2150 CE horizon.",
      highlight: "WISDOM IS THE ULTIMATE SHARD."
    }
  ];

  const current = content[page];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-slate-900/90 border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Book className="w-5 h-5 text-emerald-500" />
            <h2 className="mono text-xs font-bold uppercase tracking-[0.3em] text-slate-300">Handbook_Level_{page}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-all hover:scale-110 active:scale-90 text-slate-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 md:p-12 flex-1">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-inner group transition-transform hover:scale-110">
              {current.icon}
            </div>
            <h3 className="mono text-2xl font-bold text-slate-100 tracking-tight">{current.title}</h3>
            <p className="text-slate-400 leading-relaxed text-lg">{current.text}</p>
            <div className="bg-emerald-500/5 border border-emerald-500/20 px-4 py-3 rounded-lg flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="mono text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">{current.highlight}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex justify-between items-center">
          <div className="flex gap-1">
            {content.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === page ? 'bg-emerald-500 w-4' : 'bg-slate-700'}`} />
            ))}
          </div>
          <div className="flex gap-4">
            {page > 0 && (
              <button onClick={() => setPage(p => p - 1)} className="flex items-center gap-2 mono text-[10px] font-bold text-slate-500 hover:text-white transition-all hover:translate-x-[-2px] active:scale-90"><ChevronLeft className="w-4 h-4" /> PREVIOUS</button>
            )}
            {page < content.length - 1 ? (
              <button onClick={() => setPage(p => p + 1)} className="flex items-center gap-2 bg-emerald-500 px-6 py-2 rounded-full text-slate-950 mono text-[10px] font-bold hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-lg">NEXT <ChevronRight className="w-4 h-4" /></button>
            ) : (
              <button onClick={onClose} className="flex items-center gap-2 bg-emerald-500 px-6 py-2 rounded-full text-slate-950 mono text-[10px] font-bold hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-lg">ENTER_TIMELINE</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;