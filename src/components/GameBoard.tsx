import React from 'react';
import { motion } from 'framer-motion';
import { GameCell } from './GameCell';
import { Player } from '../types/game';

interface GameBoardProps {
  board: (Player | null)[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  isGameOver: boolean;
}

export function GameBoard({ board, onCellClick, winningLine, isGameOver }: GameBoardProps) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-3 p-6 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          index={index}
          onClick={() => onCellClick(index)}
          isWinning={winningLine?.includes(index) || false}
          isDisabled={isGameOver || cell !== null}
        />
      ))}
    </motion.div>
  );
}