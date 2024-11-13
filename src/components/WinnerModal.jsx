import { Square } from "./Square"
import PropTypes from 'prop-types';

export function WinnerModal ({ winner, resetGame }){
    if(winner === null) return null
    
    const winnerText = winner === false ? 'EMPATE' : 'GANÓ:'

    return(
            winner != null && (
              <section className='winner'>
                <div className='text'>
                  <h2>{winnerText}</h2>
                  <header className='win'>
                    {winner && <Square>{winner}</Square>}
                  </header>
    
                  <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                  </footer>
                </div>
              </section>
            )
    )
}

// Validación de los props
WinnerModal.propTypes = {
  winner: PropTypes.node, // winner debe ser cualquier elemento renderizable
  resetGame: PropTypes.func // resetGame debe ser una función
}