import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { AuthenticationContext } from "../services/auth.context";
import { useContext, useState } from "react";
import ConfirmModal from "../modal/ConfirmModal.jsx";
import { useAppContext } from "../../context/AppContext.jsx"; // 👈 importamos el store global

const NavBar = ({ links = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleUserLogout } = useContext(AuthenticationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 👇 usamos el contexto global
  const { isDark, toggleTheme } = useAppContext();

  const handleLogoutClick = () => setIsModalOpen(true);
  const handleCancelLogout = () => setIsModalOpen(false);
  const handleConfirmLogout = () => {
    handleUserLogout();
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Cerrar sesión"
        message="¿Estás seguro de que querés cerrar sesión?"
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
      />

      <nav
        className={`fixed top-0 w-screen h-[60px] z-50 flex items-center justify-between px-12 
        transition-colors duration-500 border-b shadow-md backdrop-blur-md
        ${
          isDark
            ? "bg-black/40 border-white/10 text-white"
            : "bg-white/70 border-black/10 text-gray-800"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-row items-center">
          <Link to="/" className="flex">
            <p
              className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
              ${
                isDark
                  ? "from-blue-400 to-blue-900"
                  : "from-blue-600 to-blue-400"
              }`}
            >
              Football
            </p>
            <p className="text-xl">Finder</p>
          </Link>
        </div>

        {/* Links y botones */}
        <div className="flex items-center px-12">
          <ul className="flex gap-11 items-center">
            {links.map((link) => {
              const isActive = location.pathname === link.url;
              return (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    className={`relative text-sm font-semibold transition-all duration-300
                      ${
                        isActive
                          ? isDark
                            ? "text-blue-400"
                            : "text-blue-600"
                          : isDark
                          ? "hover:text-white"
                          : "hover:text-gray-700"
                      }
                      after:absolute after:left-0 after:top-4 after:translate-y-1/2 after:rounded-full
                      after:h-[2px] after:bg-blue-400 after:w-0 hover:after:w-full 
                      after:transition-all after:duration-500`}
                  >
                    {link.item}
                  </Link>
                </li>
              );
            })}

            {/* Switch de tema */}
            <li>
              <button
                onClick={toggleTheme}
                aria-label="Cambiar tema"
                className={`relative flex items-center w-14 h-7 rounded-full transition-colors duration-500 cursor-pointer
                  ${isDark ? "bg-gray-300" : "bg-gray-700"}`}
              >
                <span
                  className={`absolute flex items-center justify-center w-6 h-6 rounded-full shadow-md transform transition-transform duration-500
                    ${
                      isDark
                        ? "translate-x-7 bg-gray-700"
                        : "translate-x-1 bg-gray-300"
                    }`}
                >
                  {isDark ? (
                    <MdOutlineLightMode className="text-yellow-400 text-[16px]" />
                  ) : (
                    <MdOutlineDarkMode className="text-gray-800 text-[16px]" />
                  )}
                </span>
              </button>
            </li>

            {/* Logout */}
            <li>
              <MdLogout
                className={`text-2xl cursor-pointer transition ${
                  isDark
                    ? "hover:text-red-400"
                    : "hover:text-red-600 text-gray-700"
                }`}
                onClick={handleLogoutClick}
                title="Cerrar sesión"
              />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
