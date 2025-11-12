import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx";
import { inputStyle, colorStrong } from "../../styles/Cards.jsx";
import Button1 from "../../styles/Button1.jsx";
import useConfirmModal from "../../../hooks/useConfirmModal";
import { useAppContext } from "../../../context/AppContext.jsx";
import { API_BASE_URL } from "../../../config/api.js";
import { jwtDecode } from "jwt-decode";

const GameItem = ({ game }) => {
  const { token } = useContext(AuthenticationContext);
  const { show, Modal } = useConfirmModal();
  const { isDark } = useAppContext();
  const decoded = jwtDecode(token);

  const handleApply = async () => {
    const participationData = {
      GameId: game.id,
      UserId: decoded.id,
      Type : "postulacion"
    };
    fetch(`${API_BASE_URL}/participations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(participationData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json().then((data) => {
              throw new Error(data.detail || "Error al aplicar para el juego");
            });
          }
          throw new Error("Error al aplicar para el juego");
        }
        return response.json();
      })
      .then(() => {
        successToast("Postulación enviada correctamente");
      })
      .catch((error) => {
        errorToast(error.message);
      });
  };

  return (
    <div
      className={`flex flex-col items-start ${
        isDark ? "bg-white/10" : "bg-gray-200"
      } backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2 mt-15`}
    >
      <Modal />
      <h2
        className={`text-lg font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Partidos disponibles
      </h2>
      <ul className="flex flex-col w-full gap-3">
        <li className="border-2 border-gray-500 p-4 rounded-lg">
          <ul>
            <li
              className={`text-xs ${
                isDark ? "text-white" : "text-black"
              } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
            >
              <strong className={colorStrong}>Creador: </strong>
              {game.creator.name}
            </li>
            <li
              className={`text-xs ${
                isDark ? "text-white" : "text-black"
              } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
            >
              <strong className={colorStrong}>Predio: </strong>
              {game.propertyName}
            </li>
            <li
              className={`text-xs ${
                isDark ? "text-white" : "text-black"
              } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
            >
              <strong className={colorStrong}>Fecha: </strong>
              {game.date}
            </li>
            <li
              className={`text-xs ${
                isDark ? "text-white" : "text-black"
              } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
            >
              <strong className={colorStrong}>Hora: </strong>
              {game.schedule} hs
            </li>
            <li
              className={`text-xs ${
                isDark ? "text-white" : "text-black"
              } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
            >
              <strong className={colorStrong}>Zona: </strong>
              {game.propertyZone}
            </li>
            <li
              className={`text-xs ${
                isDark ? "text-white" : "text-black"
              } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
            >
              <strong className={colorStrong}>Cancha: </strong>
              {game.field}
            </li>
            <li
              className={`text-xs ${
                isDark ? "text-white" : "text-black"
              } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
            >
              <strong className={colorStrong}>Dirección: </strong>
              {game.propertyAdress}
            </li>
            <Button1
              onClick={() =>
                show({
                  title: `¿Estás seguro que deseas postularte al partido de ${game.creator.name}?`,
                  message: "Una vez enviado, el creador decidirá si aceptarte.",
                  confirmText: "Postularme",
                  cancelText: "Cancelar",
                  onConfirm: handleApply,
                })
              }
            >
              Postularse
            </Button1>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default GameItem;
