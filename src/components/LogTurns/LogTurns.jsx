import "./LogTurns.css";

export default function LogTurns({ playerNames, gameTurns }) {

  let winnerText = function winnerMessage(turn, playerNames) {
    return (
      <span>
        👑 El jugador 
        '{turn.symbol === "X" ? playerNames.name1 : playerNames.name2}' 
        es el ganador 👑
      </span>
    );
  };

  let draftText = (
    <span> ⚔️ Nadie ha ganado, la partida ha terminado en un empate ⚔️ </span>
  );

  return (
    <>
      {gameTurns.length === 0 ? (
        <p className="log-turns-empty">No hay información de la tabla</p>
      ) : (
        <ol className="log-turns">
          <h3 className="log-turns-title">Información de la tabla</h3>
          {gameTurns.map((turn, index) => {
            return (
              <li key={index}>
                <p>Turno: {gameTurns.length - index} </p>
                <p>{turn.hasWinner && winnerText(turn, playerNames)}</p>
                <p>{(gameTurns.length - index > 8 && !turn.hasWinner) && draftText}</p>
                <span>
                  {turn.symbol === "X" ? playerNames.name1 : playerNames.name2}{" "}
                  ha colocado el simbolo '{turn.symbol}' en la posición [
                  {turn.square.rowIndex}][{turn.square.colIndex}]{" "}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
