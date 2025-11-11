import { useAppContext } from "../../../context/AppContext.jsx";
import { colorStrong } from "../../styles/Cards.jsx";

function AppItem({ app }) {
    const { isDark } = useAppContext();
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Partido de:</strong>{" "}
        {app.game.creator.name}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Dia y hora:</strong>{" "}
        {app.game.date} -{" "}
        {app.game.schedule}hs
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Cancha:</strong>{" "}
        {app.game.propertyZone} -{" "}
        {app.game.propertyAdress}
      </p>

      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Estado:</strong> {app.state}
      </p>
    </div>
  );
}

export default AppItem;
