import { colorStrong } from "../../styles/Cards.jsx";

function AppItem({ app }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Partido de:</strong>{" "}
        {app.gameApplied.userCreator.name}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Dia y hora:</strong>{" "}
        {app.gameApplied.reservation.date} -{" "}
        {app.gameApplied.reservation.schedule.schedule}hs
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Cancha:</strong>{" "}
        {app.gameApplied.reservation.schedule.property.zone} -{" "}
        {app.gameApplied.reservation.schedule.property.adress}
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
