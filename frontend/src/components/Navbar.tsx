import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Navbar(): JSX.Element {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <div>Loading...</div>;
    }

    const { authenticated, logout } = authContext;

    return (
        <nav className="h-[80px] flex shadow-slate-900 shadow-lg justify-between items-center px-12 gap-3 mb-12">
            <h1 className="text-3xl">Personal Finance</h1>
            <div className="grow"></div>
            {authenticated && <h1 className="text-3xl hover:text-red-600 hover:scale-105 duration-300"> <NavLink to="/dashboard">Dashboard</NavLink> </h1>}
            {!authenticated && <h1 className="text-3xl hover:text-red-600 hover:scale-105 duration-300"> <NavLink to="/login">Login</NavLink> </h1>}
            {authenticated && <h1 className="text-3xl hover:text-red-600 hover:scale-105 duration-300" onClick={logout}>Logout</h1>}
        </nav>
    );
}