import { useState } from "react";
import { useAppContext } from "../../../context/AppContext.jsx";
import Button from "../../styles/Button";

function PositionsListForm({ positions, onAddPosition, onRemovePosition }) {
  const [newPosition, setNewPosition] = useState("");
  const { isDark } = useAppContext();

  const handleAdd = () => {
    const trimmed = newPosition.trim();
    if (trimmed !== "") {
      const ok = onAddPosition(trimmed);
      if (ok) setNewPosition("");
    }
  };

  const handleRemove = (pos) => {
    onRemovePosition(pos);
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <input
          type="text"
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Nueva posición"
          className={`text-xs ${
            isDark ? "text-white" : "text-black"
          } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
        />
        <Button type="button" onClick={handleAdd}>
          Agregar
        </Button>
      </div>

      <ul className="min-h-[48px] flex flex-wrap gap-2 items-start">
        {positions.map((position, index) => (
          <li key={index} className="text-xs">
            <button
              type="button"
              onClick={() => handleRemove(position)}
              className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 hover:cursor-pointer transition-colors"
            >
              {position} <span className="ml-1 font-bold">✕</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PositionsListForm;
