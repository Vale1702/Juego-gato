import confetti from 'canvas-confetti'
import { useState } from 'react'
import './App.css'
//Turnos
const TURNS={
  X: 'x',
  O: 'o'
}

// eslint-disable-next-line react/prop-types
const Square = ({children, isSelected, updateBoard, index}) => {
    const className=`square ${isSelected ? 'is-selected': '' }`
    
    const handleClick = () => {
      updateBoard(index)
  }
  
  return(
    <div onClick={handleClick} 
          className={className}>
          {children}
    </div>
  )
}

const winnerCombo=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]


function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  //Turnos
  const [turn, setTurn] = useState(TURNS.X);
  //null es que no hay ganador, false es que hay un empate
  const [winner, setWinner]= useState(null);

  const checkWinner = (boardToCheck) => {
    //revisamos las combinaciones ganadoras para validar quien gano X u O
      for( const combo of winnerCombo){
          const [a, b, c ] = combo;

        if (boardToCheck [a] &&
            boardToCheck [a] === boardToCheck[b] &&
            boardToCheck [a] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }
      return null;
  }
//Reiniciar el juego
  const resetGame = ()=> {
    setBoard (Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  //Validar si hay null, e indicar que termino el juego
  const checkEndGame=(newBoard)=>{
    return newBoard.every((square)=> square != null)
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
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti()
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)){
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
      {winner != null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {
              winner === false
              ? 'Empate:'
              : "Gano:"
              }
              </h2>
              <header className='win'>
                {winner && <Square> {winner} </Square>}
              </header>

        <footer>
          <button onClick={resetGame}> Empezar de nuevo </button>
        </footer>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
