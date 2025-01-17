
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

// const calculateWinner(square){
//   const line=[
//     [0, 1, 2],
//     [3,4,5]
//   ]
// }

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index) => {
    if(board[index])return;
    const newBoard=[...board];
    newBoard[index]=turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>Juego Gato</h1>
      <section className='game'>
      {
        board.map((cell,  index)=>{
          return(
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
      </section>
      <section className="turn">
      <Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}> {TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
