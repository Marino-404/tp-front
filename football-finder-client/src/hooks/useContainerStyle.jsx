import { useAppContext } from "../context/AppContext.jsx";

export function useContainerStyle() {
  const { isDark } = useAppContext();

  const containerStyle = `flex flex-col items-center justify-start w-full min-h-screen pt-32 pb-28 px-4 bg-gradient-to-r ${
    isDark
      ? "from-black via-gray-900 to-black"
      : "from-white via-gray-100 to-white"
  }`;

  return { containerStyle };
}
