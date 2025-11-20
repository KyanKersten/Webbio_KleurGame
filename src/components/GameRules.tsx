type Props = {
  open?: boolean;
  rounds?: number;
  revealDuration?: number;
  onStart: () => void;
};

export default function GameRules({
  open = true,
  rounds = 10,
  revealDuration = 2,
  onStart,
}: Props) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div
        className="relative z-10 w-full max-w-3xl rounded-lg bg-[#060606] text-white shadow-lg border border-neutral-800"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Spelregels</h2>

          <ul className="list-disc list-inside space-y-2 text-neutral-300 mb-4">
            <li>Klik zo snel mogelijk op het kleurvak dat overeenkomt met de weergegeven kleurnaam.</li>
            <li>Elke sessie bestaat uit {rounds} rondes.</li>
            <li>Voor elk correct antwoord krijg je een punt; voor elk fout antwoord of time-out krijg je een foutpunt.</li>
            <li>Je reactietijd wordt gemeten en weergegeven aan het einde van de sessie.</li>
            <li>Na {rounds} rondes verschijnt een overzicht van je prestaties.</li>
          </ul>

          <div className="text-sm text-neutral-400 mb-4">
            Tijd per ronde: {revealDuration} seconden.
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onStart}
              className="px-4 py-2 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-500"
            >
              Begrepen! Start spel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}