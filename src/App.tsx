import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

type Player = 'X' | 'O';
type Board = (Player | null)[];

function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (boardState: Board): Player | 'Draw' | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a] as Player;
      }
    }
    return boardState.every(cell => cell !== null) ? 'Draw' : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner !== 'Draw') {
        setScores(prev => ({
          ...prev,
          [gameWinner]: prev[gameWinner] + 1
        }));
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-indigo-600">Player X</div>
              <div className="flex items-center gap-1">
                <Trophy size={16} className="text-yellow-500" />
                <span>{scores.X}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">Player O</div>
              <div className="flex items-center gap-1">
                <Trophy size={16} className="text-yellow-500" />
                <span>{scores.O}</span>
              </div>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Reset Game"
          >
            <RotateCcw size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !!winner}
              className={`h-24 rounded-lg text-4xl font-bold transition-all duration-200 ${
                cell ? 'bg-gray-100' : 'hover:bg-gray-50'
              } ${
                cell === 'X' ? 'text-indigo-600' : 'text-purple-600'
              } disabled:cursor-not-allowed`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="text-center">
          {winner ? (
            <div className="text-2xl font-bold">
              {winner === 'Draw' ? (
                <span className="text-gray-700">It's a Draw!</span>
              ) : (
                <span className={winner === 'X' ? 'text-indigo-600' : 'text-purple-600'}>
                  Player {winner} Wins!
                </span>
              )}
            </div>
          ) : (
            <div className="text-xl">
              Current Player:{' '}
              <span className={currentPlayer === 'X' ? 'text-indigo-600' : 'text-purple-600'}>
                {currentPlayer}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;