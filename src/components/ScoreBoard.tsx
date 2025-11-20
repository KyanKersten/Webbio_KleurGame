import { useState, useEffect, useRef } from "react";

export default function ScoreBoard({
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

  const reactionSec = (reactionTime / 1000).toFixed(2);

  return (
    <aside className="w-56">
      <div className="p-4 rounded-lg bg-[#060606] text-white shadow-md border border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold">Score</h3>
          </div>
        </div>

        <ul className="space-y-3">
          <li
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-150 ${
              flashCorrect ? "bg-green-700/80 ring-1 ring-green-500" : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded bg-green-900/40">
                <svg className="w-4 h-4 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-neutral-300">Aantal Goed</div>
                <div className="text-sm font-medium">{correctAnswers}</div>
              </div>
            </div>
          </li>

          <li
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-150 ${
              flashWrong ? "bg-red-700/80 ring-1 ring-red-500" : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded bg-red-900/40">
                <svg className="w-4 h-4 text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-neutral-300">Aantal Fout</div>
                <div className="text-sm font-medium">{wrongAnswers}</div>
              </div>
            </div>
          </li>

          <li className="flex items-center justify-between px-3 py-2 rounded-lg bg-transparent">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded bg-neutral-800/40">
                <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path d="M12 7v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-neutral-300">Reactietijd</div>
                <div className="text-sm font-medium">{reactionSec} s</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}