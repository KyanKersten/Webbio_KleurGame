import Header from './components/Header';
import ColorGrid from './components/ColorGrid';
import Footer from './components/Footer';
import { COLORS } from "./data/Colors";
import { useState, useEffect, useRef } from 'react';

// -- Game Settings -- 
const REVEAL_DURATION = 4; // seconds
const MAX_ROUNDS = 10;

import "./index.css";

function pickRandomDifferent(currentName?: string) {
  if (COLORS.length <= 1) return COLORS[0];
  let next = COLORS[Math.floor(Math.random() * COLORS.length)];
  while (next.name === currentName) {
    next = COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  return next;
}

function App() {
  const [target, setTarget] = useState(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
  const [acceptingAnswers, setAcceptingAnswers] = useState(true);
  const [hasAlreadyAnswered, setHasAlreadyAnswered] = useState(false);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const clickLockedRef = useRef(false);

  useEffect(() => {
    if (gameOver) return;
    clickLockedRef.current = false;
    setHasAlreadyAnswered(false);
    setAcceptingAnswers(true);

    const timer = setTimeout(() => setAcceptingAnswers(false), REVEAL_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [target, gameOver]);

 useEffect(() => {
    if (!acceptingAnswers && !hasAlreadyAnswered && !gameOver) {
      setRound(prev => {
        if (prev >= MAX_ROUNDS) {
          setGameOver(true);
          return prev;
        }
        return prev + 1;
      });
      setTarget(prev => pickRandomDifferent(prev?.name));
    }
  }, [acceptingAnswers, hasAlreadyAnswered, gameOver]);

  function handleColorClick(color: typeof COLORS[number]) {
    if (gameOver) return;

    if (clickLockedRef.current) return;

    if (!acceptingAnswers) return; 

    if (hasAlreadyAnswered) return;
    
    clickLockedRef.current = true;
    setHasAlreadyAnswered(true);

    const correct = color.name === target.name;
    const message = correct ? "Correct!" : `Wrong! It was ${target.name}.`;
    alert(message);

    if (round >= MAX_ROUNDS) {
      alert("Game over! You completed 10 rounds."); 
      setGameOver(true);
      return;
    }

     setRound(prev => {
      if (prev >= MAX_ROUNDS) {
        setGameOver(true);
        return prev;
      }
      return prev + 1;
    });

    setTarget(prev => pickRandomDifferent(prev?.name));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header color={target} revealDuration={REVEAL_DURATION} round={round} maxRounds={MAX_ROUNDS} gameOver={gameOver} />

      <main>
        <ColorGrid onSelect={handleColorClick} />
      </main>

      <Footer />
    </div>
  );
}

export default App
