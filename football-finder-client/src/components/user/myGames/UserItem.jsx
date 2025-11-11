import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import Button from "../../styles/Button";
import { colorStrong } from "../../styles/Cards";
import useConfirmModal from "../../../hooks/useConfirmModal";
import { useAppContext } from "../../../context/AppContext";
import { API_BASE_URL } from "../../../config/api";

function UserItem({ user }) {
  const { isDark } = useAppContext();
  const { gid } = useParams();
  const { token } = useContext(AuthenticationContext);
  const { show, Modal } = useConfirmModal();

  const handleInvite = () => {
    const participationData = {
      GameId: parseInt(gid),
      userId: user.id,
      Type : "invitacion"
    };
    fetch(
      `${API_BASE_URL}/participations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(participationData),
      }
    )
      .then(async (res) => {
        if (!res.ok) {
        const errorData = await res.json(); 
        console.log("Error del backend:", errorData);
        throw new Error(errorData.detail || "Error al enviar la invitación");
        }
        successToast("¡Invitación enviada!");
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message || "Error al enviar la invitación");
      });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Modal />

      <p
        className={`text-lg font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {user.name}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Posiciones:</strong>
        {user.positions.map((pos, index) => (
          <span key={index}>
            {pos.position}
            {index < user.positions.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Canchas:</strong>
        {user.fieldsType.map((field, index) => (
          <span key={index}>
            {field.field}
            {index < user.fieldsType.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Zona:</strong>
        {user.zone}
      </p>

      <Button
        onClick={() =>
          show({
            title: `¿Estás seguro que deseas invitar a ${user.name} a tu partido?`,
            message:
              "Se enviará una invitación al usuario para unirse al partido.",
            confirmText: "Invitar",
            cancelText: "Cancelar",
            onConfirm: handleInvite,
          })
        }
      >
        Invitar
      </Button>
    </div>
  );
}

export default UserItem;
