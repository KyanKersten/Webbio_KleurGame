import ColorTile from "./ColorTile";
import { COLORS } from "../data/Colors";

function ColorGrid() {
   return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 justify-items-center">
        {COLORS.map((color) => (
          <ColorTile key={color.name} color={color} />
        ))}
      </div>
    </div>
  );
}

export default ColorGrid;