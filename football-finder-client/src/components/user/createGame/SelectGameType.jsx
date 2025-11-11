import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import Button from "../../styles/Button";
import Button1 from "../../styles/Button1";

const SelectGameType = () => {
  const { isDark } = useAppContext();
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-center justify-center w-full min-h-screen pt-32 pb-28 px-4 ${
        isDark
          ? "bg-gradient-to-r from-black via-gray-900 to-black"
          : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-6 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        ¿Cómo querés crear tu partido?
      </h2>

      <div className="flex flex-col sm:flex-row gap-6">
        <Button1
          onClick={() => navigate("/user/create-game/app")}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl shadow-md transition"
        >
          Crear partido con Football Finder
        </Button1>

        <Button
          onClick={() => navigate("/user/create-game/external")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl shadow-md transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Crear partido externo
        </Button>
      </div>
    </div>
  );
};

export default SelectGameType;
