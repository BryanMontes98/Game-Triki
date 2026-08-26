import "./App.css";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";

function App() {
  return (
    <>
      <main>
        <div className="players-container">
          <ol className="players">
            <Player initialPlayerName="Jugador 1" playerSymbol="X" />
            <Player initialPlayerName="Jugador 2" playerSymbol="O" />
          </ol>
        </div>
      </main>
      <GameBoard />
    </>
  );
}

export default App;
