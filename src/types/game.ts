export type Player = 'X' | 'O';

export interface GameState {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  winningLine: number[] | null;
}