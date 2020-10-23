import axios from 'axios';

function create(user){
    return axios.post(
        'http://localhost:8000/api/users',
        user
    )
}
export default {
    // findAll,
    // delete: deleteInvoice,
    // find,
    // update,
    create
}
