import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import Button1 from "../../styles/Button1";
import useConfirmModal from "../../../hooks/useConfirmModal";
import { useAppContext } from "../../../context/AppContext";

function AppItem({ application, onAcceptApplication }) {
  const { token } = useContext(AuthenticationContext);
  const { show, Modal } = useConfirmModal();
  const { isDark } = useAppContext();

  const handleAcceptApp = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/participations/acepted-application/${application.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          throw new Error(data.message || "Error al aplicar para el juego");
        }
        throw new Error("Error al aceptar la solicitud");
      }

      const data = await res.json();
      if (data) {
        successToast("Solicitud aceptada correctamente");
        onAcceptApplication(application.id, application.userApplicant);
      }
    } catch (err) {
      errorToast(err.message);
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Modal />
      <li
        key={application.id}
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        {application.userApplicant.name} ({application.userApplicant.email})
      </li>

      <Button1
        onClick={() =>
          show({
            title: "¿Aceptar solicitud?",
            message: `¿Estás seguro de que querés aceptar a ${application.userApplicant.name}?`,
            confirmText: "Aceptar",
            cancelText: "Cancelar",
            onConfirm: handleAcceptApp,
          })
        }
      >
        Aceptar
      </Button1>
    </div>
  );
}

export default AppItem;
