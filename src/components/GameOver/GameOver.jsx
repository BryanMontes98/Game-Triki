import "./GameOver.css";

export default function GameOver({ handleRestartGame, text }) {
  return (
    <div className="game-over">
      <p>
        <button onClick={handleRestartGame}>{text}</button>
      </p>
    </div>
  );
}
