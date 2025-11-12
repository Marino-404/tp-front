import React, { useState } from 'react'
import { useEffect } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast } from "../../toast/NotificationToast";
import { TittleCard, inputStyle, colorStrong } from "../../styles/Cards";
import Button1 from "../../styles/Button1";
import AppItem from "./AppItem";
import { useAppContext } from "../../../context/AppContext";
import { API_BASE_URL } from "../../../config/api";



function GameItem({ game }) {
  const { isDark } = useAppContext();

  const [applications, setApplications] = useState(game.applications);
  const [usersInGame, setUsersInGame] = useState(game.players);

  console.log(game)


  const onAcceptApplication = (applicationId, user) => {
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== applicationId)
    );
    setUsersInGame((prevUsers) => [...prevUsers, user]);
  };
  return (
    <li
      className="border-2 border-gray-500 p-4 rounded-lg"
      key={game.id}
    >
      <h2
        className={`text-xs ${isDark ? "text-white" : "text-black"
          } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Predio: </strong>
        {game.propertyName}
      </h2>
      <p
        className={`text-xs ${isDark ? "text-white" : "text-black"
          } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Fecha: </strong>
        {game.date}
      </p>
      <p
        className={`text-xs ${isDark ? "text-white" : "text-black"
          } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Hora: </strong>
        {game.schedule}
        <strong className={colorStrong}> hs</strong>
      </p>
      <p
        className={`text-xs ${isDark ? "text-white" : "text-black"
          } font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none`}
      >
        <strong className={colorStrong}>Jugadores restantes: </strong>
        {game.missing_players}
      </p>
      <p
        className={`text-xs ${isDark ? "text-white" : "text-black"
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

      {usersInGame.length > 0 && (
        <h2 className="text-lg text-blue-400 font-semibold mb-1 mt-6">
          Jugadores confirmados:
        </h2>
      )}

      <ul className="flex flex-col gap-2">
        {usersInGame.map((user) => (
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
      {applications.length > 0 && (
        <h2 className="text-lg text-blue-400 font-semibold mb-1 mt-6">
          Postulaciones pendientes:
        </h2>
      )}
      <ul className="flex flex-col gap-2">
        {applications.map((application) => (
          <AppItem
            key={application.id}
            application={application}
            onAcceptApplication={onAcceptApplication}
          />
        ))}
      </ul>
    </li>
  )
}

export default GameItem