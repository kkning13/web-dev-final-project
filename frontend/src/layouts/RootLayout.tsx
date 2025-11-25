import { HeaderSimple } from "../components/Header";
import { PATHS } from "../constants/Navigation";
import { Outlet } from "react-router-dom";
import LoginButton from "../components/LoginButton";

const RootLayout = () => (
    <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <HeaderSimple links={PATHS} />
            <LoginButton />
        </div>
        <div>
            <Outlet />
        </div>
    </div>
);

export default RootLayout;
