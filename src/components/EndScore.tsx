type Props = {
  open: boolean;
  correctAnswers: number;
  wrongAnswers: number;
  reactionTimes: number[];
  onRestart: () => void;
};

export default function EndScore({
  open,
  correctAnswers,
  wrongAnswers,
  reactionTimes,
  onRestart,
}: Props) {
  if (!open) return null;

  const averageReactionTime =
    reactionTimes && reactionTimes.length > 0
      ? (reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length / 1000).toFixed(2)
      : "-";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md rounded-lg bg-[#060606] text-white shadow-lg border border-neutral-800">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-3">Eindscore</h2>

          <div className="mb-4">
            <div className="text-center text-white mb-4 select-none">
              <h1 className="text-green-400 transition-colors duration-200">
                Aantal Goed: {correctAnswers}
              </h1>

              <h1 className="text-red-400 transition-colors duration-200">
                Aantal Fout: {wrongAnswers}
              </h1>

              <h1 className="text-neutral-300">
                Gemiddelde Reactietijd: {averageReactionTime} sec
              </h1>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onRestart}
              className="px-4 py-2 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-500"
            >
              Herstart spel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}