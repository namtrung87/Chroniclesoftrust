
import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, ArrowRight, Award, Loader2, Sparkles, Image as ImageIcon, Target, Cpu, Terminal, RefreshCw, Lightbulb, Compass, ShieldCheck, Scale, Zap, Info, Box, User, Clock, ChevronRight, RotateCcw, BookOpen, GraduationCap } from 'lucide-react';
import { useGame } from '../GameContext';
import { SCENARIOS, LEVEL_ICONS, CHARACTER_PORTRAITS, UI_RESULT_ASSETS } from '../constants';
import { ScenarioChoice } from '../types';
import { GoogleGenAI } from "@google/genai";

// ... (existing imports)

// Inside NarrativeEngine component:

const handleChoice = (choice: ScenarioChoice) => {
  if (!scenario) return;
  setLastClickedId(choice.id);
  setActiveChoice(choice);
  // Determine result type for visual feedback
  const resultType = choice.type === 'correct' ? 'success' : choice.type === 'nuanced' ? 'nuanced' : 'fail';

  if (choice.type === 'correct') {
    triggerGlitch('success');
    setModalType('success');
    if (choice.impact) updateBalance(choice.impact);
    if (choice.shard) addShard(choice.shard);
  } else if (choice.type === 'nuanced') {
    triggerGlitch('success');
    setModalType('nuanced');
    if (choice.impact) updateBalance(choice.impact);
  } else {
    triggerGlitch('error');
    setModalType('fail');
  }
  recordDecision({ levelId: scenario.id, choiceId: choice.id, timestamp: Date.now() });
};

// ... (inside return block)

<div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group ring-1 ring-slate-800">
  {isGeneratingImage ? (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
    </div>
  ) : currentImageUrl ? (
    <img src={currentImageUrl} alt="Era Visual" className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" />
  ) : (
    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
      <ImageIcon className="w-12 h-12 mb-3" />
      <span className="mono text-[10px] uppercase tracking-[0.4em]">Visual_Offline</span>
    </div>
  )}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

  {/* Character Portrait Overlay */}
  <div className="absolute bottom-6 left-6 flex items-end gap-4 animate-in slide-in-from-left-4 duration-1000">
    <div className="w-24 h-24 rounded-2xl border-2 border-emerald-500/30 overflow-hidden shadow-2xl bg-slate-900 shrink-0">
      <img src={CHARACTER_PORTRAITS[currentLevel]} alt={scenario.role} className="w-full h-full object-cover" />
    </div>
    <div className="pb-2">
      <div className="flex items-center gap-2 text-[10px] mono text-emerald-500 font-black uppercase tracking-widest mb-1">
        <User className="w-3 h-3" /> {scenario.role}
      </div>
      <div className="text-[9px] text-slate-400 mono uppercase tracking-tight bg-slate-950/60 px-2 py-1 rounded border border-white/5 backdrop-blur-sm">
        Identity: Verified
      </div>
    </div>
  </div>
</div>

// ... (Choice Modal)

{
  modalType !== 'none' && activeChoice && (
    <div className={`fixed inset-0 z-[110] flex items-center justify-center p-6 transition-all duration-500 ${isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-xl" onClick={nextLevel} />
      <div className="relative z-10 w-full max-w-5xl bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.8)] border border-slate-800/80 flex flex-col md:flex-row min-h-[500px]">
        {/* High-Fidelity Result Image */}
        <div className="md:w-5/12 relative bg-slate-950 overflow-hidden border-r border-slate-800/50 shrink-0">
          <img
            src={modalType === 'success' ? UI_RESULT_ASSETS.success : modalType === 'nuanced' ? UI_RESULT_ASSETS.nuanced : UI_RESULT_ASSETS.failure}
            alt="Result Status"
            className="w-full h-full object-cover opacity-80 animate-in zoom-in-110 duration-[10s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center animate-pulse ${modalType === 'fail' ? 'border-red-500/50 bg-red-500/10' : 'border-emerald-500/50 bg-emerald-500/10'}`}>
              {modalType === 'fail' ? <ShieldAlert className="w-10 h-10 text-red-500" /> : <Box className="w-10 h-10 text-emerald-500" />}
            </div>
          </div>
        </div>

        <div className="flex-1 p-10 md:p-14 flex flex-col justify-center items-start text-left overflow-y-auto custom-scrollbar max-h-[90vh]">
          <div className={`px-4 py-1.5 rounded-full mb-6 flex items-center gap-2 border animate-in slide-in-from-left-4 ${modalType === 'fail' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'}`}>
            {modalType === 'fail' ? <ShieldAlert className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            <span className="mono text-[10px] font-black uppercase tracking-widest">
              {modalType === 'success' ? 'MISSION_PARAMS_MET' : modalType === 'nuanced' ? 'EQUILIBRIUM_STABLE' : 'MISSION_CRITICAL_FAILURE'}
            </span>
          </div>

          <h2 className={`text-5xl font-black mb-6 uppercase tracking-tighter leading-none ${modalType === 'fail' ? 'text-red-500' : 'text-slate-100'}`}>
            {modalType === 'success' ? 'Shard Secured' : modalType === 'nuanced' ? 'Nuanced Path' : 'Temporal Stress'}
          </h2>
          <p className="text-slate-300 mb-8 text-xl leading-relaxed font-medium">{activeChoice.text}</p>
        </div>
        );
};

        export default NarrativeEngine;
