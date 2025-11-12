import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast } from "../../toast/NotificationToast";
import InvItem from "./InvItem.jsx";
import AppItem from "./AppItem.jsx";
import { CardContainer, TittleCard } from "../../styles/Cards.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";
import { API_BASE_URL } from "../../../config/api.js";

function Participations() {
  const { isDark } = useAppContext();
  const { token } = useContext(AuthenticationContext);
  const [applications, setApplications] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loadingApp, setLoadingApp] = useState(true);
  const [loadingInv, setLoadingInv] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${API_BASE_URL}/participations/my-participations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al obtener las participaciones");
          return;
        }
        return res.json();
      })
      .then((data) => {
        const filteredApplications = data.applications.filter(
          (app) => app.state == "pendiente"
        );
        const filteredInvitations = data.invitations.filter(
          (app) => app.state == "pendiente"
        );
        setApplications(filteredApplications);
        setInvitations(filteredInvitations);
        setLoadingApp(false);
        setLoadingInv(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoadingApp(false);
      });
  });

  const handleInvitationAccepted = (id) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };

  if (loadingApp || loadingInv)
    return (
      <div
        className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
          isDark
            ? "bg-gradient-to-r from-black via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
        }`}
      >
        <p>Cargando participaciones del usuario...</p>
      </div>
    );
  if (error)
    return (
      <div
        className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
          isDark
            ? "bg-gradient-to-r from-black via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
        }`}
      >
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div
      className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
        isDark
          ? "bg-gradient-to-r from-black via-gray-900 to-black"
          : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
      }`}
    >
      {applications.length === 0 && invitations.length === 0 ? (
        <p className={` ${isDark ? "text-white" : "text-gray-900"} text-lg`}>
          No tienes postulaciones ni invitaciones
        </p>
      ) : (
        <div
          className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
            isDark
              ? "bg-gradient-to-r from-black via-gray-900 to-black"
              : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
          }`}
        >
          {applications.length > 0 && (
            <div
              className={`flex flex-col items-start ${
                isDark ? "bg-white/10" : "bg-gray-200"
              } backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2 mt-15`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Postulaciones
              </h2>
              <ul className="flex flex-col items-start justify-start w-full gap-6">
                {applications.map((app) => (
                  <li
                    key={app.id}
                    className="flex flex-col items-start justify-start w-full border-2 border-gray-500 p-4 rounded-lg"
                  >
                    <AppItem app={app} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {invitations.length > 0 && (
            <div
              className={`flex flex-col items-start ${
                isDark ? "bg-white/10" : "bg-gray-200"
              } backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2 mt-15`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Invitaciones
              </h2>
              <ul className="flex flex-col items-start justify-start w-full gap-6">
                {invitations.map((inv) => (
                  <li
                    key={inv.id}
                    className="flex flex-col items-start justify-start w-full border-2 border-gray-500 p-4 rounded-lg"
                  >
                    <InvItem inv={inv} onAccept={handleInvitationAccepted} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Participations;
