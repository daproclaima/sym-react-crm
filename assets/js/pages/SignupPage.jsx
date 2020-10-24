import React, { useState } from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import UsersAPI from "../services/usersAPI";
import {toast} from "react-toastify";

const SignupPage = ({ history }) => {
    const [ user, setUser ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [ errors, setErrors ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })


    // Manage fields on change event
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setUser({ ...user, [ name ]: value } );
    }

    // Manage submit form
    const handleSubmit = async event => {
        event.preventDefault();
        let apiErrors = {}
        if(user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = 'The password and confirmation password don\'t match.';
        }

        try {
            await UsersAPI.create(user)
            toast.success('Congratulations! You signed up and can now sign in! ✅')
            setErrors({})
            history.replace('/login')
        } catch (error) {
            console.log(error.response)
            const { violations } = error.response.data
            if(violations){
                violations.forEach(violation => apiErrors[violation.propertyPath] = violation.message)
                setErrors(apiErrors)
            }
            toast.error('Sorry, your account signup failed due to errors in form. ❌')
        }
        console.log(user)
    }

    return (
        <>
            <h1>Sign up !</h1>
            <form onSubmit={handleSubmit}>
                <Field name={'firstName'} label={'First name'} placeholder={'Your first name'}
                       error={errors.firstName} value={user.firstName} onChange={handleChange}
                />

                <Field name={'lastName'} label={'Last name'} placeholder={'Your last name'}
                       error={errors.lastName} value={user.lastName} onChange={handleChange}
                />

                <Field name={'email'} label={'Email address'} placeholder={'Your email address'}
                       error={errors.email} value={user.email} onChange={handleChange} type={'email'}
                />

                <Field name={'password'} label={'Password'} placeholder={'Your password'}
                       error={errors.password} value={user.password} onChange={handleChange} type={'password'}
                />

                <Field name={'passwordConfirm'} label={'Password confirmation'} placeholder={'Repeat your password'}
                       error={errors.passwordConfirm} value={user.passwordConfirm} onChange={handleChange} type={'password'}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Sign up now!</button>
                    <Link to={'/login'} className={'btn btn-link'}>I already have an account</Link>
                </div>
            </form>
        </>
    );
};

export default SignupPage;
