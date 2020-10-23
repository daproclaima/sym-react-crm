import React, { useState, useEffect } from 'react';
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import axios from 'axios';
import InvoicesAPI from "../services/invoicesAPI";

const InvoicePage = ({ history, match }) => {

    const { id = 'new' } = match.params;

    const [ invoice, setInvoice ] = useState({
        amount: '',
        customer: '',
        status: 'SENT'
    });

    const [ customers, setCustomers ] = useState([]);

    const [ editing, setEditing ] = useState(false);

    const [ errors, setErrors ] = useState({
        amount: '',
        customer: '',
        status: ''
    });

    /**
     * Manage customers fetching from API to populate options in select for selection of customer field of an invoice
     * @returns {Promise<void>}
     */
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
            // todo backend https://symfony.com/doc/current/components/serializer.html#recursive-denormalization-and-type-safety
            if(!invoice.customer) setInvoice({ ...invoice, customer: data[0].id, amount: Number(invoice.amount) })
        }catch (e) {
            console.log(e.response)
            // TODO error flash notification
            history.replace('/invoices')
        }
    }

    /**
     * Manage single invoice fetching from API
     * @param id
     * @returns {Promise<void>}
     */
    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await InvoicesAPI.find(id)
            // console.log(data)
            setInvoice({ amount, status, customer: customer.id })
        } catch (e) {
            console.log(response.error)
            // TODO error flash notification
            history.replace('/invoices')
        }
    }

    /**
     * React hook triggering customers fetch at only at component load
     */
    useEffect(() => {
        fetchCustomers()
    }, [])

    /**
     * React hook enabling edition or creation features according to id state changes
     */
    useEffect(() => {
        if(id !== 'new' ){
            setEditing(true)
            fetchInvoice(id)
        }
    }, [id])

    //TODO: create a service for forms
    /**
     * Manage input change in form
     * @param currentTarget
     */
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoice({ ...invoice, [ name ]: value });
    }

    /**
     * Manage form submission
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(editing) {
                await InvoicesAPI.update(id, invoice)
            //    TODO: success flash notif
            } else{
                await InvoicesAPI.create(invoice)

                history.replace('/invoices');
            }
            // TODO: Flash notification success
            // console.log(response);
            // setErrors({})

        } catch ({ response }) {
            console.log(response)
            const apiErrors = {};
            const { violations } = response.data;
            console.log(violations)
            if(violations){
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
            } else{
                console.log(response.data)
            }
            // console.log(apiErrors)
            setErrors(apiErrors)
            // TODO: set flash error notif
        }
    }

    return (
        <>
            { !editing && <h1>New invoice creation</h1> || <h1>Invoice edition</h1> }
            <form onSubmit={handleSubmit}>
                <Field name={'amount'} type={'number'} label={'Amount'} placeholder={'Invoice\'s amount' }
                       value={invoice.amount} onChange={handleChange} error={errors.amount}
                />

                <Select name='customer' label={'customer'} value={invoice.customer}
                        error={errors.customer} onChange={handleChange}
                >
                    {customers.map( customer =>
                        <option key={customer.id} value={customer.id}>
                            {customer.firstName} {customer.lastName.toUpperCase()}
                        </option>
                    )}
                </Select>

                <Select name='status' label={'Status'} value={invoice.status}
                        error={errors.status} onChange={handleChange}
                >
                    <option value="SENT">Sent</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="PAID">Paid</option>
                </Select>

                <div className="from-group">
                    <button type="submit" className="btn btn-success">Save</button>
                    <Link to={'/invoices'} className={'btn btn-link'}>Go back to invoices</Link>
                </div>
            </form>
        </>
    );
}
export default InvoicePage;
