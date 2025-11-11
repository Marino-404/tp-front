import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import Button from "../../styles/Button.jsx";
import useConfirmModal from "../../../hooks/useConfirmModal.jsx";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { successToast, errorToast } from "../../toast/NotificationToast.jsx";

const ExternalGameForm = () => {
  const { isDark } = useAppContext();
  const navigate = useNavigate();
  const { token } = useContext(AuthenticationContext);
  const { show, Modal } = useConfirmModal();

  const [formData, setFormData] = useState({
    fieldName: "",
    date: "",
    time: "",
    fieldType: "",
    missingPlayers: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createExternalGame = () => {
    fetch(`${import.meta.env.VITE_API_URL}/games/external`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        field_name: formData.fieldName,
        date: formData.date,
        time: formData.time,
        field_type: formData.fieldType,
        missing_players: Number(formData.missingPlayers),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(
              data.message || "Error al crear el partido externo"
            );
          });
        }
        return res.json();
      })
      .then(() => {
        successToast("Partido externo creado correctamente");
        navigate("/user/my-games", { replace: true });
      })
      .catch((err) => errorToast(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.missingPlayers <= 0 || formData.missingPlayers > 10) {
      return errorToast("Ingresá un número válido de jugadores (1-10)");
    }

    show({
      title: "¿Deseás crear este partido externo?",
      message: `Predio: ${formData.fieldName}\nFecha: ${formData.date} ${formData.time}\nCancha: ${formData.fieldType}\nJugadores faltantes: ${formData.missingPlayers}`,
      confirmText: "Crear partido",
      cancelText: "Cancelar",
      onConfirm: createExternalGame,
    });
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
        } backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-full max-w-lg mt-10`}
      >
        <h1
          className={`text-lg font-semibold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Crear partido externo
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <label
            htmlFor="fieldName"
            className={`block text-sm font-semibold ${
              isDark ? "text-white" : "text-black"
            } mb-2`}
          >
            Nombre del predio
          </label>
          <input
            id="fieldName"
            name="fieldName"
            placeholder="Tifosi"
            value={formData.fieldName}
            onChange={handleChange}
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3 mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none rounded-none`}
          />

          <label
            htmlFor="date"
            className={`block text-sm font-semibold ${
              isDark ? "text-white" : "text-black"
            } mb-2`}
          >
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3 mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none rounded-none`}
          />

          {/* Horario */}
          <label
            htmlFor="time"
            className={`block text-sm font-semibold ${
              isDark ? "text-white" : "text-black"
            } mb-2`}
          >
            Horario
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3 mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none rounded-none`}
          />

          {/* Tipo de cancha */}
          <label
            htmlFor="fieldType"
            className={`block text-sm font-semibold ${
              isDark ? "text-white" : "text-black"
            } mb-2`}
          >
            Tipo de cancha
          </label>
          <select
            id="fieldType"
            name="fieldType"
            value={formData.fieldType}
            onChange={handleChange}
            className={`text-xs ${
              isDark ? "text-white bg-gray-800" : "text-black bg-gray-200"
            } font-bold w-full py-3 mb-6 border-b-2 border-gray-500 focus:border-blue-500 outline-none rounded-none`}
          >
            <option value="">Seleccioná el tipo de cancha</option>
            <option value="5">Cancha de 5</option>
            <option value="7">Cancha de 7</option>
            <option value="11">Cancha de 11</option>
          </select>

          {/* Jugadores faltantes */}
          <label
            htmlFor="missingPlayers"
            className={`block text-sm font-semibold ${
              isDark ? "text-white" : "text-black"
            } mb-2`}
          >
            Jugadores faltantes
          </label>
          <input
            type="number"
            id="missingPlayers"
            name="missingPlayers"
            placeholder="Ej: 3"
            min="1"
            max="10"
            value={formData.missingPlayers}
            onChange={handleChange}
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3 mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none rounded-none`}
          />

          <Button type="submit">Crear partido</Button>
        </form>
      </div>
    </div>
  );
};

export default ExternalGameForm;
