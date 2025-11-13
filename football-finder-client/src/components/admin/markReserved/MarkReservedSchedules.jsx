import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";
import { isInAWeek } from "../../utils/validations.js";

import Button from "../../styles/Button.jsx";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import useConfirmModal from "../../../hooks/useConfirmModal.jsx";
import { API_BASE_URL } from "../../../config/api.js";

function MarkReservedSchedules() {
  const { isDark } = useAppContext();
  const navigate = useNavigate();
  const { token } = useContext(AuthenticationContext);
  const { show, Modal } = useConfirmModal();

  const [fieldSchedules, setFieldSchedules] = useState([]);
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState("");

  const getFieldsSchedules = (actualDate) => {
    fetch(`${API_BASE_URL}/properties/property-schedules?date=${actualDate}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Error al obtener los horarios de la cancha");
        return res.json();
      })
      .then((data) => setFieldSchedules(data))
      .catch((err) => errorToast(err.message));
  };

  const handleChangeDate = (e) => {
    const newDate = e.target.value;
    if (!isInAWeek(newDate)) {
      errorToast("La fecha debe ser dentro de una semana");
    } else {
      setDate(newDate);
      getFieldsSchedules(newDate);
      setSelected([]);
    }
  };

  const toggleSelect = (fieldId, scheduleId) => {
    const exists = selected.some(
      (s) => s.fieldId === fieldId && s.scheduleId === scheduleId
    );
    if (exists) {
      setSelected(
        selected.filter(
          (s) => !(s.fieldId === fieldId && s.scheduleId === scheduleId)
        )
      );
    } else {
      setSelected([...selected, { fieldId, scheduleId }]);
    }
  };

  const confirmReservation = () => {
    if (selected.length === 0) {
      return errorToast("Seleccioná al menos un horario");
    }

    show({
      title: "Confirmar horarios reservados",
      message: `Se marcarán ${selected.length} horarios como reservados para la fecha ${date}.`,
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: () => saveReservations(),
    });
  };

  const saveReservations = () => {
    fetch(`${API_BASE_URL}/properties/crossout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date,
        scheduleFields: selected,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Error al marcar horarios");
          });
        }
        return res.json();
      })
      .then(() => {
        successToast("Horarios marcados correctamente");
        navigate("/admin", { replace: true });
      })
      .catch((err) => errorToast(err.message));
  };

  return (
    <div
      className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
        isDark
          ? "bg-gradient-to-r from-black via-gray-900 to-black"
          : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
      }`}
    >
      <Modal />
      <div
        className={`flex flex-col items-start ${
          isDark ? "bg-white/10" : "bg-gray-200"
        } backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2 mt-15`}
      >
        <h1
          className={`text-lg font-semibold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Seleccione una fecha
        </h1>
        <input
          type="date"
          className={`text-xs ${
            isDark ? "text-white" : "text-black"
          } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
          value={date}
          onChange={handleChangeDate}
        />
        {date && (
          <div className="w-full">
            <h2
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Marque los horarios a reservar
            </h2>

            {fieldSchedules.map((field) => (
              <div key={field.fieldId} className="mb-8">
                <span className="text-sm font-semibold text-white bg-gray-700 px-3 py-1 rounded-md">
                  F{field.fieldType}
                </span>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {field.schedules.map((sch) => {
                    const isSelected = selected.some(
                      (s) =>
                        s.scheduleId === sch.scheduleId &&
                        s.fieldId === field.fieldId
                    );

                    const baseClasses =
                      "relative list-none px-4 py-3 text-xs font-semibold rounded border-2 transition-all cursor-pointer";

                    const selectedClasses = isSelected
                      ? "border-red-500 bg-red-500/40"
                      : "border-gray-300 hover:border-red-400";

                    return (
                      <li
                        key={sch.scheduleId}
                        className={`${baseClasses} ${selectedClasses}`}
                        onClick={() =>
                          toggleSelect(field.fieldId, sch.scheduleId)
                        }
                      >
                        {sch.schedule} hs
                      </li>
                    );
                  })}
                </div>
              </div>
            ))}

            <Button onClick={confirmReservation}>Confirmar Reservas</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarkReservedSchedules;
