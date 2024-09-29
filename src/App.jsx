/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Components/Modal";
import { TURNS } from "./Constants/consts";
import { winnersCombined } from "./Constants/consts";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
const Square = ({ children, updateBoard, index }) => {
  const clickSquare = () => {
    updateBoard(index);
  };
  return (
    <div
      className={`w-24 h-24  flex items-center justify-center  font-semibold text-4xl border-white  ${
        ![6, 7, 8].includes(index) ? "border-b-4" : " "
      }
      ${![0, 3, 6, 9].includes(index) ? "border-l-4" : " "}
      `}
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
    <div className="min-h-screen bg-gradient-to-r from-black via-[#030037] to-black text-white font-abc flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1">
        <label className=" text-3xl">TURNO DE </label>

        <div className="text-3xl flex items-center">
          <div
            className={`py-3 px-5 rounded-lg font-bold " +
            ${turn === "X" ? "text-design-x text-black" : ""}
          `}
          >
            X
          </div>
          <div
            className={
              "py-3 px-5 rounded-lg font-bold " +
              (turn === "O" ? " text-design-o text-black" : "")
            }
          >
            O
          </div>
        </div>
        <section className="grid grid-cols-3  mt-5">
          {board.map((item, index) => {
            return (
              <Square key={index} updateBoard={modifiedBoard} index={index}>
                <span
                  className={`${
                    item == "O" ? "text-design-o" : "text-design-x"
                  }  text-[70px] `}
                >
                  {item}
                </span>
              </Square>
            );
          })}
        </section>
      </main>
      <Footer />

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
    </div>
  );
};

export default App;
