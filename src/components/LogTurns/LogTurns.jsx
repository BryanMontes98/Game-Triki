
import './LogTurns.css';

export default function LogTurns({ playerNames, gameTurns }) {

    return (
        <>
            {  gameTurns.length === 0 ? <p className='log-turns-empty'>No hay información de la tabla</p> : 
            <ol className="log-turns">
            <h3 className='log-turns-title'>Información de la tabla</h3>
                { gameTurns.map( (turn, index)=> {
                    return (
                        <li key={index}>
                            <p>Turno: {(gameTurns.length - index)} </p>
                            <span>{ turn.symbol === 'X' ? playerNames.name1 : playerNames.name2  } ha colocado el simbolo '{turn.symbol}' en la posición [{turn.square.rowIndex}][{turn.square.colIndex}]  </span>
                        </li>
                    )
                })}
            </ol>
            }
            
        </>
    );

}