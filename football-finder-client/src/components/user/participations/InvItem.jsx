import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import Button1 from "../../styles/Button1";
import { colorStrong } from "../../styles/Cards";
import useConfirmModal from "../../../hooks/useConfirmModal";

function InvItem({ inv, onAccept }) {
  const { token } = useContext(AuthenticationContext);
  const { show, Modal } = useConfirmModal();

  const handleAcept = () => {
    fetch(
      `http://localhost:8080/api/participations/acepted-invitation/${inv.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 400) {
          errorToast("El partido ya está completo");
          return;
        }
        if (!res.ok) {
          errorToast("Error al aceptar la invitación");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        successToast("Invitación aceptada correctamente");
        onAccept(inv.id);
      })
      .catch((err) => {
        errorToast("Error al aceptar la invitación");
        console.error(err);
      });
  };

  return (
    <>
      <Modal />

      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Te invitó:</strong>{" "}
        {inv.gameInvited.userCreator.name}
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Día y hora:</strong>{" "}
        {inv.gameInvited.reservation.date} -{" "}
        {inv.gameInvited.reservation.schedule.schedule}hs
      </p>
      <p
        className={`text-xs ${
          isDark ? "text-white" : "text-black"
        } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Cancha:</strong>{" "}
        {inv.gameInvited.reservation.schedule.property.zone} -{" "}
        {inv.gameInvited.reservation.schedule.property.adress}
      </p>

      <Button1
        onClick={() =>
          show({
            title: "¿Aceptar invitación?",
            message: `¿Estás seguro que deseas aceptar la invitación de ${inv.gameInvited.userCreator.name}?`,
            confirmText: "Aceptar",
            cancelText: "Cancelar",
            onConfirm: handleAcept,
          })
        }
      >
        Aceptar invitación
      </Button1>
    </>
  );
}

export default InvItem;
