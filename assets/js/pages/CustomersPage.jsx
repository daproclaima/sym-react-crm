import React, {useEffect, useState} from 'react';
import Pagination from '../components/Pagination';
import CustomersAPI from "../services/customersAPI";
import {Link} from "react-router-dom";

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("")

// Managed wrapped async function in order to not write "useEffect( async () => fetchCustomers(), [])"
    const fetchCustomers = async () => {
        try {
            await CustomersAPI.findAll()
                .then(data => setCustomers(data))
        }catch (error) {
            console.log(error)
        }
    }
    // Manage customers load at page loading
    useEffect(() => {
        fetchCustomers()
    } , [])

    // Manage one customer deletion
    const handleDelete = async (id) => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id))
        try {
            await CustomersAPI.delete(id)
        }catch (error) {
            setCustomers(originalCustomers);
            console.log(error)
        }
    }

    // Manage page changes
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    // Manage searchbar
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const itemsPerPage = 10;

    // Manage customers filtering with searchbar
    const filteredCustomers = customers.filter(
        c =>
            search.value !== '' &&
            (
                c.firstName.toLowerCase().includes(search.toLowerCase()) ||
                c.lastName.toLowerCase().includes(search.toLowerCase()) ||
                c.email.toLowerCase().includes(search.toLowerCase()) ||
                (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
            )
    )

    // Manage pagination service for this page
    const paginatedCustomers = Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Customers list</h1>
                <Link to={'customers/new'} className='btn btn-primary'>Create new customer</Link>
            </div>

            <div className="form-group">
                <input
                    type="text"
                    onChange={handleSearch}
                    value={search}
                    className="form-control"
                    placeholder="search..."
                />
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th className={"text-center"}>Invoices</th>
                    <th className={"text-center"}>Total Amount</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedCustomers.map(customer =>
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><a href="#">{customer.firstName} {customer.lastName.toUpperCase()}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className={"text-center"}>{customer.invoices.length}</td>
                        <td className={"text-center"}>{customer.totalAmount.toLocaleString()}€</td>
                        <td>
                            <button
                                onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {itemsPerPage < filteredCustomers.length && (
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredCustomers.length}
                    onPageChanged={handlePageChange}
                />
            )}
        </>
    );
};

export default CustomersPage;