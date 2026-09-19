import "./GameBoard.css";
import { useState } from "react";

const initialGameBoard = [];

for (let index = 0; index <= 2; index++)
  initialGameBoard.push(Array(3).fill(null));

export default function GameBoard({ onSelectedSquare, gameTurns }) {

  const gameBoard = [...initialGameBoard.map( (array)=> [...array] )];

  function IsWinnerSquare(rowIndex, colIndex) {
    if (gameTurns.length > 4 && gameTurns[0].hasWinner) {
      return gameTurns[0].hasWinner.winningCombination.some(
        (combination) =>
          combination.row === rowIndex && combination.column === colIndex,
      );
    }
  }
  
  for (const turn of gameTurns) {
    const { square, symbol = turn } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = symbol;
  }

  return (
    <>
      <ol className="game-board-container">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol className="game-board-col">
              {row.map((col, colIndex) => (
                <li key={colIndex}>
                  <button
                    className={
                      IsWinnerSquare(rowIndex, colIndex) ? "winningSquare" : ""
                    }
                    onClick={() => {
                      if (gameTurns.length > 4 && gameTurns[0].hasWinner) return false;
                      if (gameBoard[rowIndex][colIndex] === null)
                        onSelectedSquare(rowIndex, colIndex, gameBoard);
                    }}
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
