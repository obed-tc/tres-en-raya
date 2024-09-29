/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Timer = ({ totalSegundos, onTiempoFinalizado }) => {
  const [segundosRestantes, setSegundosRestantes] = useState(totalSegundos);

  useEffect(() => {
    if (segundosRestantes <= 0) {
      if (onTiempoFinalizado) onTiempoFinalizado();
      return;
    }

    const intervalo = setInterval(() => {
      setSegundosRestantes((prevSegundos) => prevSegundos - 1);
    }, 1000);

    return () => clearInterval(intervalo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segundosRestantes]);

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRest = segundos % 60;
    return `${String(minutos).padStart(2, "0")}:${String(segundosRest).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <p className="text-center">
        Tiempo:
        <br /> {formatearTiempo(segundosRestantes)}
      </p>
    </div>
  );
};

export default Timer;
