import { useEffect } from "react";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast } from "../../toast/NotificationToast";
import { TittleCard, inputStyle, colorStrong } from "../../styles/Cards";
import Button1 from "../../styles/Button1";
import AppItem from "./AppItem";
import { useAppContext } from "../../../context/AppContext";
import { API_BASE_URL } from "../../../config/api";

function MyGames() {
  const { isDark } = useAppContext();
  const [games, setGames] = useState([]);
  const [applications, setApplications] = useState([]);
  const [usersInGame, setUsersInGame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/games/my-games`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al cargar los juegos");
          setError(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setGames(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        errorToast("Error al cargar los juegos");
      });
  }, []);

  const onAcceptApplication = (applicationId, user) => {
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== applicationId)
    );
    setUsersInGame((prevUsers) => [...prevUsers, { player: user }]);
  };

  if (loading)
    return (
      <div
        className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
          isDark
            ? "bg-gradient-to-r from-black via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
        }`}
      >
        <p>Cargando mis juegos...</p>
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
        <p className="text-red-500">{error}</p>;
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
      {loading && <p>Cargando juegos...</p>}
      {error && <p>Error al cargar los juegos.</p>}
      {games.length === 0 && !loading ? (
        <p className={` ${isDark ? "text-white" : "text-gray-900"} text-lg`}>
          No tienes juegos creados.
        </p>
      ) : (
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
            Mis partidos
          </h2>
          <ul className="flex flex-col w-full gap-12">
            {games.map((game) => (
              <li
                className="border-2 border-gray-500 p-4 rounded-lg"
                key={game.id}
              >
                <h2
                  className={`text-xs ${
                    isDark ? "text-white" : "text-black"
                  } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
                >
                  <strong className={colorStrong}>Predio: </strong>
                  {game.propertyName}
                </h2>
                <p
                  className={`text-xs ${
                    isDark ? "text-white" : "text-black"
                  } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
                >
                  <strong className={colorStrong}>Fecha: </strong>
                  {game.date}
                </p>
                <p
                  className={`text-xs ${
                    isDark ? "text-white" : "text-black"
                  } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
                >
                  <strong className={colorStrong}>Hora: </strong>
                  {game.schedule}
                  <strong className={colorStrong}> hs</strong>
                </p>
                <p
                  className={`text-xs ${
                    isDark ? "text-white" : "text-black"
                  } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
                >
                  <strong className={colorStrong}>Jugadores restantes: </strong>
                  {game.missing_players}
                </p>
                <p
                  className={`text-xs ${
                    isDark ? "text-white" : "text-black"
                  } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
                >
                  <strong className={colorStrong}>Estado: </strong>
                  {game.state}
                </p>
                {game.state == "aceptada" && (
                  <Button1>
                    <a href={`/user/users-list/${game.id}`}>
                      Invitar jugadores
                    </a>
                  </Button1>
                )}

                {game.players.length > 0 && (
                  <h2 className="text-lg text-blue-400 font-semibold mb-1 mt-6">
                    Jugadores confirmados:
                  </h2>
                )}

                <ul className="flex flex-col gap-2">
                  {game.players.map((user) => (
                    <li
                      key={user.id}
                      className="text-xs text-white font-bold w-full py-3  mb-2 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none"
                    >
                      {user.name}{" "}
                      <strong className={colorStrong}>
                        ({user.email})
                      </strong>
                    </li>
                  ))}
                </ul>
                {game.applications.length > 0 && (
                  <h2 className="text-lg text-blue-400 font-semibold mb-1 mt-6">
                    Postulaciones pendientes:
                  </h2>
                )}
                <ul className="flex flex-col gap-2">
                  {game.applications.map((application) => (
                    <AppItem
                      key={application.id}
                      application={application}
                      onAcceptApplication={onAcceptApplication}
                    />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyGames;
