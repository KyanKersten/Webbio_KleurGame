import type { Color } from "../data/Colors";

type ColorTileProps = {
  color: Color;
  onClick?: () => void;
};

function ColorTile({ color, onClick }: ColorTileProps) {
  return (
    <button
      type="button"
      aria-label={color.name}
      title={color.name}
      onClick={onClick}
      className="w-full h-50 bg-gray-300 rounded-xl border-dashed border-3 border-blue-200 hover:scale-105 transition-transform"
      style={{ backgroundColor: color.hex }}
    />
  );
}

export default ColorTile;