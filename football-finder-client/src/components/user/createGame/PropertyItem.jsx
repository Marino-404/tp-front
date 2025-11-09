import { inputStyle, colorStrong } from "../../styles/Cards.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";

import Button1 from "../../styles/Button1.jsx";
import { FaArrowRight } from "react-icons/fa";

function PropertyItem({ property }) {
  const { isDark } = useAppContext();

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="text-lg text-blue-400 font-semibold mb-4">
        {property.name}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Zona:</strong> {property.zone}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Dirección:</strong> {property.adress}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Horarios:</strong>{" "}
        {property.schedules.map((sch) => `${sch.schedule} hs`).join(" - ")}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Canchas disponibles:</strong>{" "}
        {property.fields.map((fld) => fld.field_type).join(" - ")}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-gray-400" : "text-white"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <Button1
          children={
            <a
              className="flex items-center"
              href={`/user/reservation/${property.id}`}
            >
              Ver disponibilidad <FaArrowRight className="ms-2" />
            </a>
          }
        />
      </p>
    </div>
  );
}

export default PropertyItem;
