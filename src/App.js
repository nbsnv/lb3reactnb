import React, { useState, useEffect } from 'react';
import './App.css';

const rows = 4;
const columns = 4;

const Game2048 = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'ArrowLeft':
          slideLeft();
          break;
        case 'ArrowRight':
          slideRight();
          break;
        case 'ArrowUp':
          slideUp();
          break;
        case 'ArrowDown':
          slideDown();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  }, [board, score]);

  const initializeGame = () => {
    let newBoard = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => 0)
    );
    setBoard(newBoard);
    setTwo(newBoard);
    setTwo(newBoard);
  };

  const setTwo = (boardToModify) => {
    if (!hasEmptyTile(boardToModify)) {
      return;
    }

    let found = false;
    while (!found) {
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * columns);
      if (boardToModify[r][c] === 0) {
        boardToModify[r][c] = 2;
        found = true;
      }
    }
    setBoard([...boardToModify]);
  };

  const hasEmptyTile = (boardToCheck) => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (boardToCheck[r][c] === 0) {
          return true;
        }
      }
    }
    return false;
  };

  const filterZero = (row) => row.filter((num) => num !== 0);

  const slide = (row) => {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        setScore((prevScore) => prevScore + row[i]);
      }
    }
    row = filterZero(row);
    while (row.length < columns) {
      row.push(0);
    }
    return row;
  };

  const slideLeft = () => {
    let newBoard = [...board];
    for (let r = 0; r < rows; r++) {
      newBoard[r] = slide(newBoard[r]);
    }
    setBoard(newBoard);
    setTwo(newBoard);
  };

  const slideRight = () => {
    let newBoard = [...board];
    for (let r = 0; r < rows; r++) {
      newBoard[r].reverse();
      newBoard[r] = slide(newBoard[r]);
      newBoard[r].reverse();
    }
    setBoard(newBoard);
    setTwo(newBoard);
  };

  const slideUp = () => {
    let newBoard = [...board];
    for (let c = 0; c < columns; c++) {
      let row = [
        newBoard[0][c],
        newBoard[1][c],
        newBoard[2][c],
        newBoard[3][c],
      ];
      row = slide(row);
      for (let r = 0; r < rows; r++) {
        newBoard[r][c] = row[r];
      }
    }
    setBoard(newBoard);
    setTwo(newBoard);
  };

  const slideDown = () => {
    let newBoard = [...board];
    for (let c = 0; c < columns; c++) {
      let row = [
        newBoard[0][c],
        newBoard[1][c],
        newBoard[2][c],
        newBoard[3][c],
      ];
      row.reverse();
      row = slide(row);
      row.reverse();
      for (let r = 0; r < rows; r++) {
        newBoard[r][c] = row[r];
      }
    }
    setBoard(newBoard);
    setTwo(newBoard);
  };

  return (
    <div className="container">
      <h1>Собери 2048</h1>
      <hr />
      <h2>
        Score: <span>{score}</span>
      </h2>
      <div id="board" className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`tile ${cell > 0 ? `x${cell}` : ''}`}
            >
              {cell > 0 ? cell : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Game2048;
