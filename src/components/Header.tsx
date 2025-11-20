import { useEffect, useState } from "react";
import type { Color } from "../data/Colors";

type HeaderProps = {
  color?: Color;
  revealDuration?: number; // in seconds
  round?: number;
  maxRounds?: number;
  gameOver?: boolean;
};

export default function Header({ color, revealDuration = 2, round, maxRounds, gameOver = false}: HeaderProps) {
  const [showColor, setShowColor] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(revealDuration);

  useEffect(() => {
    if (!color) { 
      setShowColor(false);
      setRemaining(revealDuration);
      return; 
    }

    setShowColor(true);
    const t = setTimeout(() => setShowColor(false), revealDuration * 1000);
    return () => clearTimeout(t);
  }, [color, revealDuration, round]);

  useEffect(() => {
    if (!color) {
      setRemaining(revealDuration);
      return;
    }

    setRemaining(revealDuration);
    const start = Date.now();
    const iv = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const next = Math.max(0, +(revealDuration - elapsed).toFixed(2));
      setRemaining(next);
      if (next <= 0) clearInterval(iv);
    }, 100);

    return () => clearInterval(iv);
  }, [color, revealDuration, round]);
  const isGameOver = gameOver || ((round ?? 0) >= (maxRounds ?? 10));
  const title = isGameOver ? "Game Over!" : null;

  const percentage = Math.max(0, Math.min(100, (remaining / revealDuration) * 100));

  const fillGradient = color
    ? `linear-gradient(90deg, ${color.hex}, ${color.hex}88)`
    : "linear-gradient(90deg,#16a34a,#f59e0b)";

  return (
    <header className="bg-[#060606] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          <div className="flex items-center">
            <a className="block" href="#">
              <span className="sr-only">Home</span>
              <img src="public/assets/logo.png" alt="Logo" className="h-8" />
            </a>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-lg md:text-2xl font-semibold tracking-tight">
              {title}{" "}
              {showColor && !isGameOver && (
                <span style={{ color: color?.hex ?? "white" }}>
                  {color?.name ?? ""}
                </span>
              )}
            </h1>

           {!isGameOver && showColor && (
            <>
               <div className="w-full max-w-xs mt-2">
                 <div className="w-full h-2 bg-neutral-800 rounded overflow-hidden">
                   <div
                     className="h-full transition-all duration-100"
                     style={{ width: `${percentage}%`, background: fillGradient }}
                   />
                 </div>
               </div>
             </>
           )}
          </div>

          <div className="flex items-center justify-end">
            <div className="text-right">
              <div className="text-xs text-neutral-400">Ronde</div>
              <div className="text-lg md:text-xl font-semibold">{`${round} / ${maxRounds}`}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}