import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import GameItem from "./GameItem.jsx";
import { jwtDecode } from "jwt-decode";
import SearchInput from "../../searchInput/SearchInput.jsx";
import { TittleCard } from "../../styles/Cards.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";
import { API_BASE_URL } from "../../../config/api.js";

function GamesAvlb() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthenticationContext);
  const { isDark } = useAppContext();

  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const decoded = jwtDecode(token);

    fetch(`${API_BASE_URL}/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status == 404) {
            return res.json().then((data) => {
              throw new Error("No hay juegos disponibles");
            });
          }
          throw new Error("Failed to fetch games");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        console.log(decoded.id)
        const filteredGames = data.filter(
          (game) => game.creator.id != decoded.id
        );
        console.log(filteredGames)
        setGames(filteredGames);
        setFilteredGames(filteredGames);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error loading games.");
        setLoading(false);
      });
  }, [token]);

  if (loading)
    return (
      <div
        className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
          isDark
            ? "bg-gradient-to-r from-black via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
        }`}
      >
        <p>Cargando juegos...</p>
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
  if (games.length === 0)
    return (
      <div
        className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
          isDark
            ? "bg-gradient-to-r from-black via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
        }`}
      >
        <p>No hay juegos disponibles.</p>
      </div>
    );

  const handleChangeQuery = (query) => {
    setQuery(query);
    if (!query) {
      setFilteredGames(games);
      return;
    }
    const filtered = games.filter(
      (game) =>
        game.creator.name.toLowerCase().includes(query.toLowerCase()) ||
        game.propertyName
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        game.field
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        game.date.toLowerCase().includes(query.toLowerCase()) ||
        game.propertyZone
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  return (
    <div
      className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
        isDark
          ? "bg-gradient-to-r from-black via-gray-900 to-black"
          : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
      }`}
    >
      <h1
        className={`text-lg font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Busca partidos disponibles
      </h1>
      <SearchInput query={query} setQuery={handleChangeQuery} />
      <div className="flex flex-col gap-8 w-full items-center ">
        {filteredGames.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default GamesAvlb;
