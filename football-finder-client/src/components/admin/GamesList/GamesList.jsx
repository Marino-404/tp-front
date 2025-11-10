import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { ContainerStyle } from "../../styles/Container";
import { CardContainer, TittleCard } from "../../styles/Cards";
import { inputStyle, colorStrong } from "../../styles/Cards";

import { API_BASE_URL } from "../../../config/api.js";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/games/by-property?reservationState=aceptada`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            return res.json().then((data) => {
              throw new Error(data.message || "Error al obtener los partidos");
            });
          }
          throw new Error("Error al obtener los partidos");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log(data)
          setGames(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [token]);

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando juegos...</p>
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
      <div className={CardContainer}>
        <h2 className={TittleCard}>Partidos agendados</h2>
        {loading ? (
          <p>Cargando partidos...</p>
        ) : games.length === 0 ? (
          <p>No hay partidos agendados para este predio</p>
        ) : (
          <ul className="flex flex-col w-full gap-12">
            {games.map((game) => (
              <li
                className="border-2 border-gray-500 p-4 rounded-lg"
                key={game.id}
              >
                <h2 className={inputStyle}>
                  <strong className={colorStrong}>A nombre de: </strong>
                  {game.creator.name}
                </h2>
                <h2 className={inputStyle}>
                  <strong className={colorStrong}>Dia y hora: </strong>{" "}
                  {game.date} - {game.schedule}
                  :00<strong className={colorStrong}> hs</strong>
                </h2>
                <h2 className={inputStyle}>
                  <strong className={colorStrong}>Cancha: </strong>
                  {game.field}
                </h2>
                <h2 className={inputStyle}>
                  {" "}
                  <strong className={colorStrong}>Estado: </strong>
                  Aceptada
                </h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GamesList;
