import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { GameBoard } from './GameBoard';
import { GameStatus } from './GameStatus';
import { Player } from '../types/game';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function TicTacToe() {
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const checkWinner = useCallback((newBoard: (Player | null)[]) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        setWinningLine(combination);
        return newBoard[a];
      }
    }

    if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
      return 'draw';
    }

    return null;
  }, []);

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (!gameResult) {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }, [board, currentPlayer, winner, isDraw, checkWinner]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
  }, []);

  const isGameOver = winner !== null || isDraw;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        className="text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
          Tic Tac Toe By Fauzeya
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Modern • Animated • Beautiful
        </p>
      </motion.div>

      <GameStatus
        winner={winner}
        currentPlayer={currentPlayer}
        isDraw={isDraw}
      />

      <GameBoard
        board={board}
        onCellClick={handleCellClick}
        winningLine={winningLine}
      />

      {isGameOver && (
        <motion.button
          onClick={resetGame}
          className="mt-6 flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={20} />
          Restart Game
        </motion.button>
      )}
    </div>
  );
}
