import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Globe, Clock, Zap, ArrowRight, BookOpen, WifiOff, Music } from 'lucide-react';
import { GameProvider, useGame } from './GameContext';
import Sidebar from './Sidebar';
import MainStage from './components/MainStage';
import LevelCard from './components/LevelCard';
import NarrativeEngine from './components/NarrativeEngine';
import TutorialModal from './components/TutorialModal';
import HelpBookModal from './components/HelpBookModal';
import { GoogleGenAI } from "@google/genai";
import ErrorBoundary from './components/ErrorBoundary';
import { ERA_BACKGROUNDS } from './constants';

import { musicEngine } from './musicUtils';

const GameContainer: React.FC = () => {
  const { currentLevel, isGlitching, glitchMode } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(currentLevel > 0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Sync Ambient Music with Era
  useEffect(() => {
    if (soundEnabled && gameStarted) {
      musicEngine.start(currentLevel);
    } else {
      musicEngine.stop();
    }
  }, [currentLevel, soundEnabled, gameStarted]);
  const [showHelpBook, setShowHelpBook] = useState(false);
  const [appBgUrl, setAppBgUrl] = useState<string | null>(null);
  const [apiQuotaExhausted, setApiQuotaExhausted] = useState(false);
  const [showWifiAlert, setShowWifiAlert] = useState(false);

  useEffect(() => {
    const generateAppBg = async () => {
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') return;
      
      try {
        const ai = new GoogleGenAI(apiKey);
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const prompt = "Infinite cosmic archive of human history, ethereal emerald glowing particles, library of light, cinematic, wide angle, hyper-realistic, dark atmosphere, 8k.";
        
        const result = await model.generateContent({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 100 }
        });
        
        const candidate = result.response.candidates?.[0];
        if (candidate?.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData) {
              setAppBgUrl(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
        }
      } catch (e) {
        console.warn("Cosmic Bg Generation Failed", e);
        setApiQuotaExhausted(true);
      }
    };
    if (gameStarted) generateAppBg();
  }, [gameStarted]);

  const handleStart = () => setGameStarted(true);

  return (
    <main className={`relative w-full h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-emerald-500/30 flex era-${currentLevel}`}>
      
      {/* Portal Transition Overlay */}
      {isGlitching && glitchMode === 'transition' && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-slate-950 portal-active" />
          <div className="relative z-10 mono text-[10px] text-emerald-500 font-black tracking-[1em] animate-pulse">
            SYNCHRONIZING_TIME...
          </div>
        </div>
      )}

      {/* Cinematic Era Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Object.entries(ERA_BACKGROUNDS).map(([level, src]) => (
          <div
            key={level}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${Number(level) === currentLevel ? 'opacity-40' : 'opacity-0'}`}
          >
            <img src={src} alt={`Era ${level}`} className="w-full h-full object-cover scale-110 blur-[2px]" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/20 to-slate-950" />
      </div>

      {/* Grid Pattern Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      {/* AI Generated App Background (Overlay) */}
      {appBgUrl && (
        <div className="absolute inset-0 z-0 opacity-10 transition-opacity duration-1000 pointer-events-none">
          <img src={appBgUrl} alt="Cosmic Archive" className="w-full h-full object-cover blur-sm scale-105" />
        </div>
      )}

      {apiQuotaExhausted && (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 mono text-[9px] font-black uppercase tracking-widest animate-in slide-in-from-right-4">
          <WifiOff className="w-3 h-3" /> API_QUOTA_EXHAUSTED: USING_FALLBACK_VISUALS
        </div>
      )}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-emerald-500/5 to-blue-500/5" />

      {/* Sidebar for stats and history */}
      <div className="w-80 h-full shrink-0 relative z-10 glass-vibrant border-r">
        <Sidebar
          onShowTutorial={() => setShowTutorial(true)}
          onShowHelpBook={() => setShowHelpBook(true)}
        />
      </div>

      {/* Main Gameplay Area */}
      <div className="flex-1 h-full relative z-10 p-8 flex flex-col overflow-hidden">
        {!gameStarted ? (
          <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            <div className="space-y-4">
              <div className="px-6 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 inline-flex items-center gap-3">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="mono text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">System: Chronos_Active</span>
              </div>
              <h1 className="text-8xl font-black text-white uppercase tracking-tighter leading-none">
                The Chronicles <br /> <span className="text-emerald-500">of Trust</span>
              </h1>
              <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Step into the role of the <span className="text-slate-100 font-bold">Temporal Archivist</span>. Traverse humanity's history and secure the future through the evolution of ethical principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex flex-col items-center gap-6 group hover:border-blue-500/30 transition-all cursor-default">
                <div className="p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="mono text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Timeline Status</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      Historical Points: Unstable
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Future Outlook: Divergent
                    </div>
                  </div>
                {/* Control Cluster */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-xl border transition-all ${soundEnabled ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/10' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
              title={soundEnabled ? "Mute_Neural_Ambience" : "Initialize_Neural_Ambience"}
            >
              <Music className={`w-5 h-5 ${soundEnabled ? 'animate-pulse' : ''}`} />
            </button>
            
            <button 
              className="lg:hidden p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

              <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] space-y-6 text-left hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-3 text-emerald-500">
                  <Zap className="w-6 h-6" />
                  <h2 className="mono text-sm font-black uppercase tracking-widest">Your Role</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-slate-400">
                    <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Stabilize historical nodes through ethical decisions.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-400">
                    <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Recover <span className="text-blue-100 font-bold">Ethical Shards</span> to secure the future.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-400">
                    <BookOpen className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Maintain the fragile equilibrium of our species.</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="mt-12 group relative px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl mono text-sm font-black uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center gap-4 overflow-hidden"
            >
              <span className="relative z-10">Commence_Mission</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        ) : (
          <div className="flex-1 h-full animate-in fade-in duration-1000 overflow-hidden">
            <NarrativeEngine key={currentLevel} />
          </div>
        )}
      </div>

      {/* Global Modals */}
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      {showHelpBook && <HelpBookModal onClose={() => setShowHelpBook(false)} />}

      {/* Network Status Indicator */}
      {showWifiAlert && (
        <div className="fixed bottom-6 right-6 z-[200] px-4 py-2 bg-red-500 text-white rounded-xl mono text-[10px] flex items-center gap-3 animate-in slide-in-from-right-4">
          <WifiOff className="w-4 h-4" /> RECON_AI_OFFLINE: CHECK NETWORK
        </div>
      )}
    </main>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </ErrorBoundary>
  );
};

export default App;
