import { useState } from 'react'
import { WINNER_COMBOS, TURNS} from '../constants.js'
import confetti from "canvas-confetti"

export function useGameState() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurns] = useState(TURNS.X)

  const [winner, setWinner] = useState(null) //NULL: NO GANADOR, TRUE: GANADOR, FALSE: EMPATE

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

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurns(TURNS.X)
    setWinner(null)
  }

  const checkWinnerFrom = (boardToCheck) => {
    //Revisamos todas las combinaciones ganadoras
    //para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //Si no hay ganador
    return null
  }

  const checkEndGame = (newBoard) => {
    //Revisamos si hay un empate
    //Si no hay más espacios vacíos
    return newBoard.every((square) => square !== null)
  }

  return {
    board,
    turn,
    winner,
    resetGame,
    updateBoard
  }
}