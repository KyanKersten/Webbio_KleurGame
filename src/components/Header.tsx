import { useEffect, useState } from "react";
import type { Color } from "../data/Colors";

type HeaderProps = {
  color?: Color;
  revealDuration?: number; // in seconds
  round?: number;
  maxRounds?: number;
  gameOver?: boolean;
};

const DEFAULT_TITLE = "Klik snel op de kleur:";

export default function Header({ color, revealDuration = 2, round, maxRounds, gameOver = false}: HeaderProps) {
  const [showColor, setShowColor] = useState<boolean>(false);
  useEffect(() => {
    if (!color) { 
      setShowColor(false); return; 
    }

    setShowColor(true);
    const t = setTimeout(() => setShowColor(false), revealDuration * 1000);
    return () => clearTimeout(t);
  }, [color, revealDuration, round]);

  const isGameOver = gameOver || ((round ?? 0) >= (maxRounds ?? 10));
  const title = isGameOver ? "Game Over!" : DEFAULT_TITLE;

  return (
    <header className="bg-[#060606] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          <div className="flex items-center">
            <a className="block" href="#">
              <span className="sr-only">Home</span>
              <img src="src/assets/logo.png" alt="Logo" className="h-8" />
            </a>
          </div>

          <div className="flex justify-center">
            <h1 className="text-lg md:text-2xl font-semibold tracking-tight">
              {title}{" "}
              {showColor && !isGameOver && (
                <span style={{ color: color?.hex ?? "white" }}>
                  {color?.name ?? ""}
                </span>
              )}
            </h1>
          </div>
          <h1 className="text-lg md:text-2xl font-semibold tracking-tight">
            {`Ronde ${round} / ${maxRounds}`}
          </h1>
          <div />
        </div>
      </div>
    </header>
  );
}