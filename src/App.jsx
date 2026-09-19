import "./App.css";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import LogTurns from "./components/LogTurns/LogTurns.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./data/winningCombination.js";

function App() {
  function setActivePlayer(gameTurns) {
    let activePlayer = "X";
    activePlayer =
      gameTurns.length > 0 && gameTurns[0].symbol == "X" ? "O" : "X";
    if (gameTurns.length > 4 && gameTurns[0].hasWinner)
      activePlayer = gameTurns[0].symbol;
    return activePlayer;
  }

  function setHasWinner(prevGameTurns, newGameBoard) {
    if (prevGameTurns.length < 4) return false;

    if (prevGameTurns.length >= 4) {
      for (const combination of WINNING_COMBINATIONS) {
        let symbolsWinner = {
          firstSymbol: newGameBoard[combination[0].row][combination[0].column],
          secondSymbol: newGameBoard[combination[1].row][combination[1].column],
          thirdSymbol: newGameBoard[combination[2].row][combination[2].column],
        };
        if (
          symbolsWinner.firstSymbol !== null &&
          symbolsWinner.firstSymbol === symbolsWinner.secondSymbol &&
          symbolsWinner.secondSymbol === symbolsWinner.thirdSymbol
        ) {
          return { isWinner: true, winningCombination: combination };
        }
      }

      return false;
    }
  }

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = setActivePlayer(gameTurns);
  const [playerNames, setPlayerNames] = useState({
    name1: "Jugador 1",
    name2: "Jugador 2",
  });

  function ChangeNamePlayerField(event, playerKey) {
    setPlayerNames((...prevPlayerNames) => {
      const prevsPlayerNames = { ...prevPlayerNames };
      const otherkey = playerKey === "name1" ? "name2" : "name1";
      const newPlayerNames = {
        [playerKey]: event.target.value,
        [otherkey]: prevsPlayerNames[0][otherkey],
      };

      return newPlayerNames;
    });
  }

  function handleSelectedSquare(rowIndex, colIndex, gameBoard) {
    setGameTurns((prevGameTurns) => {
      const actualSymbol = setActivePlayer(prevGameTurns);
      let newGameBoard = [...gameBoard];
      newGameBoard[rowIndex][colIndex] = actualSymbol;
      const hasWinner = setHasWinner(prevGameTurns, gameBoard);

      const actualGameTurn = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          symbol: actualSymbol,
          hasWinner: hasWinner,
        },
        ...prevGameTurns,
      ];

      return actualGameTurn;
    });
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  return (
    <>
      <main>
        <div className="game-area">
          <div className="players-container">
            <ol className="players">
              <Player
                namePlayer={playerNames.name1}
                onChangeName={ChangeNamePlayerField}
                keyName="name1"
                playerSymbol="X"
                isActive={activePlayer == "X"}
              />
              <Player
                namePlayer={playerNames.name2}
                onChangeName={ChangeNamePlayerField}
                keyName="name2"
                playerSymbol="O"
                isActive={activePlayer == "O"}
              />
            </ol>
          </div>
          <GameBoard
            onSelectedSquare={handleSelectedSquare}
            gameTurns={gameTurns}
          />
          { (gameTurns.length > 8 && !gameTurns[0].hasWinner) && <GameOver text='¡Otra Partida!' handleRestartGame={handleRestartGame} /> }
          { (gameTurns.length > 4 && gameTurns[0].hasWinner) && <GameOver text='¡Revancha!' handleRestartGame={handleRestartGame} /> }
        </div>
      </main>
      <LogTurns gameTurns={gameTurns} playerNames={playerNames} />
    </>
  );
}

export default App;
