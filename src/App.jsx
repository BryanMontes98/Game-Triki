import "./App.css";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import LogTurns from "./components/LogTurns/LogTurns.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import BackgroundMusic from "./components/BackgroundMusic/BackgroundMusic.jsx";
import clickSound from "./assets/audio/burbuja.ogg";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./data/winningCombination.js";

function setActivePlayer(gameTurns, playerSymbols) {
  let activePlayer = playerSymbols.symbol1;
  activePlayer =
    gameTurns.length > 0 && gameTurns[0].symbol == playerSymbols.symbol1
      ? playerSymbols.symbol2
      : playerSymbols.symbol1;
  if (gameTurns.length > 4 && gameTurns[0].hasWinner)
    activePlayer = gameTurns[0].symbol;
  return activePlayer;
}

function setHasWinner(prevGameTurns, newGameBoard) {
  if (prevGameTurns.length >= 4) {
    for (const combination of WINNING_COMBINATIONS) {
      const [first, second, third] = combination;

      const [firstSymbol, secondSymbol, thirdSymbol] = [
        newGameBoard[first.row][first.column],
        newGameBoard[second.row][second.column],
        newGameBoard[third.row][third.column],
      ];
      if (
        firstSymbol &&
        firstSymbol === secondSymbol &&
        secondSymbol === thirdSymbol
      ) {
        return { isWinner: true, winningCombination: combination };
      }
    }

    return false;
  }
  return false;
}

function playClickSound() {
  const sound = new Audio(clickSound);
  sound.volume = 1;
  sound.play();
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const [playerNames, setPlayerNames] = useState({
    name1: "Jugador 1",
    name2: "Jugador 2",
  });

  const [playerSymbols, setPlayerSymbols] = useState({
    symbol1: "X",
    symbol2: "O",
  });

  function handleSelectedSquare(rowIndex, colIndex, gameBoard) {
    setGameTurns((prevGameTurns) => {
      const actualSymbol = setActivePlayer(prevGameTurns, playerSymbols);
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

      playClickSound();

      return actualGameTurn;
    });
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  function ChangeNamePlayerField(event, playerKey) {
    setPlayerNames((...prevPlayerNames) => {
      const otherkey = playerKey === "name1" ? "name2" : "name1";
      const newPlayerNames = {
        ...prevPlayerNames,
        [playerKey]: event.target.value,
        [otherkey]: prevPlayerNames[0][otherkey],
      };

      return newPlayerNames;
    });
  }

  function ChangeSymbolPlayerField(event, symbolKey, gameTurnsLength) {
    setPlayerSymbols((...prevPlayerSymbols) => {
      const otherkey = symbolKey === "symbol1" ? "symbol2" : "symbol1";
      const newPlayerSymbols = {
        ...prevPlayerSymbols,
        [symbolKey]: event.target.value,
        [otherkey]: prevPlayerSymbols[0][otherkey],
      };

      if (gameTurnsLength > 0) {
        alert(
          "Los simbolos solo se pueden cambiar en el primer turno de cada jugador",
        );
        return prevPlayerSymbols[0];
      }

      if (newPlayerSymbols.symbol1 === newPlayerSymbols.symbol2) {
        alert("Los dos simbolos no pueden ser iguales");
        return prevPlayerSymbols[0];
      }

      return newPlayerSymbols;
    });
  }

  const activePlayer = setActivePlayer(gameTurns, playerSymbols);

  return (
    <>
      <main>
          <BackgroundMusic />
        <div className="game-area">
          <div className="players-container">
            <ol className="players">
              <Player
                namePlayer={playerNames.name1}
                onChangeName={ChangeNamePlayerField}
                keyName="name1"
                playerSymbol={playerSymbols.symbol1}
                onChangeSymbol={ChangeSymbolPlayerField}
                keySymbol="symbol1"
                gameTurnsLength={gameTurns.length}
                isActive={activePlayer == playerSymbols.symbol1}
              />
              <Player
                namePlayer={playerNames.name2}
                onChangeName={ChangeNamePlayerField}
                keyName="name2"
                playerSymbol={playerSymbols.symbol2}
                onChangeSymbol={ChangeSymbolPlayerField}
                keySymbol="symbol2"
                gameTurnsLength={gameTurns.length}
                isActive={activePlayer == playerSymbols.symbol2}
              />
            </ol>
          </div>
          <GameBoard
            onSelectedSquare={handleSelectedSquare}
            gameTurns={gameTurns}
          />
          {gameTurns.length > 8 && !gameTurns[0].hasWinner && (
            <GameOver
              text="¡Otra Partida!"
              handleRestartGame={handleRestartGame}
            />
          )}
          {gameTurns.length > 4 && gameTurns[0].hasWinner && (
            <GameOver text="¡Revancha!" handleRestartGame={handleRestartGame} />
          )}
        </div>
      </main>
      <LogTurns
        gameTurns={gameTurns}
        playerNames={playerNames}
        playerSymbols={playerSymbols}
      />
    </>
  );
}

export default App;
