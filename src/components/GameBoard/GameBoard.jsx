
import "./GameBoard.css";
import { useState } from "react";

const initialGameBoard = [];

for ( let index = 0; index <= 2; index++ ) initialGameBoard.push( Array(3).fill(null) );

export default function GameBoard({ onSelectedSquare, gameTurns }) {

    const gameBoard = initialGameBoard;
    for (const turn of gameTurns) {
      const {square, symbol = turn} = turn;
      const {rowIndex, colIndex} = square;
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
                  <button onClick={ ()=> { if(gameBoard[rowIndex][colIndex] === null) onSelectedSquare(rowIndex, colIndex) } }>{ col }</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
