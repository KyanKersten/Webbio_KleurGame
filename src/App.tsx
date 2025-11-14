import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ColorGrid from './components/ColorGrid';
import Footer from './components/Footer';
import ScoreBoard from './components/ScoreBoard';
import { COLORS, type Color } from "./data/Colors";

import "./index.css";

const REVEAL_DURATION = 4; // seconds
const MAX_ROUNDS = 10;

function pickRandomDifferent(currentName?: string) {
  if (COLORS.length <= 1) return COLORS[0];

  let next = COLORS[Math.floor(Math.random() * COLORS.length)];
  while (next.name === currentName) {
    next = COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  return next;
}

function App() {
  const [target, setTarget] = useState<Color>(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
  const [acceptingAnswers, setAcceptingAnswers] = useState(true);
  const [hasAlreadyAnswered, setHasAlreadyAnswered] = useState(false);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const clickLockedRef = useRef(false);

  useEffect(() => {
    if (gameOver) return;

    clickLockedRef.current = false;
    setHasAlreadyAnswered(false);
    setAcceptingAnswers(true);

    const timer = setTimeout(() => {
      if (!hasAlreadyAnswered && !gameOver) {
        clickLockedRef.current = true;
        setHasAlreadyAnswered(true);
        setAcceptingAnswers(false);

        setWrongAnswers(prev => prev + 1);
        alert(`Time's up! The correct color was ${target.name}.`);

        nextRound();
      }
    }, REVEAL_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [target, gameOver]);

  function handleColorClick(color: Color) {
    if (gameOver) return;
    if (clickLockedRef.current) return;
    if (!acceptingAnswers) return;
    if (hasAlreadyAnswered) return;

    clickLockedRef.current = true;
    setHasAlreadyAnswered(true);
    setAcceptingAnswers(false);

    const correct = color.name === target.name;
    if (correct) setCorrectAnswers(prev => prev + 1);
    else setWrongAnswers(prev => prev + 1);

    alert(correct ? "Correct!" : `Wrong! It was ${target.name}.`);

    nextRound();
  } 

  function nextRound() {
    if (round >= MAX_ROUNDS) {
      setGameOver(true);
      return;
    }
    setRound(prev => prev + 1);
    setTarget(prev => pickRandomDifferent(prev.name));
  }

  function resetGame() {
    setRound(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setGameOver(false);
    setTarget(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setHasAlreadyAnswered(false);
    setAcceptingAnswers(true);
    clickLockedRef.current = false;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header color={target} revealDuration={REVEAL_DURATION} round={round} maxRounds={MAX_ROUNDS} gameOver={gameOver} />

      <main>
        <ColorGrid onSelect={handleColorClick} />
        <ScoreBoard correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
        {gameOver && (
          <button
            onClick={resetGame}
            className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Restart Game
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
