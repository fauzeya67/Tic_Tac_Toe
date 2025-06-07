import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users } from 'lucide-react';
import { Player } from '../types/game';

interface GameStatusProps {
  winner: Player | null;
  isDraw: boolean;
  currentPlayer: Player;
  isGameOver: boolean;
}

export function GameStatus({ winner, isDraw, currentPlayer, isGameOver }: GameStatusProps) {
  const getStatusMessage = () => {
    if (winner) {
      return `Player ${winner} Wins!`;
    }
    if (isDraw) {
      return "It's a Draw!";
    }
    return `Player ${currentPlayer}'s Turn`;
  };

  const getStatusIcon = () => {
    if (winner || isDraw) {
      return <Trophy className="w-6 h-6" />;
    }
    return <Users className="w-6 h-6" />;
  };

  const getStatusColor = () => {
    if (winner === 'X') return 'text-red-500 dark:text-red-400';
    if (winner === 'O') return 'text-blue-500 dark:text-blue-400';
    if (isDraw) return 'text-yellow-500 dark:text-yellow-400';
    if (currentPlayer === 'X') return 'text-red-500 dark:text-red-400';
    return 'text-blue-500 dark:text-blue-400';
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-3 text-2xl font-bold mb-8"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      key={getStatusMessage()}
    >
      <motion.div
        className={getStatusColor()}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {getStatusIcon()}
      </motion.div>
      <motion.span
        className={`${getStatusColor()} ${isGameOver ? 'animate-pulse' : ''}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {getStatusMessage()}
      </motion.span>
    </motion.div>
  );
}