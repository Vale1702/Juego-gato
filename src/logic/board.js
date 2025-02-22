import { winnerCombo } from "../constants.js";

export const checkWinnerFrom = (boardToCheck) => {
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

  //Validar si hay null, e indicar que termino el juego
export  const checkEndGame=(newBoard)=>{
    return newBoard.every((square) => square != null);
  }