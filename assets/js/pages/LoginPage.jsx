import React, { useState, useContext } from 'react';
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/authContext";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

const LoginPage = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const [ credentials, setCredentials ] = useState({
        username: "",
        password: ""
    });

    const [error, setError ] = useState("")

    // Manage fields
    const handleChange = ({ currentTarget }) => {
        // console.log(currentTarget)
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
            toast.success('You are now connected  and ready to work! 👔')
            history.replace("/customers");
        }catch (error) {
            setError("No account exists with this given address, or the given password is wrong.")
            toast.danger('An error happened ❌')
        }
    }

    return (
        <>
            <h1>Log in application</h1>

            <form onSubmit={handleSubmit}>
                <Field type={'email'} label={'Email address'} name={'username'}
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
