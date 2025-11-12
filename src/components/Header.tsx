import { useEffect, useState } from "react";
import type { Color } from "../data/Colors";

type HeaderProps = {
  color?: Color;
  revealDuration?: number; // in seconds
};

const TITLE = "Welk vak heeft de kleur:";

export default function Header({ color, revealDuration = 2 }: HeaderProps) {
  const [showColor, setShowColor] = useState<boolean>(false);

  useEffect(() => {
    if (!color) {
      setShowColor(false);
      return;
    }

    setShowColor(true);
    const t = setTimeout(() => setShowColor(false), revealDuration * 1000);
    return () => clearTimeout(t);
  }, [color, revealDuration]);

  return (
    <header className="bg-[#060606] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          <div className="flex items-center">
            <a className="block" href="#">
              <span className="sr-only">Home</span>
              <img src="/assets/logo.png" alt="Logo" className="h-8" />
            </a>
          </div>

          <div className="flex justify-center">
            <h1 className="text-lg md:text-2xl font-semibold tracking-tight">
              {TITLE}{" "}
              {showColor && (
                <span style={{ color: color?.hex ?? "white" }}>
                  {color?.name ?? ""}
                </span>
              )}
            </h1>
          </div>
          <div />
        </div>
      </div>
    </header>
  );
}