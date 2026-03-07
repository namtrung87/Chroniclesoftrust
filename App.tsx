
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Globe, Clock, Zap, ArrowRight, BookOpen, WifiOff } from 'lucide-react';
import { GameProvider, useGame } from './GameContext';
import Sidebar from './Sidebar';
import MainStage from './components/MainStage';
import LevelCard from './components/LevelCard';
import NarrativeEngine from './components/NarrativeEngine';
import TutorialModal from './components/TutorialModal';
import HelpBookModal from './components/HelpBookModal';
import { GoogleGenAI } from "@google/genai";

const GameContainer: React.FC = () => {
  const { currentLevel } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(currentLevel > 0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showHelpBook, setShowHelpBook] = useState(false);
  const [appBgUrl, setAppBgUrl] = useState<string | null>(null);
  const [apiQuotaExhausted, setApiQuotaExhausted] = useState(false);

  useEffect(() => {
    const generateAppBg = async () => {
      if (!process.env.API_KEY) return;

      let success = false;
      let retries = 0;
      const maxRetries = 1; // Reduced retries for app background to save quota

      while (!success && retries <= maxRetries) {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts: [{ text: 'Abstract visualization of time flowing through a cosmic archive, deep blues and emerald greens, ethereal glow.' }] },
            config: { imageConfig: { aspectRatio: "16:9" } }
          });

          const candidate = response.candidates?.[0];
          if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
              if (part.inlineData) {
                setAppBgUrl(`data:image/png;base64,${part.inlineData.data}`);
                success = true;
                break;
              }
            }
          }
          if (success) break;
        } catch (e: any) {
          const errorMsg = e?.message || (typeof e === 'string' ? e : JSON.stringify(e));
          console.error(`Bg generation attempt ${retries + 1} failed:`, errorMsg);

          if (errorMsg.includes('429') || errorMsg.includes('QUOTA') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
            setApiQuotaExhausted(true);
            return; // Stop retrying on quota issues
          }

          retries++;
          if (retries <= maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2, retries)));
          }
        }
      }
    };
    generateAppBg();
  }, []);

  const handleStart = () => setGameStarted(true);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden relative">
      {/* AI Generated App Background */}
      {appBgUrl ? (
        <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-1000">
          <img src={appBgUrl} alt="Cosmic Archive" className="w-full h-full object-cover blur-sm scale-105" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/40 to-slate-950" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-br from-emerald-900/20 via-slate-950 to-blue-900/20" />
      )}

      {apiQuotaExhausted && (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 mono text-[9px] font-black uppercase tracking-widest animate-in slide-in-from-right-4">
          <WifiOff className="w-3 h-3" /> API_QUOTA_EXHAUSTED: USING_FALLBACK_VISUALS
        </div>
      )}

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      {showHelpBook && <HelpBookModal onClose={() => setShowHelpBook(false)} />}

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-0 left-0 w-72 h-full transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          <Sidebar
            onClose={() => setMobileMenuOpen(false)}
            onShowTutorial={() => { setShowTutorial(true); setMobileMenuOpen(false); }}
            onShowHelpBook={() => { setShowHelpBook(true); setMobileMenuOpen(false); }}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20">
        <Sidebar
          onShowTutorial={() => setShowTutorial(true)}
          onShowHelpBook={() => setShowHelpBook(true)}
        />
      </div>

      {/* Mobile Control Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 z-40 px-4 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 bg-slate-900 rounded-lg border border-slate-800"
        >
          <Menu className="w-6 h-6 text-emerald-500" />
        </button>
        <div className="mono text-[10px] font-bold text-slate-500 tracking-[0.3em]">CHRONICLES_OF_TRUST</div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0 overflow-y-auto relative z-10">
        <MainStage>
          {!gameStarted ? (
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-full py-12 px-6">
              <LevelCard />

              <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3 text-emerald-500 mb-2">
                    <Shield className="w-6 h-6" />
                    <h2 className="mono text-sm font-black uppercase tracking-widest">Mission Protocol</h2>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Humanity's progress is accelerating faster than its ethics. As the <span className="text-slate-100 font-bold">Archivist</span>, your consciousness has been uploaded into a temporal relay to repair the rift.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Visit critical temporal nodes where the <span className="text-emerald-400">Infinite Balance</span> of economy, society, and environment was nearly shattered.
                  </p>
                </div>

                <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3 text-blue-500 mb-2">
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
            <div className="w-full h-full animate-in fade-in duration-1000">
              <NarrativeEngine />
            </div>
          )}
        </MainStage>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
};

export default App;
