import { useState, useEffect, useRef } from "react";

function ScoreBoard({
  correctAnswers,
  wrongAnswers,
  reactionTime,
}: {
  correctAnswers: number;
  wrongAnswers: number;
  reactionTime: number;
}) {
  const [flashCorrect, setFlashCorrect] = useState(false);
  const [flashWrong, setFlashWrong] = useState(false);

  const prevCorrect = useRef(correctAnswers);
  const prevWrong = useRef(wrongAnswers);

  useEffect(() => {
    let timer: number;
    
    if (correctAnswers > prevCorrect.current) {
      setFlashCorrect(true);
      timer = window.setTimeout(() => setFlashCorrect(false), 600);
    }

    if (wrongAnswers > prevWrong.current) {
      setFlashWrong(true);
      timer = window.setTimeout(() => setFlashWrong(false), 600);
    }

    prevCorrect.current = correctAnswers;
    prevWrong.current = wrongAnswers;

    return () => clearTimeout(timer);
  }, [correctAnswers, wrongAnswers]);

  return (
    <div className="text-center text-black mb-4 select-none">

      <h1
        className={`text-green-800 transition-colors duration-200 ${
          flashCorrect ? "bg-green-300" : ""
        }`}
      >
        Aantal Goed: {correctAnswers}
      </h1>

      <h1
        className={`text-red-600 transition-colors duration-200 ${
          flashWrong ? "bg-red-300" : ""
        }`}
      >
        Aantal Fout: {wrongAnswers}
      </h1>

      <h1>Reactietijd: {(reactionTime / 1000).toFixed(2)} sec</h1>
    </div>
  );
}

export default ScoreBoard;
