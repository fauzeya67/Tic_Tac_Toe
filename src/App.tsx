import React from 'react';
import { TicTacToe } from './components/TicTacToe';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-all duration-500">
        <ThemeToggle />
        <TicTacToe />
      </div>
    </ThemeProvider>
  );
}

export default App;