import { useState } from 'react'
import { WINNER_COMBOS, TURNS} from '../constants.js'

export function useGameState() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurns] = useState(TURNS.X)

  const [winner, setWinner] = useState(null) //NULL: NO GANADOR, TRUE: GANADOR, FALSE: EMPATE

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurns(TURNS.X)
    setWinner(null)
  }

  return {
    board,
    setBoard,
    turn,
    setTurns,
    winner,
    setWinner,
    resetGame
  }
}

export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
    //Revisamos si hay un empate
    //Si no hay más espacios vacíos
    return newBoard.every((square) => square !== null)
  }