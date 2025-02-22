import confetti from 'canvas-confetti'
import { useState } from 'react'
import { Square } from './components/Square.jsx'
import './App.css'
import {TURNS} from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App() {

  const [board, setBoard] = useState (() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)    
  }); 

  //Turnos
  const [turn, setTurn] = useState (() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  });

  //null es que no hay ganador, false es que hay un empate
  const [winner, setWinner]= useState(null);
  
//Reiniciar el juego
  const resetGame = ()=> {
    setBoard (Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  }

  //Actualizacion de tablero
  const updateBoard = (index) => {
    //No sobrescribe la posición si ya hay algo
    if (board[index] || winner) return;
    //actualizar tablero
    const newBoard=[...board];
    newBoard[index]=turn;
    setBoard(newBoard);
    //cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    
   //guarda la partida
   saveGameToStorage({
    board: newBoard,
    turn: newTurn
   });

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner){
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Juego Gato</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
      {
        board.map((square,  index)=>{
          return(
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
        })
      }
      </section>
      <section className="turn">
      <Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}> {TURNS.O}</Square>
      </section>

      {/* Randerizado condicional */}
      <WinnerModal 
      resetGame = {resetGame} 
      winner = {winner}/>

    </main>
  )
}

export default App