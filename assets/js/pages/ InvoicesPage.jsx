import React, {useEffect, useState} from 'react';
import Pagination from '../components/Pagination';
import moment from 'moment-js';
import InvoicesAPI from "../services/invoicesAPI";

/**
 *
 * @type {{CANCELLED: string, PAID: string, SENT: string}}
 */
const STATUS_CLASSES = {
    PAID: 'success',
    SENT: 'primary',
    CANCELLED: 'danger'
}

/**
 *
 * @type {{CANCELLED: string, PAID: string, SENT: string}}
 */
const STATUS_LABELS = {
    PAID: 'Paid',
    SENT: 'Sent',
    CANCELLED: 'Cancelled'
}

/**
 *
 * @type {number}
 */
const itemsPerPage = 10;

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const InvoicesPage = (props) => {
    const [ invoices, setInvoices ] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Manage invoices fetch in API
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll()
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    }
    // Manage DateTime format in UI
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // Manage data fetching at page loading
    useEffect(() => {
        fetchInvoices()
    }, [])

    // Manage page changes
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    // Manage searchbar
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    // Manage one invoice deletion
    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id))
        try {
           await InvoicesAPI.delete(id)
        }catch (error) {
            setInvoices(originalInvoices);
            console.log(error)
        }
    }

    const filteredInvoices = invoices.filter(
        i =>
            search.value !== '' &&
            (
                i.sentAt.toLowerCase().includes(search.toLowerCase()) ||
                i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
                i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
                i.amount.toString().startsWith(search.toLowerCase()) ||
                STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
            )
    )

    // Manage pagination service for this page
    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <h1>Invoices list</h1>
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
                    <th>Number</th>
                    <th>Customer</th>
                    <th className="text-center">Sending date</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Amount</th>
                </tr>
                </thead>
                <tbody>
                    {paginatedInvoices.map( invoice =>
                        <tr key={invoice.id}>
                            <td>{invoice.chrono}</td>
                            <td>
                                <a href="#">{invoice.customer.firstName} {invoice.customer.lastName.toUpperCase()}</a>
                            </td>
                            <td className="text-center">{formatDate(invoice.sentAt)}</td>
                            <td className="text-center">
                                <span className={`badge badge-${STATUS_CLASSES[invoice.status]}`}>
                                    {STATUS_LABELS[invoice.status]}
                                </span>
                            </td>
                            <td className="text-center">
                                {invoice.amount.toLocaleString()} €
                            </td>
                            <td>
                                <button className="btn btn-sm btn-primary mr-1">
                                    Edit
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChanged={handlePageChange}
                length={filteredInvoices.length}
            />
        </>
    );
};

export default InvoicesPage;