import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast } from "../../toast/NotificationToast.jsx";
import UpcomingGames from "../profile/UpcomingGames";
import Button1 from "../../styles/Button1.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import { TittleCard, inputStyle, colorStrong } from "../../styles/Cards.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";

const Profile = () => {
  const { isDark } = useAppContext();
  const { token } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasGames, setHasGames] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al obtener el perfil del usuario");
          setError("Error al obtener el perfil del usuario");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        errorToast("Error al obtener el perfil del usuario");
        setError("Error al obtener el perfil del usuario");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div
        className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
          isDark
            ? "bg-gradient-to-r from-black via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
        }`}
      >
        <p>Cargando datos del usuario...</p>
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
      {hasGames && (
        <div className="w-full mb-6">
          <UpcomingGames setHasGames={setHasGames} />
        </div>
      )}

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
          Perfil de usuario
        </h2>

        <div className="flex flex-col items-start w-full">
          <p
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
          >
            <strong className={colorStrong}>Nombre:</strong> {user.name}
          </p>
          <p
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
          >
            <strong className={colorStrong}>Email:</strong> {user.email}
          </p>
          <p
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
          >
            <strong className={colorStrong}>Edad:</strong> {user.age}
          </p>

          <p
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
          >
            <strong className={colorStrong}>Zona:</strong> {user.zone}
          </p>
          <p
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
          >
            <strong className={colorStrong}>Posiciones:</strong>{" "}
            {user.positions.map((pos) => pos.position).join(", ")}
          </p>
          <p
            className={`text-xs ${
              isDark ? "text-white" : "text-black"
            } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
          >
            <strong className={colorStrong}>Canchas de:</strong>{" "}
            {user.fieldsType.map((field) => field.field).join(", ")}
          </p>
        </div>
        <Button1 className="mt-4">
          <a href={`/user/update/${user.id}`}>Actualizar perfil</a>
        </Button1>
      </div>
    </div>
  );
};

export default Profile;
