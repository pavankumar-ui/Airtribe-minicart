import { Navigate, Outlet } from "react-router-dom";
function PrivateRoutes() {

    const isAuth = localStorage.getItem("Customer") ? true : false;

    return (
        isAuth ? <Outlet /> : <Navigate to="/Login" replace={true} />
    );
}

export default PrivateRoutes;