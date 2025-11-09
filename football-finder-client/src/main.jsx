import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthenticationContextProvider } from "./components/services/auth/AuthContextProvider.jsx";
import { AppProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthenticationContextProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthenticationContextProvider>
  </StrictMode>
);
