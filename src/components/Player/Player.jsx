import "./Player.css";
import { useState } from "react";

export default function Player({ initialPlayerName, playerSymbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialPlayerName);

  function ChangeNamePlayerField(event) {
    setPlayerName(event.target.value);
    /* console.log(event); */
  }

  function handleClickButtonPlayer() {
    setIsEditing((isEditing) => !isEditing);
  }

  const changePlayerField = isEditing ? (
    <input
      type="text"
      defaultValue={playerName}
      required
      onChange={(event) => ChangeNamePlayerField(event)}
    />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  const changeNameButtonField = isEditing ? "Guardar" : "Cambiar";

  return (
    <>
      <li className={isActive ? "active" : ""}>
        <span className="player-info">
          {changePlayerField}
          <span className="player-symbol">{playerSymbol}</span>
        </span>
        <button onClick={() => handleClickButtonPlayer()}>
          {changeNameButtonField}
        </button>
      </li>
    </>
  );
}
