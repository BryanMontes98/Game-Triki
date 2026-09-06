import "./App.css";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import LogTurns from "./components/LogTurns/LogTurns.jsx";
import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectedSquare(rowIndex, colIndex) {
    setActivePlayer((lastActivePlayer) =>
      lastActivePlayer === "X" ? "O" : "X",
    );
    setGameTurns((prevGameTurns) => {
      let actualSymbol = "X";
      if (gameTurns.length > 0 && gameTurns[0].symbol === "X")
        actualSymbol = "O";
      const actualGameTurn = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          symbol: actualSymbol,
        },
        ...prevGameTurns,
      ];

      return actualGameTurn;
    });
  }

  return (
    <>
      <main>
        <div className="players-container">
          <ol className="players">
            <Player
              initialPlayerName="Jugador 1"
              playerSymbol="X"
              isActive={activePlayer == "X"}
            />
            <Player
              initialPlayerName="Jugador 2"
              playerSymbol="O"
              isActive={activePlayer == "O"}
            />
          </ol>
        </div>
      </main>
      <GameBoard
        onSelectedSquare={handleSelectedSquare}
        gameTurns={gameTurns}
      />
      <LogTurns gameTurns={gameTurns} />
    </>
  );
}

export default App;
