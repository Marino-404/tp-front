import { useAppContext } from "../../context/AppContext.jsx";

const Footer = () => {
  const { isDark } = useAppContext();

  return (
    <>
      <div
        className={`w-full h-[1px] bg-gradient-to-r ${
          isDark
            ? "from-black via-gray-600 to-black"
            : "from-gray-200 via-gray-400 to-gray-200"
        }`}
      ></div>

      <footer
        className={`w-full pt-24 pb-24 px-4 bg-gradient-to-r transition-colors duration-500 ${
          isDark
            ? "from-black via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-row w-full justify-center items-center mb-4">
            <p
              className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-blue-400 to-blue-900"
                  : "from-blue-600 to-blue-400"
              }`}
            >
              Football
            </p>
            <p
              className={`text-4xl ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Finder
            </p>
          </div>

          <p
            className={`text-sm select-none ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
