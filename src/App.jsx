import "./App.css";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import LogTurns from "./components/LogTurns/LogTurns.jsx";
import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");
  const [playerNames, setPlayerNames] = useState({
    name1: "Jugador 1",
    name2: "Jugador 2",
  });

  function ChangeNamePlayerField(event, playerKey) {
    setPlayerNames( (...prevPlayerNames)=> {
      const prevsPlayerNames = {...prevPlayerNames};
      const otherkey = playerKey === 'name1' ? 'name2' : 'name1';
      const newPlayerNames = {
        [playerKey] : event.target.value,
        [otherkey] : prevsPlayerNames[0][otherkey]
      }

      return newPlayerNames;

    });
  }

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
              namePlayer={playerNames.name1}
              onChangeName={ChangeNamePlayerField}
              keyName='name1'
              playerSymbol="X"
              isActive={activePlayer == "X"}
            />
            <Player
              namePlayer={playerNames.name2}
              onChangeName={ChangeNamePlayerField}
              keyName='name2'
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
      <LogTurns gameTurns={gameTurns} playerNames={playerNames} />
    </>
  );
}

export default App;
