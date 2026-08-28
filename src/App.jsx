import "./App.css";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import { useState } from "react";

function App() {

  const [activePlayer, setActivePlayer] = useState("X");

  function handlePickedSquare() {
    setActivePlayer( (lastActivePlayer)=> (lastActivePlayer === "X" ? "O" : "X") );
  }

  return (
    <>
      <main>
        <div className="players-container">
          <ol className="players">
            <Player initialPlayerName="Jugador 1" playerSymbol="X" isActive={activePlayer == "X"}/>
            <Player initialPlayerName="Jugador 2" playerSymbol="O" isActive={activePlayer == "O"}/>
          </ol>
        </div>
      </main>
      <GameBoard onSelectPlayer={ ()=> handlePickedSquare() } />
    </>
  );
}

export default App;
