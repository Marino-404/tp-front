import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import GameItem from "./GameItem.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import { CardContainer } from "../../styles/Cards.jsx";
import { API_BASE_URL } from "../../../config/api.js";

function ListaGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthenticationContext);
  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }
    fetch(`${API_BASE_URL}/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch games");
        }
        return res.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading games.");
        setLoading(false);
      });
  }, []);

  const onDelete = (gameId) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
  }
  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando Juegos...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className={ContainerStyle}>
      {games.map((game) => (
        <div
          className="flex flex-col mb-6 items-start bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2"
          key={game.id}
        >
          <GameItem game={game} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

export default ListaGames;
