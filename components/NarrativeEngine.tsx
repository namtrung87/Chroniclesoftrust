
import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, ArrowRight, Award, Loader2, Sparkles, Image as ImageIcon, Target, Cpu, Terminal, RefreshCw, Lightbulb, Compass, ShieldCheck, Scale, Zap, Info, Box, User, Clock, ChevronRight, RotateCcw, BookOpen, GraduationCap } from 'lucide-react';
import { useGame } from '../GameContext';
import { SCENARIOS, LEVEL_ICONS } from '../constants';
import { ScenarioChoice } from '../types';
import { GoogleGenAI } from "@google/genai";
import CitadelDashboard from './CitadelDashboard';
import NexusInterface from './NexusInterface';
import ArchiveCertificate from './ArchiveCertificate';

const NarrativeEngine: React.FC = () => {
  const { currentLevel, setCurrentLevel, addShard, updateBalance, recordDecision, triggerGlitch } = useGame();
  const [modalType, setModalType] = useState<'none' | 'success' | 'fail' | 'nuanced'>('none');
  const [activeChoice, setActiveChoice] = useState<ScenarioChoice | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isLevelLoading, setIsLevelLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showBriefingConfirm, setShowBriefingConfirm] = useState(false);

  const scenario = SCENARIOS[currentLevel];
  const IconComponent = scenario ? (LEVEL_ICONS[scenario.icon] || ShieldAlert) : ShieldAlert;

  useEffect(() => {
    const initLevel = async () => {
      setCurrentImageUrl(null);

      // If we're at a level that has no defined scenario (endgame phases), skip briefing
      if (!scenario) {
        setIsLevelLoading(false);
        return;
      }

      setIsLevelLoading(true);
      setShowBriefingConfirm(false);
      setLoadingProgress(0);

      setModalType('none');
      setActiveChoice(null);
      setLastClickedId(null);

      const progressInt = setInterval(() => {
        setLoadingProgress(p => Math.min(p + (Math.random() * 15), 90));
      }, 150);

      await generateEraVisual();

      clearInterval(progressInt);
      setLoadingProgress(100);

      setTimeout(() => {
        setShowBriefingConfirm(true);
      }, 600);
    };
    initLevel();
  }, [currentLevel]);

  const generateEraVisual = async () => {
    if (isGeneratingImage || !scenario || !process.env.API_KEY) return;
    setIsGeneratingImage(true);

    let success = false;
    let retries = 0;
    const maxRetries = 1; // Limit retries to save quota

    while (!success && retries <= maxRetries) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const promptText = `Cinematic historical masterwork: ${scenario.year}, ${scenario.title}. Wide angle, dramatic lighting, atmospheric emerald glow, high detail, masterpiece art style.`;
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: { parts: [{ text: promptText }] },
          config: { imageConfig: { aspectRatio: "16:9" } }
        });

        const candidate = response.candidates?.[0];
        if (candidate?.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData) {
              setCurrentImageUrl(`data:image/png;base64,${part.inlineData.data}`);
              success = true;
              break;
            }
          }
        }
        if (success) break;
      } catch (e: any) {
        const errorMsg = e?.message || (typeof e === 'string' ? e : JSON.stringify(e));
        console.error(`Visual Recon attempt ${retries + 1} failed:`, errorMsg);

        if (errorMsg.includes('429') || errorMsg.includes('QUOTA') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
          setIsGeneratingImage(false);
          return; // Stop on quota issues
        }

        retries++;
        if (retries <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1500 * Math.pow(2, retries)));
        }
      }
    }
    setIsGeneratingImage(false);
  };

  const handleConfirmBriefing = () => {
    setIsLevelLoading(false);
  };

  const nextLevel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalType('none');
      setActiveChoice(null);
      setLastClickedId(null);
      setCurrentLevel(currentLevel + 1);
      setIsClosing(false);
    }, 500);
  };

  const handleRechoose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalType('none');
      setLastClickedId(null);
      setIsClosing(false);
    }, 300);
  };

  const handleChoice = (choice: ScenarioChoice) => {
    if (!scenario) return;
    setLastClickedId(choice.id);
    setActiveChoice(choice);
    if (choice.type === 'correct') {
      triggerGlitch('success');
      setModalType('success');
      if (choice.statImpact) updateBalance(choice.statImpact);
      if (choice.reward) addShard(choice.reward);
    } else if (choice.type === 'nuanced') {
      triggerGlitch('success');
      setModalType('nuanced');
      if (choice.statImpact) updateBalance(choice.statImpact);
    } else {
      triggerGlitch('error');
      setModalType('fail');
    }
    recordDecision({ levelId: scenario.id, choiceId: choice.id, timestamp: Date.now() });
  };

  if (isLevelLoading && scenario) {
    return (
      <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
        {currentImageUrl && (
          <div className="absolute inset-0 opacity-20 blur-2xl scale-110">
            <img src={currentImageUrl} alt="Historical Node Background" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />

        <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
              <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center relative z-10 group">
                <Clock className="w-10 h-10 text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="mono text-[10px] text-emerald-500/60 uppercase tracking-[0.5em] font-black">Temporal_Synchronization</div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tight">{scenario?.title}</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-emerald-500/30" />
                <span className="mono text-lg text-emerald-400 font-bold">{scenario?.year}</span>
                <span className="h-px w-8 bg-emerald-500/30" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 backdrop-blur-md">
              <div className="flex items-center gap-3 text-emerald-500">
                <User className="w-5 h-5" />
                <span className="mono text-[10px] font-black uppercase tracking-widest">Archivist_Persona</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium italic">
                "{scenario?.archivistRole}"
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 backdrop-blur-md md:col-span-2">
              <div className="flex items-center gap-3 text-blue-500">
                <GraduationCap className="w-5 h-5" />
                <span className="mono text-[10px] font-black uppercase tracking-widest">The_Evolution_of_Trust</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-bold font-serif italic border-l-2 border-blue-500/30 pl-4">
                {scenario?.eraEducation}
              </p>
              <div className="pt-4 mt-2 border-t border-slate-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-3.5 h-3.5 text-blue-400" />
                  <span className="mono text-[9px] font-black uppercase text-slate-500">Node_Briefing</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {scenario?.eraContext}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            {!showBriefingConfirm ? (
              <div className="space-y-4">
                <div className="flex justify-between mono text-[10px] text-slate-500 uppercase tracking-widest font-black">
                  <span>Synthesizing_Neural_Link</span>
                  <span>{Math.floor(loadingProgress)}%</span>
                </div>
                <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981] transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleConfirmBriefing}
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black mono text-sm uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-4 animate-in zoom-in-95 duration-500"
              >
                Establish_Neural_Link <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentLevel === 4) return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-hidden">
      <header className="flex items-center gap-6 border-b border-slate-800/50 pb-4 shrink-0">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <IconComponent className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">{scenario?.title}</h1>
          <div className="flex gap-4 mono text-[10px] uppercase font-bold text-slate-500 tracking-widest">
            <span>{scenario?.year}</span>
            <span className="text-emerald-500/30">|</span>
            <span>{scenario?.theme}</span>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto mt-4 pr-2 custom-scrollbar">
        <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Info className="w-4 h-4 text-emerald-500" />
            <h4 className="mono text-[10px] font-black text-emerald-400 uppercase tracking-widest">Direct_Mission_Instruction</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
            {scenario?.question}
          </p>
        </div>
        <CitadelDashboard />
      </div>
    </div>
  );
  if (currentLevel === 5) return <NexusInterface />;

  if (currentLevel >= 6 && currentLevel < 7) return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 animate-in fade-in zoom-in-95 duration-1000">
      <div className="p-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-2xl relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
        <Award className="w-24 h-24 text-emerald-400 relative z-10" />
      </div>
      <div className="space-y-3">
        <h2 className="mono text-4xl font-black text-white uppercase tracking-tighter">Ascension reached</h2>
        <p className="max-w-md text-slate-400 italic">"The balance is secured. The archive is stable."</p>
      </div>
      <button onClick={() => setCurrentLevel(7)} className="px-12 py-5 bg-emerald-500 text-slate-950 rounded-2xl mono text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">Finalize_Archive</button>
    </div>
  );

  if (currentLevel === 7) return <ArchiveCertificate />;

  if (!scenario) return null;

  return (
    <div className="relative h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <header className="flex items-center gap-6 border-b border-slate-800/50 pb-4">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <IconComponent className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">{scenario.title}</h1>
          <div className="flex gap-4 mono text-[10px] uppercase font-bold text-slate-500 tracking-widest">
            <span>{scenario.year}</span>
            <span className="text-emerald-500/30">|</span>
            <span>{scenario.theme}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0 overflow-hidden">
        <div className="lg:col-span-8 flex flex-col space-y-6 overflow-y-auto pr-2 custom-scrollbar">
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

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-[10px] mono text-emerald-500/70 font-black uppercase tracking-widest mb-1">
                <User className="w-3 h-3" /> Archivist Persona: {scenario.year}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-medium italic bg-slate-950/40 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                "{scenario.archivistRole}"
              </p>
            </div>
          </div>

          <div className="space-y-8 bg-slate-900/20 p-6 rounded-3xl border border-slate-800/50">
            <div className="flex items-center gap-2 text-[10px] mono text-slate-500 font-bold uppercase tracking-widest">
              <Info className="w-4 h-4" /> Situation_Log
            </div>
            <p className="text-xl text-slate-200 font-medium leading-relaxed">
              {scenario.narrative}
            </p>
            <div className="pt-4 border-t border-slate-800/50">
              <h3 className="mono text-amber-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-3">
                <Target className="w-4 h-4" /> Neural_Decision_Node
              </h3>
              <p className="text-3xl text-white font-black leading-tight tracking-tight">
                {scenario.question}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <section className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800/50 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 text-[10px] mono text-emerald-500 font-bold uppercase tracking-widest border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4" /> Evolution_Matrix
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[9px] text-slate-500 uppercase font-black tracking-widest">
                  <Compass className="w-3.5 h-3.5 text-emerald-500/50" /> Circle_of_Concern
                </div>
                <div className="text-xs text-slate-200 font-bold uppercase p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
                  {scenario.dossierInsight?.scope}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[9px] text-slate-500 uppercase font-black tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500/50" /> Trust_Definition
                </div>
                <div className="text-xs text-slate-200 font-bold uppercase p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
                  {scenario.dossierInsight?.trust}
                </div>
              </div>

              <div className="p-5 bg-red-950/20 border border-red-900/30 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><Scale className="w-10 h-10" /></div>
                <div className="flex items-center gap-2 text-[9px] text-red-400/80 uppercase font-black mb-2 tracking-widest">
                  <Zap className="w-3.5 h-3.5" /> Integrity_Gap
                </div>
                <p className="text-[11px] text-slate-400 italic leading-relaxed relative z-10">
                  "{scenario.dossierInsight?.gap}"
                </p>
              </div>
            </div>
          </section>

          <section className="flex-1 p-6 bg-blue-600/5 border border-blue-500/20 rounded-3xl flex flex-col shadow-xl">
            <div className="flex items-center gap-2 text-[10px] mono text-blue-400 font-bold uppercase tracking-widest mb-4">
              <Lightbulb className="w-4 h-4" /> Archivist_Synthesis
            </div>
            <div className="flex-1">
              <p className="text-[12px] text-slate-400 leading-relaxed font-medium">
                {scenario.educationalNote}
              </p>
              <div className="mt-4 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-[9px] text-slate-500 font-black uppercase mb-2">
                  <Terminal className="w-3 h-3" /> Era_Dossier
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                  {scenario.eraContext}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-500/10 flex justify-between items-center opacity-40">
              <span className="mono text-[8px] font-black uppercase">Stream: Optimized</span>
              <Info className="w-3 h-3" />
            </div>
          </section>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {scenario.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleChoice(choice)}
            className={`group p-8 bg-slate-900/60 border border-slate-800 rounded-3xl text-left transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40 active:scale-95 flex flex-col justify-between h-full min-h-[160px] shadow-2xl relative overflow-hidden
              ${lastClickedId === choice.id ? 'ring-2 ring-emerald-500 border-emerald-500' : ''}`}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
            <span className="text-lg font-black text-slate-300 group-hover:text-white transition-colors leading-tight">
              {choice.label}
            </span>
            <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
              <ArrowRight className="w-6 h-6 text-emerald-500" />
            </div>
          </button>
        ))}
      </div>

      {modalType !== 'none' && activeChoice && (
        <div className={`fixed inset-0 z-[110] flex items-center justify-center p-6 transition-all duration-500 ${isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-xl" onClick={nextLevel} />
          <div className="relative z-10 w-full max-w-5xl bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.8)] border border-slate-800/80 flex flex-col md:flex-row min-h-[500px]">
            {currentImageUrl && (
              <div className="md:w-5/12 relative bg-slate-950 overflow-hidden border-r border-slate-800/50 shrink-0">
                <img src={currentImageUrl} alt="Historical Snapshot" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-emerald-500/30 flex items-center justify-center animate-pulse">
                    <Box className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>
              </div>
            )}
            <div className="flex-1 p-10 md:p-14 flex flex-col justify-center items-start text-left overflow-y-auto custom-scrollbar max-h-[90vh]">
              <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-6 shrink-0 ${modalType === 'fail' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                {modalType === 'fail' ? <ShieldAlert className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
              </div>
              <h2 className={`mono text-2xl font-black mb-4 uppercase tracking-tight shrink-0 ${modalType === 'fail' ? 'text-red-500' : 'text-emerald-400'}`}>
                {modalType === 'success' ? 'SHARD SECURED' : modalType === 'nuanced' ? 'BALANCE MAINTAINED' : 'TIMELINE COLLAPSE'}
              </h2>
              <p className="text-slate-100 mb-6 text-xl leading-relaxed font-bold shrink-0">{activeChoice.feedback}</p>

              {activeChoice.ethicalInsight && (
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 mb-8 w-full animate-in fade-in slide-in-from-top-2 duration-700">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="mono text-[10px] font-black text-blue-400 uppercase tracking-widest">Ethical_Synthesis</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium font-serif italic">
                    {activeChoice.ethicalInsight}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 w-full shrink-0">
                {modalType === 'fail' ? (
                  <button onClick={() => setModalType('none')} className="flex-1 py-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black mono text-xs uppercase tracking-[0.2em] transition-all">Retry_Simulation</button>
                ) : (
                  <>
                    <button onClick={handleRechoose} className="flex-1 py-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" /> Re-choose_Path
                    </button>
                    <button onClick={nextLevel} className="flex-1 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black mono text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-2">
                      Next_Era <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NarrativeEngine;
