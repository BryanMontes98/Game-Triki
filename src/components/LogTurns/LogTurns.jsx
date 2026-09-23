import "./LogTurns.css";

export default function LogTurns({ playerNames, playerSymbols, gameTurns }) {

  let winnerText = function winnerMessage(playerName) {
    return (
      <span className="log-turns-winner">
        👑 Jugador/a ' {playerName} ' has GANADO!!! 👑
      </span>
    );
  };

  let draftText = (
    <span className="log-turns-tie"> ⚔️ Nadie ha ganado, la partida ha terminado en un empate ⚔️ </span>
  );

  return (
    <>
      {gameTurns.length === 0 ? (
        <p className="log-turns-empty">No hay información de la tabla</p>
      ) : (
        <ol className="log-turns">
          <h3 className="log-turns-title">Información de la tabla</h3>
          {gameTurns.map((turn, index) => {

            const playerName = turn.symbol === playerSymbols.symbol1 ? playerNames.name1 : playerNames.name2;
            const isFinalTurn = gameTurns.length - index > 8 && !turn.hasWinner;

            return (
              <li key={index}>
                <p className="text-turns">Turno: {gameTurns.length - index} </p>
                <span>{turn.hasWinner && winnerText(playerName)}</span>
                <p>
                  { isFinalTurn && draftText }
                </p>
                <span>
                  <b>{playerName}</b> {" "}
                  ha colocado el simbolo '<b>{turn.symbol}</b>' en la posición [{turn.square.rowIndex}][{turn.square.colIndex}]{" "}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
