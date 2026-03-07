
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react';
import { GameState, Balance, PlayerDecision } from './types';

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
  balance: { eco: 100, soc: 0, env: 0 },
  collectedShards: [],
  history: [],
  isGlitching: false,
  glitchMode: 'transition',
};

const playEthicalSound = (type: 'transition' | 'error' | 'success') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'success') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
    } else {
      osc.frequency.setValueAtTime(200, ctx.currentTime);
    }
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('ARCHIVE_SYNCED');
  const [toastType, setToastType] = useState<'save' | 'load'>('save');
  const isFirstMount = useRef(true);

  const getStoredState = (): GameState => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...JSON.parse(saved), isGlitching: false };
      }
    } catch (e) {
      console.error("Archive Load Error", e);
    }
    return initialState;
  };

  const [state, setState] = useState<GameState>(getStoredState);

  // Trigger load toast on mount
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

  // Auto-save on state change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const saveToDisk = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentLevel: state.currentLevel,
        balance: state.balance,
        collectedShards: state.collectedShards,
        history: state.history
      }));
      setToastMessage('TIMELINE_SAVED');
      setToastType('save');
      setShowSaveToast(true);
      const timer = setTimeout(() => setShowSaveToast(false), 2000);
      return () => clearTimeout(timer);
    };
    saveToDisk();
  }, [state.currentLevel, state.balance, state.collectedShards, state.history]);

  const triggerGlitch = useCallback((mode: 'transition' | 'error' | 'success') => {
    playEthicalSound(mode);
    setState(prev => ({ ...prev, isGlitching: true, glitchMode: mode }));
    setTimeout(() => setState(prev => ({ ...prev, isGlitching: false })), 400);
  }, []);

  const setCurrentLevel = useCallback((level: number) => {
    triggerGlitch('transition');
    setTimeout(() => setState(prev => ({ ...prev, currentLevel: level })), 150);
  }, [triggerGlitch]);

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

  const addShard = useCallback((shard: string) => {
    setState(prev => ({
      ...prev,
      collectedShards: prev.collectedShards.includes(shard) ? prev.collectedShards : [...prev.collectedShards, shard]
    }));
  }, []);

  const recordDecision = useCallback((decision: PlayerDecision) => {
    setState(prev => ({ ...prev, history: [...prev.history, decision] }));
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  }, []);

  return (
    <GameContext.Provider value={{
      ...state, setCurrentLevel, updateBalance, addShard, recordDecision, triggerGlitch, resetGame,
      showSaveToast, toastMessage, toastType
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
