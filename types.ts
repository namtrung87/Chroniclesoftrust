
export interface Balance {
  eco: number;
  soc: number;
  env: number;
}

export interface PlayerDecision {
  levelId: number;
  choiceId: string;
  timestamp: number;
}

export interface ScenarioChoice {
  id: string;
  label: string;
  type: 'correct' | 'wrong' | 'nuanced';
  statImpact?: Partial<Balance>;
  reward?: string;
  feedback: string;
  ethicalInsight?: string; // New field for educational/philosophical depth
}

export interface ScenarioInsight {
  scope: string;
  trust: string;
  gap: string;
}

export interface Scenario {
  id: number;
  title: string;
  year: string;
  theme: string;
  icon: string;
  eraContext: string;
  eraEducation: string; // Detailed developmental context for loading screens
  archivistRole: string;
  narrative: string;
  question: string;
  choices: ScenarioChoice[];
  educationalNote?: string;
  imageUrl?: string;
  dossierInsight?: ScenarioInsight;
}

export interface GameState {
  currentLevel: number;
  balance: Balance;
  collectedShards: string[];
  history: PlayerDecision[];
  isGlitching: boolean;
  glitchMode: 'transition' | 'error' | 'success';
}
