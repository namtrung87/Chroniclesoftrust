import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react';
import { GameState, Balance, PlayerDecision } from './types';
import { playEthicalSound } from './audioUtils';

interface GameContextType extends GameState {
  setCurrentLevel: (level: number) => void;
  updateBalance: (change: Partial<Balance>) => void;
  addShard: (shard: string) => void;
  recordDecision: (decision: PlayerDecision) => void;
  triggerGlitch: (mode: 'transition' | 'error' | 'success') => void;
  resetGame: () => void;
  showSaveToast: boolean;
  toastMessage: string;
  toastType: 'save' | 'load';
}

const STORAGE_KEY = 'ethical_archivist_v2_storage';

const initialState: GameState = {
  currentLevel: 0,
  balance: { eco: 100, soc: 0, env: 10 },
  collectedShards: [],
  history: [],
  isGlitching: false,
  glitchMode: 'transition',
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('ARCHIVE_SYNCED');
  const [toastType, setToastType] = useState<'save' | 'load'>('save');
  const isFirstMount = useRef(true);

  // Persistence Logic: Load from LocalStorage
  const getStoredState = (): GameState => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...JSON.parse(saved), isGlitching: false };
      }
    } catch (e) {
      console.error("Timeline Restore Error", e);
    }
    return initialState;
  };

  const [state, setState] = useState<GameState>(getStoredState);

  // Lifecycle: Display restore toast on startup
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setToastMessage('TIMELINE_RESTORED');
      setToastType('load');
      setShowSaveToast(true);
      const timer = setTimeout(() => setShowSaveToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Lifecycle: Auto-save state changes with stabilization check
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    
    // Stabilize the save: only save if parameters actually shifted
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentLevel: state.currentLevel,
        balance: state.balance,
        collectedShards: state.collectedShards,
        history: state.history
      }));
      
      setToastMessage('TIMELINE_SAVED');
      setToastType('save');
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2000);
    }, 1000); // 1s debounce to prevent rapid-fire writes during fast transitions
    
    return () => clearTimeout(timer);
  }, [state.currentLevel, state.balance, state.collectedShards, state.history]);

  /**
   * Action: Triggers a visual glitch and audio feedback.
   */
  const triggerGlitch = useCallback((mode: 'transition' | 'error' | 'success') => {
    playEthicalSound(mode);
    setState(prev => ({ ...prev, isGlitching: true, glitchMode: mode }));
    setTimeout(() => setState(prev => ({ ...prev, isGlitching: false })), 250);
  }, []);

  /**
   * Action: Change the current game era.
   */
  const setCurrentLevel = useCallback((level: number) => {
    triggerGlitch('transition');
    // Delay level change slightly to allow transition effect to start
    setTimeout(() => setState(prev => ({ ...prev, currentLevel: level })), 100);
  }, [triggerGlitch]);

  /**
   * Action: Update the Triple Bottom Line balance.
   */
  const updateBalance = useCallback((change: Partial<Balance>) => {
    setState(prev => ({
      ...prev,
      balance: {
        eco: Math.min(100, Math.max(0, prev.balance.eco + (change.eco || 0))),
        soc: Math.min(100, Math.max(0, prev.balance.soc + (change.soc || 0))),
        env: Math.min(100, Math.max(0, prev.balance.env + (change.env || 0))),
      }
    }));
  }, []);

  /**
   * Action: Add an ethical shard to the repository.
   */
  const addShard = useCallback((shard: string) => {
    setState(prev => ({
      ...prev,
      collectedShards: prev.collectedShards.includes(shard) ? prev.collectedShards : [...prev.collectedShards, shard]
    }));
  }, []);

  /**
   * Action: Log a decision in the history.
   */
  const recordDecision = useCallback((decision: PlayerDecision) => {
    setState(prev => ({ ...prev, history: [...prev.history, decision] }));
  }, []);

  /**
   * Action: Wipe local archive and restart.
   */
  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  }, []);

  return (
    <GameContext.Provider value={{
      ...state, 
      setCurrentLevel, 
      updateBalance, 
      addShard, 
      recordDecision, 
      triggerGlitch, 
      resetGame,
      showSaveToast, 
      toastMessage, 
      toastType
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
