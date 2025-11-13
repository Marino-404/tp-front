import { Outlet } from "react-router-dom";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <div className="bg-black text-white w-screen h-auto flex flex-col items-center">
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
