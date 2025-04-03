import './style.css';
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function BaseLayout() {
  return (
    <main>
        <SideBar />
        <div>
            <Outlet />
        </div>
    </main>
  );
};

export default BaseLayout;