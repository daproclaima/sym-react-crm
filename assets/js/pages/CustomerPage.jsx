import React, { useState, useEffect } from 'react';
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import { toast } from 'react-toastify';
import FormContentLoader from "../components/loaders/FormContentLoader";
//todo: wait for data loading to show the complete page.
// otherwise we have a screen text change on h1 as the component does not know if we edit or create
const CustomerPage = ({ match, history }) => {
    // console.log(props)
    const { id = 'new' } = match.params;

    const [customer, setCustomer] = useState({
        lastName: '',
        firstName: '',
        email: '',
        company: ''
    })
    const [errors, setErrors] = useState({
        lastName: '',
        firstName: '',
        email: '',
        company: ''
    })

    const [ editing, setEditing ] = useState(false);

    const [loading, setLoading] = useState(false);

    // Manage customer fetching from API with the given id
    const fetchCustomer = async id => {
        try {
            // console.log(id)
            const { firstName, lastName, email, company } = await CustomersAPI.find(id);
            setCustomer({ firstName, lastName, email, company })
            setLoading(false )
        } catch (error) {
            if(error.response) {
                // console.log(error.response)
                toast.error('Error at user loading. ❌')
            }
            toast.error(
                `Unhandled error. 
                ${error}
                (Contact the support.)
                `
            )
            history.replace('/customers');
        }
    }

    // React hook managing customer loading at component loading or id state change
    useEffect( () => {
        if (id !== 'new'){
            setLoading(true)
            setEditing(true);
            fetchCustomer(id)
        }
    }, [id]);

    // Manage input change in form
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({ ...customer, [ name ]: value });
    }

    // Manage form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(customer)
        try {
            if(editing) {
                await CustomersAPI.update(id, customer);
                // console.log(response)
                toast.success('User edited ✅')
            } else {
                const response = await CustomersAPI.create(customer);
                // console.log(response.data)
                toast.success('New user created ✅')
                setErrors({})
                history.replace('/customers');
            }
        } catch (error) {
            if(error.response){
                const apiErrors = {};
                // console.log(error.response)
                const { violations } = error.response.data;
                // console.log(violations)
                if(violations){
                    violations.forEach(({ propertyPath, message }) => {
                        apiErrors[propertyPath] = message;
                    });
                }
                // console.log(apiErrors)
                setErrors(apiErrors)
                toast.error('Errors in user form ❌')
            } else {
                toast.error(
                    `Unhandled error.
                    ${error}
                    Contact the support.`)
            }
        }
    }

    return (
        <>
            { !editing && <h1>New customer creation</h1> || <h1>Editing customer</h1> }

            {loading &&
                <FormContentLoader />
            ||
                <form onSubmit={handleSubmit}>
                    <Field name={'firstName'} label={'Firstname'} placeholder={'Customer\'s firstname'}
                           value={customer.firstName} onChange={handleChange} error={errors.firstName}
                    />
                    <Field name={'lastName'} label={'Lastname'} placeholder={'Customer\'s lastname'}
                           value={customer.lastName} onChange={handleChange} error={errors.lastName}
                    />
                    <Field name={'email'} type={'email'} label={'Email address'} placeholder={'Customer\'s email address'}
                           value={customer.email} onChange={handleChange} error={errors.email}
                    />
                    <Field name={'company'} label={'Company'} placeholder={'Customer\'s company'}
                           value={customer.company} onChange={handleChange} error={errors.company}
                    />
                    <div className="form-group">
                        <button className="btn btn-success">Save</button>
                        <Link to={'/customers'} className={'btn btn-link '}>Go back to customers list</Link>
                    </div>
                </form>
            }
        </>
    );
};

export default CustomerPage;
