import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const LoginRequired = ({ children }) => {
    const user = cookies.get("TOKEN");
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export const LoggedOutRequired = ({ children }) => {
    const user = cookies.get("TOKEN");
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

export const logoutUser = () => {
    cookies.remove("TOKEN", {
        path: "/"
    });
    window.location.href = "/";
};