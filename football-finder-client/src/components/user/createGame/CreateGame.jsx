import { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import SearchInput from "../../searchInput/SearchInput.jsx";
import PropertyItem from "./PropertyItem.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";

const CreateGame = () => {
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProperties, setFilteredPropertiles] = useState([]);

  const { token } = useContext(AuthenticationContext);

  const { isDark } = useAppContext();
  useEffect(() => {
    fetch("http://localhost:8080/api/properties", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener las canchas");
        }
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setFilteredPropertiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar canchas:", err);
        setError("No se pudieron cargar las canchas.");
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div
        className={`flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 ${
          isDark
            ? "bg-gradient-to-r from-black via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
        }`}
      >
        <p>Cargando propiedades...</p>
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

  const handleChangeQuery = (query) => {
    setQuery(query);
    if (!query) {
      setFilteredPropertiles(properties);
      return;
    }
    const filteredProperties = properties.filter(
      (pro) =>
        pro.zone.toLowerCase().includes(query.toLowerCase()) ||
        pro.adress.toLowerCase().includes(query.toLowerCase()) ||
        pro.name.toLowerCase().includes(query.toLowerCase()) ||
        pro.fields.some((field) => {
          return field.field_type.includes(query);
        }) ||
        pro.schedules.some((sch) => {
          return sch.schedule.toString().includes(query);
        })
    );

    setFilteredPropertiles(filteredProperties);
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
        Busca predios disponibles
      </h1>
      <SearchInput query={query} setQuery={handleChangeQuery} />
      <div
        className={`flex flex-col items-start ${
          isDark ? "bg-white/10" : "bg-gray-200"
        } backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2 mt-15`}
      >
        {properties.length > 0 ? (
          <ul className="flex flex-col items-start justify-start w-full gap-6 ">
            {filteredProperties.map((property) => (
              <li
                key={property.id}
                className="flex flex-col items-start justify-start w-full border-2 border-gray-500 p-4 rounded-lg"
              >
                <PropertyItem property={property} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay propiedades registradas.</p>
        )}
      </div>
    </div>
  );
};

export default CreateGame;
