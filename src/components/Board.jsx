import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./Square"
import { WinnerModal } from "./WinnerModal"
import { TURNS } from "../constants"
import { checkWinnerFrom, checkEndGame } from "../logic/board"
import { useGameState } from "../logic/board"

export function Board() {
    
    const {board, setBoard, turn, setTurns, winner, setWinner, resetGame } = useGameState();

    const updateBoard = (index) => {
        //Si en la posición del tablero hay algo que no sea nulo o 
        //cuando se termina la partida 
        //cierra la ejecución.

        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurns(newTurn);

        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinner(false)
        }
    }

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