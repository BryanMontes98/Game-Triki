import "./Player.css";
import { useState } from "react";

export default function Player({ namePlayer, onChangeName, keyName, playerSymbol, onChangeSymbol, keySymbol, isActive, gameTurnsLength }) {
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

  const changeSymbolField = isEditing ? (
    <input
      className="input-symbol"
      type="text"
      value={playerSymbol}
      maxLength='1'
      required
      onChange={(event) => onChangeSymbol(event, keySymbol, gameTurnsLength)}
    />
  ) : (
    <span className="player-symbol">{playerSymbol}</span>
  );

  const changeNameButtonField = isEditing ? "Guardar" : "Cambiar";

  return (
    <>
      <li className={isActive ? "active" : ""}>
        <span className="player-info">
          {changePlayerField}
          {changeSymbolField}
        </span>
        <button onClick={() => handleClickButtonPlayer()} disabled={gameTurnsLength > 0} >
          {changeNameButtonField}
        </button>
      </li>
    </>
  );
}
