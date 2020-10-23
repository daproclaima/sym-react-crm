import React, { useState, useContext } from 'react';
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/authContext";

const LoginPage = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const [ credentials, setCredentials ] = useState({
        username: "test@sym.com",
        password: "password"
    });

    const [error, setError ] = useState("")

    // Manage fields
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setCredentials({ ...credentials, [ name ]: value } );
    }

    // Manage submit
    const handleSubmit = async event => {
        event.preventDefault()

        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/customers");
        }catch (error) {
            setError("No account exists with this given address, or the given password is wrong.")
        }
    }

    return (
        <>
            <h1>Log in application</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Email address</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        type="email"
                        placeholder="email address"
                        name="username"
                        id="username"
                        className={`form-control ${error && "is-invalid"}`}
                    />
                    {error &&
                        <p className="invalid-feedback">
                            {error}
                        </p>
                    }
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="password"
                        name="password"
                        id="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Log in now</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;