/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Components/Modal";
import { TURNS } from "./Constants/consts";
import { winnersCombined } from "./Constants/consts";
const Square = ({ children, updateBoard, index }) => {
  const clickSquare = () => {
    updateBoard(index);
  };
  return (
    <div
      className="w-20 h-20 rounded-xl border border-gray-300 flex items-center justify-center  font-semibold text-4xl"
      onClick={clickSquare}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinners = (boardToCheck) => {
    for (const combo of winnersCombined) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };
  const modifiedBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn == TURNS.X ? TURNS.O : TURNS.X);
    const newWinner = checkWinners(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner("Empate");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-lime-800 to-black text-white flex flex-col items-center justify-center font-abc">
      <h1 className="text-4xl absolute top-10 font-bold">TRES EN RAYA</h1>

      <label className=" text-3xl">TURNO DE </label>
      <div className="text-3xl flex items-center">
        <div
          className={
            "py-3 px-5 rounded-lg font-bold " +
            (turn === "X" ? " bg-lime-500 text-black" : "")
          }
        >
          X
        </div>
        <div
          className={
            "py-3 px-5 rounded-lg font-bold " +
            (turn === "O" ? " bg-lime-500 text-black" : "")
          }
        >
          O
        </div>
      </div>
      <section className="grid grid-cols-3 gap-6 mt-5">
        {board.map((item, index) => {
          return (
            <Square key={index} updateBoard={modifiedBoard} index={index}>
              {item}
            </Square>
          );
        })}
      </section>
      <Modal isOpen={winner != null} onClose={() => resetGame()}>
        <div className=" ">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-4xl text-center">JUEGO TERMINADO</h3>
            <div className="mt-2 text-center ">
              <label>RESULTADOS DEL JUEGO</label>
              {winner == "Empate" ? (
                <div className="text-4xl text-yellow-300">Empate</div>
              ) : (
                <div className="text-4xl text-green-300">Ganador: {winner}</div>
              )}
            </div>
            <button
              onClick={resetGame}
              className="bg-blue-700 text-xl mt-10 w-full"
            >
              Empezar de nuevo
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default App;
