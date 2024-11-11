import { Square } from "./Square"
import { WinnerModal } from "./WinnerModal"
import { TURNS } from "../constants"
import { useGameState } from "../logic/board"

export function Board() { 
    const {board, turn, winner, resetGame, updateBoard} = useGameState();

    return (
        <main className='board'>
            <h1>Tres en Raya</h1>
            <button onClick={resetGame}>Empezar de nuevo</button>
            <section className='game'>
                {
                    board.map((square, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}>
                                {square}
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turn'>
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
        </main>
    )
}