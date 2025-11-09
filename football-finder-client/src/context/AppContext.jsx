import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Estado global del tema
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Actualizar el DOM y localStorage cada vez que cambie
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Función para alternar tema
  const toggleTheme = () => setIsDark((prev) => !prev);

  // 👉 acá podés agregar más estados globales si querés
  // const [user, setUser] = useState(null);
  // const [language, setLanguage] = useState("es");

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        // user,
        // setUser,
        // language,
        // setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useAppContext = () => useContext(AppContext);
