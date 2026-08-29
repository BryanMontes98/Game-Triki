
import "./GameBoard.css";
import { useState } from "react";

const initialGameBoard = [];

for ( let index = 0; index <= 2; index++ ) initialGameBoard.push( Array(3).fill(null) );

export default function GameBoard({ onSelectedSquare, activePlayerSymbol }) {

    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleClickSquare(rowIndex, colIndex) {
          setGameBoard( (prevGameBoard)=> {
            const newGameBoard = prevGameBoard.map( (row)=> [...row] )
            newGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return newGameBoard;
          })

          onSelectedSquare();
    }

  return (
    <>
      <ol className="game-board-container">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol className="game-board-col">
              {row.map((col, colIndex) => (
                <li key={colIndex}>
                  <button onClick={ ()=> { if(gameBoard[rowIndex][colIndex] === null) handleClickSquare(rowIndex, colIndex) } }>{ col }</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
