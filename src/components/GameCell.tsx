import React from 'react';
import { motion } from 'framer-motion';
import { X, Circle } from 'lucide-react';
import { Player } from '../types/game';

interface GameCellProps {
  value: Player | null;
  index: number;
  onClick: () => void;
  isWinning: boolean;
  isDisabled: boolean;
}

export function GameCell({ value, onClick, isWinning, isDisabled }: GameCellProps) {
  return (
    <motion.button
      className={`
        w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 
        rounded-xl border-2 
        flex items-center justify-center
        transition-all duration-300
        backdrop-blur-sm
        ${isWinning 
          ? 'bg-gradient-to-br from-green-400/30 to-green-600/30 border-green-400 shadow-lg shadow-green-400/25' 
          : 'bg-white/5 dark:bg-black/10 border-white/20 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/5'
        }
        ${!isDisabled && !value ? 'hover:border-white/40 dark:hover:border-white/20 hover:shadow-lg hover:scale-105' : ''}
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={onClick}
      disabled={isDisabled}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      whileHover={!isDisabled && !value ? { scale: 1.05 } : {}}
    >
      {value && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {value === 'X' ? (
            <X 
              size={32} 
              className="text-red-500 dark:text-red-400 stroke-[3]" 
            />
          ) : (
            <Circle 
              size={32} 
              className="text-blue-500 dark:text-blue-400 stroke-[3]" 
            />
          )}
        </motion.div>
      )}
    </motion.button>
  );
}