import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../auth/auth.services";
import { errorToast, successToast } from "../toast/NotificationToast";
import Button1 from "../styles/Button1";
import Button from "../styles/Button";
import { jwtDecode } from "jwt-decode";
import { AuthenticationContext } from "../services/auth.context";
import { API_BASE_URL } from "../../config/api";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useAppContext } from "../../context/AppContext.jsx";

const inputStyle =
  "text-xs text-gray-500 font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";

const Login = ({ setIsLogged }) => {
  const { isDark, toggleTheme } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { handleUserLogin } = useContext(AuthenticationContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrors({ ...errors, email: true });
      emailRef.current.focus();
      errorToast("Email inválido");
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ ...errors, password: true });
      passwordRef.current.focus();
      errorToast(
        "La contraseña es inválida. Debe tener al menos 8 caracteres, una mayúscula y un número."
      );
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        errorToast(errorData.detail || "Error al iniciar sesión");
        return;
      }

      const token = await res.text();
      handleUserLogin(token);

      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      successToast("Inicio de sesión exitoso.");

      if (userRole === "2") navigate("/superadmin");
      else if (userRole === "1") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      errorToast("Error al conectar con el servidor.");
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden md:block w-3/4">
        <li>
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className={`absolute bottom-12 left-12 flex items-center w-14 h-7 rounded-full transition-colors duration-500 cursor-pointer
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] grayscale brightness-[0.3]"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className={`w-full md:w-1/2 ${
          isDark ? "bg-[#1c1c1c]" : "bg-[#f5f3f0]"
        }  flex items-center justify-center`}
      >
        <div className="w-full h-auto flex flex-col max-w-md">
          <h1
            className={`text-md font-bold text-start ${
              isDark ? "text-[#f5f3f0]" : "text-[#1c1c1c]"
            }`}
          >
            <p className="mb-2 font-light"> Bienvenidos a</p>
            <span className="text-5xl flex flex-row mb-4">
              <p className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
                Football
              </p>
              <p
                className={`font-normal ${
                  isDark ? "text-[#f5f3f0]" : "text-[#1c1c1c]"
                }`}
              >
                Finder
              </p>
            </span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Ingresar email"
                ref={emailRef}
                value={email}
                onChange={handleEmailChange}
                className={inputStyle}
              />

              <input
                type="password"
                name="password"
                placeholder="Ingresar contraseña"
                ref={passwordRef}
                value={password}
                onChange={handlePasswordChange}
                className={inputStyle}
              />
            </div>

            <div className="flex justify-end">
              <Button1 type="submit">Iniciar Sesión</Button1>
            </div>
          </form>
          <div
            className={` ${
              isDark
                ? "text-[#f5f3f0] border-gray-700"
                : "border-gray-400 text-[#1c1c1c]"
            } text-start pt-3 border-t  mt-6`}
          >
            <p className="text-xs font-light mb-3">
              ¿Aún no tienes una cuenta?
            </p>
            <Button type="button" onClick={handleNavigateToRegister}>
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
