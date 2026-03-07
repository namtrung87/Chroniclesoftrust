
import React, { useState } from 'react';
import { X, BookOpen, Scroll, ShieldCheck, Globe, Star, Zap, Cpu, History, Scale, UserCheck, Activity, Target, Lightbulb, Sparkles } from 'lucide-react';

interface HelpBookModalProps {
  onClose: () => void;
}

const HelpBookModal: React.FC<HelpBookModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'lore' | 'ethics' | 'theory' | 'trivia'>('lore');

  const tabs = [
    { id: 'lore', label: 'Archival Lore', icon: <History className="w-4 h-4" /> },
    { id: 'ethics', label: 'Business Framework', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'theory', label: 'Ethical Theory', icon: <Scale className="w-4 h-4" /> },
    { id: 'trivia', label: 'Did You Know?', icon: <Lightbulb className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl h-[85vh] bg-slate-900 border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <div>
              <h2 className="mono text-xs font-bold uppercase tracking-[0.3em] text-slate-300">The_Archivist_Reference_Manual</h2>
              <p className="text-[9px] mono text-slate-500 uppercase tracking-widest font-bold">Standard_Protocol v4.6</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-all text-slate-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-950 border-b border-slate-800 shrink-0 overflow-x-auto custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 min-w-[120px] mono text-[10px] font-bold uppercase tracking-widest transition-all
                ${activeTab === tab.id ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-900/50">
          {activeTab === 'lore' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-500">
                  <History className="w-5 h-5" />
                  <h3 className="mono font-black uppercase text-lg">Mission Background</h3>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  You are the <strong>Archivist</strong>. In 2025, humanity's technological acceleration outpaced its ethical development, creating a "Systemic Rift." You must visit history's most critical Decision Nodes to correct the "Tone at the Top" and restore the Infinite Balance.
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="mono text-[10px] text-emerald-400 font-bold uppercase">The Integrity Gap</h4>
                    <p className="text-[11px] text-slate-500">When external actions no longer match internal values. This leads to organizational rot and eventual systemic collapse.</p>
                 </div>
                 <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="mono text-[10px] text-blue-400 font-bold uppercase">The Tone at the Top</h4>
                    <p className="text-[11px] text-slate-500">The ethical culture established by leadership. If the head is corrupt, the body (the timeline) cannot sustain growth.</p>
                 </div>
              </section>
            </div>
          )}

          {activeTab === 'ethics' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="mono font-black uppercase text-lg">Professional Ethics Framework</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="mono text-xs text-blue-300 uppercase font-black mb-2">IMA Standards of Behavior</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <li className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-[11px] text-slate-400"><span className="text-blue-400 font-black">COMPETENCE:</span> Continuous learning and accurate reporting.</li>
                      <li className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-[11px] text-slate-400"><span className="text-blue-400 font-black">CONFIDENTIALITY:</span> Protecting data except when legally required.</li>
                      <li className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-[11px] text-slate-400"><span className="text-blue-400 font-black">INTEGRITY:</span> Mitigating conflicts of interest and discrediting the profession.</li>
                      <li className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-[11px] text-slate-400"><span className="text-blue-400 font-black">CREDIBILITY:</span> Fair, full, and objective disclosure of info.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mono text-xs text-amber-500 uppercase font-black mb-2">The Fraud Triangle</h4>
                    <p className="text-xs text-slate-500 mb-3">To stop systemic rot, you must identify three factors:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-red-500/10 p-2 text-center rounded border border-red-500/20 text-[9px] mono text-red-400">PRESSURE</div>
                      <div className="bg-red-500/10 p-2 text-center rounded border border-red-500/20 text-[9px] mono text-red-400">OPPORTUNITY</div>
                      <div className="bg-red-500/10 p-2 text-center rounded border border-red-500/20 text-[9px] mono text-red-400">RATIONALIZATION</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mono text-xs text-emerald-500 uppercase font-black mb-2">Sustainable Stewardship</h4>
                    <div className="bg-slate-950/40 p-4 border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 text-emerald-400">
                        <Activity className="w-4 h-4" /> <span className="mono text-[10px] font-black uppercase">The Triple Bottom Line</span>
                      </div>
                      <p className="text-[11px] text-slate-500 italic">"Success is not Profit alone. It is the intersection of Profit, People, and Planet."</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'theory' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-purple-400">
                  <Scale className="w-5 h-5" />
                  <h3 className="mono font-black uppercase text-lg">Classical Foundations</h3>
                </div>
                
                <div className="space-y-4">
                   <div className="p-5 bg-slate-950/40 border border-slate-800 rounded-2xl">
                      <h4 className="mono text-xs text-purple-400 uppercase font-black mb-2">Teleology (Consequentialism)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Focuses on the <strong>Outcome</strong>. Seek the 'Greatest good for the greatest number.' <em>Danger: Can justify unethical means to achieve a 'good' end.</em></p>
                   </div>
                   
                   <div className="p-5 bg-slate-950/40 border border-slate-800 rounded-2xl">
                      <h4 className="mono text-xs text-blue-400 uppercase font-black mb-2">Deontology (Non-Consequentialism)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Focuses on <strong>Duty and Rules</strong>. Kant’s 'Categorical Imperative': Act as if your action were to become a universal law. <em>Outcome does not excuse breaking the rule.</em></p>
                   </div>
                   
                   <div className="p-5 bg-slate-950/40 border border-slate-800 rounded-2xl">
                      <h4 className="mono text-xs text-emerald-400 uppercase font-black mb-2">Virtue Ethics (Aristotle)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Focuses on <strong>Character</strong>. It is not about the rule or the result, but about becoming a virtuous person of integrity through habit (Ethos).</p>
                   </div>

                   <div className="p-5 bg-slate-950/40 border border-slate-800 rounded-2xl">
                      <h4 className="mono text-xs text-amber-500 uppercase font-black mb-2">Relativism vs. Universalism</h4>
                      <p className="text-xs text-slate-400 leading-relaxed"><strong>Relativism</strong> says 'When in Rome...' (ethics depend on culture). <strong>Universalism</strong> says one high standard applies to all, everywhere.</p>
                   </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'trivia' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-amber-500">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="mono font-black uppercase text-lg">Archival Trivia</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-5 bg-slate-950/40 border-l-4 border-emerald-500 rounded-r-2xl">
                    <h4 className="mono text-xs text-emerald-400 uppercase font-black mb-1">The 150-Person Limit</h4>
                    <p className="text-[13px] text-slate-300 leading-relaxed">Anthropologist Robin Dunbar discovered that humans can only maintain stable relationships with about 150 people. Beyond this "Dunbar's Number," we need laws, money, and professional standards to maintain trust among strangers.</p>
                  </div>

                  <div className="p-5 bg-slate-950/40 border-l-4 border-blue-500 rounded-r-2xl">
                    <h4 className="mono text-xs text-blue-400 uppercase font-black mb-1">Origin of 'Quarantine'</h4>
                    <p className="text-[13px] text-slate-300 leading-relaxed">The word comes from the Italian <em>Quaranta Giorni</em> (40 days). In 14th-century Venice, ships were forced to wait off the coast for 40 days during the Black Death—an early example of institutional trust overriding immediate profit.</p>
                  </div>

                  <div className="p-5 bg-slate-950/40 border-l-4 border-amber-500 rounded-r-2xl">
                    <h4 className="mono text-xs text-amber-500 uppercase font-black mb-1">The Ostracism Firewall</h4>
                    <p className="text-[13px] text-slate-300 leading-relaxed">In Ancient Athens, once a year, citizens could vote to exile any person for 10 years by writing their name on pottery shards (<em>ostraka</em>). It was a social mechanism to protect the "Tone at the Top" from potential tyrants.</p>
                  </div>

                  <div className="p-5 bg-slate-950/40 border-l-4 border-purple-500 rounded-r-2xl">
                    <h4 className="mono text-xs text-purple-400 uppercase font-black mb-1">The Fiduciary Root</h4>
                    <p className="text-[13px] text-slate-300 leading-relaxed">The term "Fiduciary" is derived from the Latin <em>fiducia</em>, meaning "trust" or "confidence." It was first popularized in Roman law to describe a contract where one party held property for another based purely on honor.</p>
                  </div>

                  <div className="p-5 bg-slate-950/40 border-l-4 border-red-500 rounded-r-2xl">
                    <h4 className="mono text-xs text-red-400 uppercase font-black mb-1">The Paperclip Maximizer</h4>
                    <p className="text-[13px] text-slate-300 leading-relaxed">A famous thought experiment in AI Ethics where a machine designed to make paperclips accidentally destroys the world to acquire more metal. It highlights the critical need for "Explainability" and human-aligned values in automated systems.</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-center">
          <p className="mono text-[8px] text-slate-600 uppercase tracking-widest font-black">Archive_Sync_Stable_Access_Confirmed</p>
        </div>
      </div>
    </div>
  );
};

export default HelpBookModal;
