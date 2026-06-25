import React, { useState, useCallback } from 'react';
import './App.css';

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_COMBOS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${value ? value.toLowerCase() : ''} ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, onClick, winningLine }) {
  return (
    <div className="board">
      {squares.map((val, i) => (
        <Square
          key={i}
          value={val}
          onClick={() => onClick(i)}
          isWinning={winningLine && winningLine.includes(i)}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });

  const current = history[step];
  const result = calculateWinner(current);
  const isDraw = !result && current.every(Boolean);

  const xIsNext = step % 2 === 0;

  const handleClick = useCallback((i) => {
    if (result || current[i]) return;
    const newSquares = current.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    const newHistory = history.slice(0, step + 1).concat([newSquares]);
    setHistory(newHistory);
    const newStep = step + 1;
    setStep(newStep);

    const newResult = calculateWinner(newSquares);
    const newIsDraw = !newResult && newSquares.every(Boolean);
    if (newResult) {
      setScores(s => ({ ...s, [newResult.winner]: s[newResult.winner] + 1 }));
    } else if (newIsDraw) {
      setScores(s => ({ ...s, Draw: s.Draw + 1 }));
    }
  }, [current, history, step, xIsNext, result]);

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStep(0);
  };

  const resetAll = () => {
    setHistory([Array(9).fill(null)]);
    setStep(0);
    setScores({ X: 0, O: 0, Draw: 0 });
  };

  let status;
  if (result) {
    status = `Player ${result.winner} wins!`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Player ${xIsNext ? 'X' : 'O'}'s turn`;
  }

  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="scoreboard">
        <div className="score-item x-score">
          <span className="score-label">X</span>
          <span className="score-value">{scores.X}</span>
        </div>
        <div className="score-item draw-score">
          <span className="score-label">Draw</span>
          <span className="score-value">{scores.Draw}</span>
        </div>
        <div className="score-item o-score">
          <span className="score-label">O</span>
          <span className="score-value">{scores.O}</span>
        </div>
      </div>

      <div className={`status ${result ? 'winner-status' : isDraw ? 'draw-status' : ''}`}>
        {status}
      </div>

      <Board
        squares={current}
        onClick={handleClick}
        winningLine={result ? result.line : null}
      />

      <div className="buttons">
        <button className="btn btn-primary" onClick={resetGame}>
          New Game
        </button>
        <button className="btn btn-secondary" onClick={resetAll}>
          Reset Scores
        </button>
      </div>

      {history.length > 1 && (
        <div className="history">
          <h3>Move History</h3>
          <div className="move-list">
            {history.map((_, move) => (
              <button
                key={move}
                className={`move-btn ${move === step ? 'active' : ''}`}
                onClick={() => setStep(move)}
              >
                {move === 0 ? 'Start' : `Move #${move}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
