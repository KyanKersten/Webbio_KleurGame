import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ColorGrid from './components/ColorGrid';
import Footer from './components/Footer';
import ScoreBoard from './components/ScoreBoard';
import { COLORS, type Color } from "./data/Colors";

import "./index.css";

const REVEAL_DURATION = 2; // seconds
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

  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [reactionTime, setReactionTime] = useState<number>(0);

  const clickLockedRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());

   useEffect(() => {
    if (gameOver) return;

    clickLockedRef.current = false;

    startTimeRef.current = Date.now();

    const timer = setTimeout(() => {
      if (!clickLockedRef.current && !gameOver) {
        clickLockedRef.current = true;
        setReactionTime(REVEAL_DURATION * 1000);
        setWrongAnswers(prev => prev + 1);

        nextRound();
      }
    }, REVEAL_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [round, gameOver]);

  function handleColorClick(color: Color) {
    if (gameOver) return;
    if (clickLockedRef.current) return;

    clickLockedRef.current = true;

    const reaction = Date.now() - startTimeRef.current;
    setReactionTime(reaction);

    const correct = color.name === target.name; 
    if (correct) setCorrectAnswers(prev => prev + 1);
    else setWrongAnswers(prev => prev + 1);

    nextRound();
  } 

function nextRound() {
  setRound(prev => {
    if (prev + 1 >= MAX_ROUNDS) {
      setGameOver(true);
      return prev + 1;
    }
    return prev + 1;
  });

  if (!gameOver) {
    setTarget(prev => pickRandomDifferent(prev.name));
  }
}

  function resetGame() {
    setRound(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setGameOver(false);
    setTarget(COLORS[Math.floor(Math.random() * COLORS.length)]);
    clickLockedRef.current = false;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        color={target}
        revealDuration={REVEAL_DURATION}
        round={round}
        maxRounds={MAX_ROUNDS}
        gameOver={gameOver}
      />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl px-4 py-6 flex gap-6 items-start">
          <aside className="w-56 flex-shrink-0">
            <ScoreBoard
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
              reactionTime={reactionTime}
            />
          </aside>

          <section className="flex-1">
            <ColorGrid onSelect={handleColorClick} />
            {gameOver && (
              <div className="mt-4">
                <button
                  onClick={resetGame}
                  className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Restart Game
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
