
import "./GameBoard.css";
import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectPlayer }) {

    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleClickSquare(rowIndex, colIndex) {
          setGameBoard( (prevGameBoard)=> {
            const newGameBoard = prevGameBoard.map( (cols)=> [...cols] )
            newGameBoard[rowIndex][colIndex] = "X";
            return newGameBoard;
          })

          onSelectPlayer();
    }

  return (
    <>
      <ol className="game-board-container">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol className="game-board-col">
              {row.map((col, colIndex) => (
                <li key={colIndex}>
                  <button onClick={ ()=>handleClickSquare(rowIndex, colIndex) }>{ col }</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
