
import React, { useState, useEffect } from 'react';
import { Award, Printer, RefreshCw, Star, Loader2, Image as ImageIcon, Scale, Activity, Zap, ShieldCheck, ThumbsUp, ThumbsDown, GraduationCap, Quote } from 'lucide-react';
import { useGame } from '../GameContext';
import { SHARD_ICONS } from '../constants';
import { GoogleGenAI } from "@google/genai";

const ArchiveCertificate: React.FC = () => {
  const { collectedShards, resetGame, balance } = useGame();
  const [agentName, setAgentName] = useState('');
  const [ascensionImageUrl, setAscensionImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const generateAscensionVisual = async () => {
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
        setIsGenerating(false);
        return;
      }
      setIsGenerating(true);
      let success = false;
      let retries = 0;
      const maxRetries = 2;

      while (!success && retries <= maxRetries) {
        try {
          const ai = new GoogleGenAI(apiKey);
          const prompt = "A futuristic masterwork of the Archivist standing at the center of a repaired timeline, cosmic energy flowing into a balanced triad of human city, nature, and machine light. Hyper-detailed cinematic art.";
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts: [{ text: prompt }] },
            config: { imageConfig: { aspectRatio: "16:9" } }
          });
          const candidate = response.candidates?.[0];
          if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
              if (part.inlineData) {
                setAscensionImageUrl(`data:image/png;base64,${part.inlineData.data}`);
                success = true;
                break;
              }
            }
          }
          if (success) break;
        } catch (e) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      setIsGenerating(false);
    };
    generateAscensionVisual();
  }, []);

  const getPerformanceAnalysis = () => {
    const goods = [];
    const bads = [];

    if (balance.eco >= 35) goods.push({ title: "Economic Resilience", desc: "You prioritized growth and resource efficiency, ensuring the timeline has the energy to sustain complex life." });
    else bads.push({ title: "Resource Stagnation", desc: "The timeline suffers from under-utilization. Without growth, societies often turn inward and collapse into tribalism." });

    if (balance.soc >= 35) goods.push({ title: "Social Cohesion", desc: "Your decisions strengthened the bonds between strangers, preventing the fragmentation of the social contract." });
    else bads.push({ title: "Systemic Fragmentation", desc: "Social trust is low. Inhabitants rely on closed-loop kinship rather than open cooperation, limiting human potential." });

    if (balance.env >= 35) goods.push({ title: "Biosphere Integrity", desc: "You successfully protected the life-support systems of the planet, ensuring a home for future generations." });
    else bads.push({ title: "Ecological Debt", desc: "You've borrowed from the future. The current stability is a facade built on environmental depletion." });

    return { goods, bads };
  };

  const getArchivalVerdict = () => {
    if (balance.env < 30) return { title: "Pyrrhic Prosperity", text: "You have built a wealthy world but left it gasping for air. The timeline is stable, but fragile.", color: "text-amber-600" };
    if (balance.soc < 30) return { title: "Mechanical Peace", text: "A world of efficiency and clean air, but lacking the soul of social connection. The machine works, but the people are silent.", color: "text-blue-600" };
    if (balance.eco < 30) return { title: "Sustained Stagnation", text: "A beautiful, fair world that lacks the energy to grow. Humanity is safe, but dormant.", color: "text-emerald-600" };
    return { title: "The Golden Equilibrium", text: "A masterwork of stewardship. You have balanced the hunger for growth with the sacredness of life and community.", color: "text-emerald-600" };
  };

  const verdict = getArchivalVerdict();
  const analysis = getPerformanceAnalysis();

  return (
    <div className="flex flex-col items-center py-4 max-w-5xl mx-auto overflow-y-auto h-full pr-4 custom-scrollbar">
      <div className="certificate-container bg-white text-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl border-8 border-double border-slate-200 w-full relative overflow-hidden transition-all mb-8">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 text-center space-y-8">
          <Award className="w-16 h-16 text-emerald-600 mx-auto" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-slate-800 uppercase">Certificate of Stewardship</h1>

          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <span className="mono text-[10px] uppercase font-bold">Synthesizing_Ascension...</span>
              </div>
            ) : ascensionImageUrl ? (
              <img src={ascensionImageUrl} alt="Ascension" className="w-full h-full object-cover grayscale transition-all hover:grayscale-0 duration-1000" />
            ) : null}
          </div>

          <div className="py-8 border-y border-slate-200">
            <p className="text-slate-500 font-serif italic mb-4">Presented to</p>
            <input
              type="text" placeholder="ENTER AGENT NAME" value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="no-print w-full max-w-xs text-center border-b-2 border-slate-300 focus:border-emerald-500 outline-none text-2xl font-bold bg-transparent placeholder:text-slate-200 transition-all uppercase"
            />
            {agentName && <div className="hidden print:block text-3xl font-bold uppercase tracking-wider underline decoration-slate-300 underline-offset-8">{agentName}</div>}

            <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
              <h3 className={`mono text-sm font-black uppercase mb-2 ${verdict.color}`}>Verdict: {verdict.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-serif italic">"{verdict.text}"</p>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-[10px] mono text-slate-400 uppercase font-black">Economy</div>
                  <div className="text-lg font-black text-emerald-600">{balance.eco}%</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] mono text-slate-400 uppercase font-black">Society</div>
                  <div className="text-lg font-black text-blue-600">{balance.soc}%</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] mono text-slate-400 uppercase font-black">Env</div>
                  <div className="text-lg font-black text-teal-600">{balance.env}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recovered Ethical Shards</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {collectedShards.map((shard, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 grayscale transition-all hover:grayscale-0 scale-75">
                    {SHARD_ICONS[shard]}
                  </div>
                  <span className="text-[8px] mono font-bold uppercase text-slate-400 max-w-[60px]">{shard.split(' ').slice(-1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED ANALYSIS SECTION */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 no-print">
        <div className="bg-emerald-950/20 border border-emerald-500/20 p-8 rounded-[2.5rem] space-y-6">
          <div className="flex items-center gap-3 text-emerald-400">
            <ThumbsUp className="w-6 h-6" />
            <h3 className="mono text-lg font-black uppercase">Success Metrics</h3>
          </div>
          <div className="space-y-4">
            {analysis.goods.map((item, i) => (
              <div key={i} className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-black text-emerald-500 uppercase mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
            {analysis.goods.length === 0 && <p className="text-xs text-slate-500 italic">No major successes recorded in this cycle.</p>}
          </div>
        </div>

        <div className="bg-red-950/20 border border-red-500/20 p-8 rounded-[2.5rem] space-y-6">
          <div className="flex items-center gap-3 text-red-400">
            <ThumbsDown className="w-6 h-6" />
            <h3 className="mono text-lg font-black uppercase">Vulnerability Gaps</h3>
          </div>
          <div className="space-y-4">
            {analysis.bads.map((item, i) => (
              <div key={i} className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-black text-red-500 uppercase mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
            {analysis.bads.length === 0 && <p className="text-xs text-slate-500 italic">Zero vulnerability gaps detected. Flawless stewardship.</p>}
          </div>
        </div>
      </div>

      {/* EDUCATIONAL SYNTHESIS PANEL */}
      <div className="w-full bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] mb-12 space-y-10 no-print">
        <div className="flex items-center gap-4 text-emerald-500 border-b border-slate-800 pb-6">
          <GraduationCap className="w-8 h-8" />
          <div>
            <h2 className="mono text-xl font-black uppercase tracking-tighter">The Ethical Synthesis</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Lessons from the Timeline</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="mono text-xs font-bold uppercase">The Evolution of Trust</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trust is not a feeling; it is <strong>humanity's primary scaling technology</strong>.
              In the Dawn Era (10,000 BCE), trust was <strong>Biological</strong>—built on family blood.
              In the Civic Era (300 BCE), it became <strong>Psychological</strong>—built on individual character.
              By the Mercantile Era (1720 CE), it scaled to <strong>Institutional</strong>—built on universal standards and certificates.
              In the Digital Era (2025 CE), trust has become <strong>Systemic</strong>—built on the transparency of the algorithms that govern our lives.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-400">
              <Scale className="w-5 h-5" />
              <h3 className="mono text-xs font-bold uppercase">The Infinite Balance</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ethics is the art of <strong>maintaining equilibrium</strong>. A society that maximizes Economy without Society becomes a dystopia of extraction.
              A society that maximizes Society without Economy becomes a fragile commune incapable of survival.
              And a society that ignores Environment loses its very foundation.
              True stewardship is not about winning; it is about ensuring the game <strong>never ends</strong>.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col items-center text-center">
          <Quote className="w-8 h-8 text-slate-700 mb-4" />
          <p className="text-lg text-slate-300 font-serif italic max-w-2xl">
            "The purpose of ethics is to allow human beings to coordinate at a scale larger than their immediate family, creating a future that is not just efficient, but worth living in."
          </p>
          <span className="mt-4 mono text-[10px] text-slate-500 uppercase font-black">— Archival Protocol Consensus</span>
        </div>
      </div>

      <div className="flex gap-6 no-print mb-20">
        <button onClick={() => window.print()} className="flex items-center gap-2 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-2xl font-black mono text-xs uppercase tracking-[0.2em] shadow-xl transition-all hover:-translate-y-1 active:scale-95">
          <Printer className="w-5 h-5" /> PRINT_CERTIFICATE
        </button>
        <button onClick={resetGame} className="flex items-center gap-2 px-10 py-5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-2xl font-black mono text-xs uppercase tracking-[0.2em] border border-slate-700 transition-all hover:-translate-y-1 active:scale-95">
          <RefreshCw className="w-5 h-5" /> NEW_SIMULATION
        </button>
      </div>
    </div>
  );
};

export default ArchiveCertificate;
