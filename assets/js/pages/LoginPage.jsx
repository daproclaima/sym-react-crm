import React, { useState, useContext } from 'react';
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/authContext";
import Field from "../components/forms/Field";

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
                <Field type={'email'} label={'Email address'} name={'userame'}
                       value={credentials.username} onChange={handleChange} error={error}
               />
               <Field type={'password'} label={'Password'} name={'password'}
                      value={credentials.password} onChange={handleChange} error={error}
              />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Log in now</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;