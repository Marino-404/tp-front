import { Route, Routes } from "react-router-dom";
import NavBar from "../../navbar/NavBar";

import Profile from "../profile/Profile.jsx";
import UpdateForm from "../profile/UpdateForm.jsx";
import GamesAvlb from "../gamesAvlb/GamesAvlb.jsx";
import Participations from "../participations/Participations.jsx";
import MyGames from "../myGames/MyGames.jsx";
import UsersList from "../myGames/UsersList.jsx";
import CreateGame from "../createGame/CreateGame.jsx";
import PropertySchedules from "../createGame/propertySchedules/PropertySchedules.jsx";
import SelectGameType from "../createGame/SelectGameType.jsx";
import ExternalGameForm from "../createGame/ExternalGameForm.jsx";

const UserDashboard = () => {
  return (
    <>
      <NavBar
        links={[
          { item: "Crear juego", url: "/user" },
          { item: "Lista de partidos", url: "/user/availables-games" },
          { item: "Invitaciones y Postulaciones", url: "/user/participations" },
          { item: "Mis partidos", url: "/user/my-games" },
          { item: "Mi perfil", url: "/user/profile" },
        ]}
      />

      <Routes>
        <Route index element={<SelectGameType />} />
        <Route path="create-game/app" element={<CreateGame />} />
        <Route path="create-game/external" element={<ExternalGameForm />} />
        <Route path="reservation/:pid" element={<PropertySchedules />} />
        <Route path="profile" element={<Profile />} />
        <Route path="update/:uid" element={<UpdateForm />} />
        <Route path="availables-games" element={<GamesAvlb />} />
        <Route path="participations" element={<Participations />} />
        <Route path="my-games" element={<MyGames />} />
        <Route path="users-list/:gid" element={<UsersList />} />
      </Routes>
    </>
  );
};

export default UserDashboard;
