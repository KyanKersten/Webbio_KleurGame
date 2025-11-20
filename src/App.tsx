import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ColorGrid from "./components/ColorGrid";
import Footer from "./components/Footer";
import ScoreBoard from "./components/ScoreBoard";
import GameRules from "./components/GameRules";
import EndScore from "./components/EndScore";

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
  const [started, setStarted] = useState(false);

  const [target, setTarget] = useState<Color | null>(null);

  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const [reactionTimes, setReactionTimes] = useState<number[]>([0]);

  const clickLockedRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (gameOver || !started) return;

    clickLockedRef.current = false;
    startTimeRef.current = Date.now();

    const timer = setTimeout(() => {
      if (!clickLockedRef.current && !gameOver) {
        clickLockedRef.current = true;
        setReactionTimes((prev) => [...prev, REVEAL_DURATION * 1000]);
        setWrongAnswers((prev) => prev + 1);

        nextRound();
      }
    }, REVEAL_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [round, gameOver, started]);

  function handleColorClick(color: Color) {
    if (gameOver || !started) return;
    if (clickLockedRef.current) return;
    if (!target) return;

    clickLockedRef.current = true;

    const reaction = Date.now() - startTimeRef.current;
    setReactionTimes((prev) => [...prev, reaction]);

    const correct = color.name === target.name;
    if (correct) setCorrectAnswers((prev) => prev + 1);
    else setWrongAnswers((prev) => prev + 1);

    nextRound();
  }

  function nextRound() {
    setRound((prev) => {
      const next = prev + 1;
      if (next >= MAX_ROUNDS) {
        setGameOver(true);
        return next;
      }
      return next;
    });

    setTarget((prev) => {
      const prevName = prev?.name;

      if (round + 1 >= MAX_ROUNDS) return prev;
      return pickRandomDifferent(prevName);
    });
  }

  function startGame() {
    setStarted(true);
    setRound(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setReactionTimes([]);
    setGameOver(false);
    setTarget(COLORS[Math.floor(Math.random() * COLORS.length)]);
    clickLockedRef.current = false;
  }

  function resetGame() {
    startGame();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameRules open={!started} onStart={startGame}/>

      <EndScore
        open={gameOver}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        reactionTimes={reactionTimes}
        onRestart={resetGame}
      />

      <Header
        color={target ?? undefined}
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
              reactionTime={reactionTimes.length > 0 ? reactionTimes[reactionTimes.length - 1] : 0}
            />
          </aside>

          <section className="flex-1">
            <ColorGrid onSelect={handleColorClick} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;