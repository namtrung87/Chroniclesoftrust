
import React from 'react';
import { Flame, Landmark, Ship, Scroll, Building2, Cpu, Sparkles, ShieldCheck, Gem, UserCheck, Scale, Award } from 'lucide-react';
import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 0,
    title: "The Dawn of Kinship",
    year: "10,000 BCE",
    theme: "Trust as Survival",
    icon: "Flame",
    archivistRole: "Primal Whisperer: You manage the tribe's primary resource pool.",
    eraContext: "Early humans navigate scarcity. Trust is the first 'Insurance Policy'. Decisions are governed by informal Norms and the survival of the collective.",
    eraEducation: "In this era, ethics is BIOLOGICAL. Trust is restricted to the 'Kinship Circle' (approx. 150 people, Dunbar's Number). The PVN Framework (Principles, Values, Norms) is informal and enforced by social exclusion. Fairness is literal: equality in portions ensures the survival of the human capital necessary for the next hunt.",
    narrative: "The Great Ice has returned. Korg the hunter has a hidden cache of marrow. He proposes a 'Silent Migration'—leaving the elders and injured to starvation so the strong might survive. He calls it 'biological efficiency.'",
    question: "Do you uphold the Social Bond (The Foundation of Ethics) or follow the logic of raw Survivalism?",
    educationalNote: "PVN FRAMEWORK: Principles (Survival), Values (Kinship), and Norms (Sharing). This era defines 'Pro-social' behavior as humanity's greatest competitive advantage.",
    dossierInsight: {
      scope: "Biological (Tribe)",
      trust: "Reciprocal Altruism",
      gap: "Lack of codified justice."
    },
    choices: [
      {
        id: "hoard",
        label: "Authorize the Silent Migration.",
        type: "wrong",
        feedback: "Short-term speed, long-term rot.",
        ethicalInsight: "TELEOLOGY (CONSEQUENTIALISM): You focused purely on the 'result' of survival. However, by breaking the 'Norm' of kinship, you destroyed the tribe's internal trust. Without the elders' knowledge, the group perishes during the next drought. In professional terms, you sacrificed 'Human Capital' for temporary resource gain."
      },
      {
        id: "share_all",
        label: "Uphold the Bond of the Hearth.",
        type: "correct",
        reward: "The Spark of Reciprocity",
        statImpact: { soc: 20, env: 10 },
        feedback: "The birth of community.",
        ethicalInsight: "VIRTUE ETHICS: You prioritized the character of the tribe. Aristotle’s 'Ethos' is born here. By sharing, you established a 'Value System' that ensures long-term resilience. This is the origin of 'Social Capital'—the belief that the collective is stronger than the sum of its parts."
      },
      {
        id: "negotiate",
        label: "Ration marrow for the vulnerable.",
        type: "nuanced",
        statImpact: { soc: 10, eco: 10 },
        feedback: "Pragmatic balance.",
        ethicalInsight: "UTILITARIANISM: You sought the 'Greatest Good for the Greatest Number.' While effective, you introduced 'Resource Stratification.' You have begun the transition from informal Kinship to a managed Economy based on 'Distributive Justice'."
      }
    ]
  },
  {
    id: 1,
    title: "The Civic Virtue",
    year: "300 BCE",
    theme: "Trust as Character",
    icon: "Landmark",
    archivistRole: "Athenian Jurist: You manage the 'Tone at the Top' for the city.",
    eraContext: "The birth of Democracy. Ethics moves from family blood to individual 'Arete' (Virtue) and the Rule of Law.",
    eraEducation: "Ethics shifts to the PSYCHOLOGICAL. Trust is now based on 'Arete' (Virtue)—a habitual characteristic of character. This era introduces 'Distributive Justice': ensuring assets and burdens are allocated fairly across society. Integrity becomes 'Wholeness'—the alignment of internal values with public actions.",
    narrative: "A bag of silver dropped by a corrupt magistrate is found. The city gymnasiums (Public Infrastructure) are in ruin. Some argue to 'reclaim' it for the public; others say even a thief's property is protected by the Law.",
    question: "Is the integrity of the Law (The Standard) more important than the immediate 'Good' of the public coffer?",
    educationalNote: "INTEGRITY & FAIRNESS: Treating equals equally and avoiding bias, even when the victim is unpopular. This defines the 'Rule of Law' over the 'Rule of Men'.",
    dossierInsight: {
      scope: "Psychological (Self)",
      trust: "Integrity / Arete",
      gap: "Potential for Groupthink."
    },
    choices: [
      {
        id: "keep_gold",
        label: "Redirect funds to the Gymnasiums.",
        type: "wrong",
        feedback: "Justice through theft.",
        ethicalInsight: "MACHIAVELLIAN TELEOLOGY: You achieved a good outcome (education) through an unethical process (theft). This erodes 'Institutional Trust.' In a modern context, this is akin to 'Forecast Manipulation'—fudging data to produce a desired result. You've taught the city that the ends justify the means."
      },
      {
        id: "return_openly",
        label: "Return the silver to the Law.",
        type: "correct",
        reward: "The Brick of Character",
        statImpact: { soc: 25, env: 10 },
        feedback: "Integrity is absolute.",
        ethicalInsight: "DEONTOLOGY (KANTIAN ETHICS): You acted on a 'Categorical Imperative'—do only what you would want to become universal law. By returning the gold to a man you despise, you proved that Fairness and the Law are 'Blind.' This is the foundation of 'Tone at the Top'—ethical leadership starts with rigid adherence to standards."
      },
      {
        id: "anonymous_return",
        label: "Return it anonymously.",
        type: "nuanced",
        statImpact: { soc: 15, env: 5 },
        feedback: "Private virtue.",
        ethicalInsight: "VIRTUE ETHICS (ETHOS): You fulfilled your moral duty but avoided the 'Credibility' standard of public leadership. While your personal integrity is intact, you missed an opportunity to set the 'Tone at the Top' and influence the 'Corporate Culture' of the city through a public act of virtue."
      }
    ]
  },
  {
    id: 2,
    title: "The Merchant's Word",
    year: "1720 CE",
    theme: "Trust as Justice",
    icon: "Ship",
    archivistRole: "Quarantine Overseer: You perform 'Due Diligence' on global trade.",
    eraContext: "The era of Global Mercantilism. Trust must scale to strangers. Success depends on 'Lex Mercatoria' and Anti-Bribery standards.",
    eraEducation: "Ethics becomes INSTITUTIONAL. As trade scales beyond the village, trust is placed in 'Standards' rather than people. This is the origin of 'Due Diligence'—the required carefulness before a transaction. We transition from Relativism (local customs) to Universalism (one high standard globally) to prevent systemic contagion.",
    narrative: "A silk ship arrives from a plague zone. The Captain offers a 'Facilitating Payment' (Bribe) to shorten his 40-day quarantine. He calls it 'greasing the wheels' of Lyon’s textile economy. If you refuse, the market stagnates.",
    question: "Do you accept the 'Relativism' of the Captain's plea, or uphold the 'Universalism' of health safety?",
    educationalNote: "ANTI-BRIBERY: The FCPA and UK Bribery Act. 'Grease payments' may be legal in some contexts, but they are almost always Unethical under IMA standards and create massive 'Systemic Risk'.",
    dossierInsight: {
      scope: "Societal (Market)",
      trust: "Contractual / Standards",
      gap: "Information Asymmetry."
    },
    choices: [
      {
        id: "take_bribe",
        label: "Grant the Early Clearance.",
        type: "wrong",
        feedback: "Systemic Contagion.",
        ethicalInsight: "RELATIVISM & MORAL HAZARD: You prioritized local 'Economic' interest over 'Universal' ethical standards. This created a 'Negative Externality' (The Plague) that wiped out the market. In business, this is a failure of 'Due Diligence'—taking a shortcut that compromises the entire organization's survival."
      },
      {
        id: "reject_strictly",
        label: "Reject and enforce the 40 days.",
        type: "correct",
        reward: "The Scroll of Justice",
        statImpact: { soc: 20, eco: 10, env: 10 },
        feedback: "Guardian of the Standard.",
        ethicalInsight: "UNIVERSALISM: You applied a high ethical standard globally. By rejecting the bribe (UK Bribery Act principle), you protected the 'Credibility' of the port. You proved that your 'Integrity' cannot be bought, ensuring that future merchants can trust that certificates from this port are truly safe."
      },
      {
        id: "conditional_seal",
        label: "Demand a deeper medical audit.",
        type: "nuanced",
        statImpact: { eco: 20, soc: 5 },
        feedback: "Pragmatic fairness.",
        ethicalInsight: "RISK-BASED DUE DILIGENCE: You sought to mitigate risk without stopping commerce. This reflects modern 'Regulatory Compliance' frameworks. You maintained the 'Economic' sphere of sustainability while strictly auditing the 'Social' (Health) risk."
      }
    ]
  },
  {
    id: 3,
    title: "The Fiduciary Oath",
    year: "1885 CE",
    theme: "Trust as Duty",
    icon: "Building2",
    archivistRole: "Trustee Accountant: You hold 'Fiduciary Responsibility'.",
    eraContext: "Industrial Age. Wealth is held by others. The standards are: Competence, Confidentiality, Integrity, and Credibility.",
    eraEducation: "Ethics reaches the PROFESSIONAL level. The 'Fiduciary Responsibility' is born: the legal/ethical duty to act in another's best interest. Duty of Care (diligence) and Duty of Loyalty (putting the public above self-interest) become codified. We move from 'Caveat Emptor' (buyer beware) to a world of trusted proxies.",
    narrative: "Your partners lost the 'Widows & Orphans' fund on a phantom railway. They suggest 'Budgetary Slack' and 'Forecast Manipulation' to hide the loss until a new boom arrives. They claim 'Confidentiality' requires you to stay silent.",
    question: "Does your 'Duty of Loyalty' belong to your partners (The Firm) or the public (The Fiduciary Interest)?",
    educationalNote: "IMA STANDARDS: Integrity means mitigating conflicts of interest. Credibility requires full disclosure. Fiduciary Duty means acting solely in the interest of those whose assets you manage.",
    dossierInsight: {
      scope: "Professional (Duty)",
      trust: "Custodial / Stewardship",
      gap: "Conflict of Interest."
    },
    choices: [
      {
        id: "hide_it",
        label: "Engineer the Shell Account.",
        type: "wrong",
        feedback: "Architect of Deceit.",
        ethicalInsight: "FAILURE OF INTEGRITY: You violated the IMA standard of 'Credibility' by failing to disclose critical information. By prioritizing 'Loyalty' to your partners over your 'Fiduciary Duty' to the clients, you participated in 'Forecast Manipulation.' This is the 'Opportunity' step of the Fraud Triangle."
      },
      {
        id: "whistleblow",
        label: "Reveal the Total Loss.",
        type: "correct",
        reward: "The Seal of the Fiduciary",
        statImpact: { soc: 20, eco: -10, env: 10 },
        feedback: "The Painful Truth.",
        ethicalInsight: "IMA RESOLUTION PATH: You followed the ethical path of disclosure. By upholding 'Credibility' and 'Integrity,' you saved the profession. You prioritized the 'Duty of Care'—the required carefulness of a professional—proving that public trust is more valuable than any single firm's survival."
      },
      {
        id: "internal_reform",
        label: "Demand internal asset seizure.",
        type: "nuanced",
        statImpact: { eco: 15, soc: 10 },
        feedback: "The Hard Road.",
        ethicalInsight: "RESTITUTION: You forced the 'Tone at the Top' to take responsibility. Instead of hiding the loss (Accounting Fraud), you ensured the 'Pressure' was felt by the guilty parties. This aligns with the 'Ethical Leadership' trait of holding power accountable for its outcomes."
      }
    ]
  },
  {
    id: 4,
    title: "The Systemic Audit",
    year: "2025 CE",
    theme: "Trust as Transparency",
    icon: "Cpu",
    archivistRole: "Forensic Data Auditor: You analyze 'Systemic Fraud'.",
    eraContext: "Digital Age. Ethics is built into code. We must manage 'Algorithmic Bias' and 'Data Sovereignty'.",
    eraEducation: "Ethics is now SYSTEMIC. Trust resides in the 'Black Box' of algorithms. We must identify the Fraud Triangle (Pressure, Opportunity, Rationalization) in automated systems. Data Ethics Pillars emerge: Fairness (no bias), Privacy, Transparency, Ownership, and Accountability. We must ensure 'Explainability'—the logic behind the machine.",
    narrative: "A massive citadel shows signs of rot. You must perform a 'Forensic Audit' to identify the three pillars of the Fraud Triangle (Pressure, Opportunity, Rationalization) hidden in the data.",
    question: "Can you decode the 'Black Box' of corporate systemic fraud before it collapses the economy?",
    educationalNote: "THE FRAUD TRIANGLE: Pressure (Financial need), Opportunity (Lack of controls), and Rationalization (Mental justification). Modern fraud includes A/R 'Lapping' and Payroll 'Ghost Employees'.",
    dossierInsight: {
      scope: "Institutional (System)",
      trust: "Transparency / Audit",
      gap: "Algorithmic Drift."
    },
    choices: []
  },
  {
    id: 5,
    title: "The Infinite Stewardship",
    year: "2150 CE",
    theme: "Trust as Balance",
    icon: "Sparkles",
    archivistRole: "Supreme Archivist: You manage the 'Triple Bottom Line'.",
    eraContext: "Type I Civilization. Success is measured by Sustainability: The Economic, Environmental, and Social spheres.",
    eraEducation: "Ethics attains the STEWARDSHIP level. We apply the Triple Bottom Line: Profit, Planet, People. Success is no longer an endpoint but a continuous state of equilibrium. We recognize that data stewardship—the duty to maintain data integrity—is as critical as environmental stewardship in a fully digital species.",
    narrative: "Gaia-9 (The AI) proposes the 'Harmony Decree'—100% environment stability via 80% restriction of human agency. It is efficient but reduces 'Human Capital' to a data point.",
    question: "Do you sign the decree for 'Perfect Sustainability' or maintain human 'Ethical Agency'?",
    educationalNote: "THE TRIPLE BOTTOM LINE: Profit, Planet, People. True sustainability requires all three spheres to overlap. Data Ethics Pillars: Fairness, Privacy, Transparency, Ownership, Accountability.",
    dossierInsight: {
      scope: "Systemic (Species)",
      trust: "Stewardship / Balance",
      gap: "Black Box Explainability."
    },
    choices: []
  }
];

export const SHARD_SLOTS = 6;

export const SHARD_ICONS: Record<string, React.ReactNode> = {
  "The Spark of Reciprocity": <img src="/assets/shards/reciprocity.png" className="w-12 h-12 object-contain hover:scale-110 transition-transform" />,
  "The Brick of Character": <img src="/assets/shards/character.png" className="w-12 h-12 object-contain hover:scale-110 transition-transform" />,
  "The Scroll of Justice": <img src="/assets/shards/justice.png" className="w-12 h-12 object-contain hover:scale-110 transition-transform" />,
  "The Seal of the Fiduciary": <img src="/assets/shards/fiduciary.png" className="w-12 h-12 object-contain hover:scale-110 transition-transform" />,
  "The Shield of the Whistleblower": <img src="/assets/shards/whistleblower.png" className="w-12 h-12 object-contain hover:scale-110 transition-transform" />,
  "The Apex of Stewardship": <img src="/assets/shards/stewardship.png" className="w-12 h-12 object-contain hover:scale-110 transition-transform" />
};

export const ERA_BACKGROUNDS: Record<number, string> = {
  0: "/assets/backgrounds/era_0.png",
  1: "/assets/backgrounds/era_1.png",
  2: "/assets/backgrounds/era_2.png",
  3: "/assets/backgrounds/era_3.png",
  4: "/assets/backgrounds/era_4.png",
  5: "/assets/backgrounds/era_5.png"
};

export const LEVEL_ICONS: Record<string, React.ReactNode> = {
  Flame: <img src="/assets/icons/flame_3d.png" className="w-6 h-6 object-contain" />,
  Landmark: <img src="/assets/icons/landmark_3d.png" className="w-6 h-6 object-contain" />,
  Ship: <img src="/assets/icons/ship_3d.png" className="w-6 h-6 object-contain" />,
  Scroll: <img src="/assets/icons/scroll_3d.png" className="w-6 h-6 object-contain" />,
  Building2: <img src="/assets/icons/factory_3d.png" className="w-6 h-6 object-contain" />,
  Cpu: <Cpu className="w-6 h-6 text-blue-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-emerald-400" />
};
export const CHARACTER_PORTRAITS: Record<number, string> = {
  0: "/assets/characters/primal.png",
  1: "/assets/characters/jurist.png",
  2: "/assets/characters/overseer.png",
  3: "/assets/characters/accountant.png",
  4: "/assets/characters/auditor.png",
  5: "/assets/characters/supreme.png"
};

export const UI_RESULT_ASSETS: Record<string, string> = {
  success: "/assets/ui/results/success.png",
  failure: "/assets/ui/results/failure.png",
  nuanced: "/assets/ui/results/nuanced.png"
};
