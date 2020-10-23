import React, { useContext } from 'react';
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/authContext";
import { NavLink } from "react-router-dom";
// rsc
const Navbar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.push("/login")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
                SymReact
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Customers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Invoices</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    { !isAuthenticated &&
                        <>
                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link">
                                    Sign up
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="btn btn-success">
                                    Log in
                                </NavLink>
                            </li>
                        </>
                    ||
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-danger">
                                Log out
                            </button>
                        </li>
                    }
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;