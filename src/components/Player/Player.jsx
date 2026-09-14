import "./Player.css";
import { useState } from "react";

export default function Player({ namePlayer, onChangeName, keyName, playerSymbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleClickButtonPlayer() {
    setIsEditing((isEditing) => !isEditing);
  }

  const changePlayerField = isEditing ? (
    <input
      type="text"
      placeholder={namePlayer}
      required
      onChange={(event) => onChangeName(event, keyName)}
    />
  ) : (
    <span className="player-name">{namePlayer}</span>
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
