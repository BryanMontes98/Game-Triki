
import './LogTurns.css';

export default function LogTurns({ gameTurns }) {

    return (
        <>
            {  gameTurns.length === 0 ? <p className='log-turns-empty'>No hay información de la tabla</p> : 
            <ol className="log-turns">
            <h3 className='log-turns-title'>Información de la tabla</h3>
                { gameTurns.map( (turn, index)=> {
                    return (
                        <li key={index}>
                            <p>Turno: {(gameTurns.length - index)} </p>
                            <span>El jugador 1 ha colocado el simbolo '{turn.symbol}' en la posición [{turn.square.rowIndex}][{turn.square.colIndex}]  </span>
                        </li>
                    )
                })}
            </ol>
            }
            
        </>
    );

}