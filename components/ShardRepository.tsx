
import React from 'react';
import { useGame } from '../GameContext';
import { SHARD_SLOTS, SHARD_ICONS } from '../constants';

const ShardRepository: React.FC = () => {
  const { collectedShards } = useGame();

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {Array.from({ length: SHARD_SLOTS }).map((_, i) => {
        const shardName = collectedShards[i];
        return (
          <div
            key={i}
            className={`aspect-square rounded-lg border flex items-center justify-center transition-all duration-500
              ${shardName
                ? 'bg-emerald-500/10 border-emerald-500/50 shadow-inner shadow-emerald-500/20'
                : 'bg-slate-900/60 border-slate-800'
              }`}
          >
            {shardName ? (
              <img
                src={(SHARD_ICONS[shardName] as any).props.src}
                alt={shardName}
                title={shardName}
                className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
              />
            ) : (
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ShardRepository;
