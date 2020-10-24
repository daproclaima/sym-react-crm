import axios from 'axios';
import Cache from "./cache";
import {CUSTOMERS_API} from '../config'
//todo axios manages caching
async function findAll() {
    const cachedCustomers = await Cache.get('customers')
    if(cachedCustomers) return cachedCustomers;

    return axios.get(CUSTOMERS_API)
        .then(response => {
            // customers = response.data['hydra:member']
            Cache.set('customers', response.data['hydra:member']);
            return response.data['hydra:member']
        });
}

function deleteCustomer(id) {
   // if i go in then it means it works. Was an error, go in cactch
   return axios.delete(`${CUSTOMERS_API}/${id}`)
       .then(async response => {
           const cachedCustomers = await Cache.get('customers')
           if(cachedCustomers){
               Cache.set('customers', cachedCustomers.filter(c => c.id !== id))
           }

           return response;
       });
}

async function find(id) {
    const cachedCustomer = await Cache.get(`customers.${id}`)
    if(cachedCustomer) {
        return cachedCustomer
    }
    return axios.get(`${CUSTOMERS_API}/${id}`)
        .then( response => {
            // customer = response.data
            Cache.set(`customers.${id}`, response.data);
            return response.data
        });
}

function update(id, customer) {
    return axios.put(`${CUSTOMERS_API}/${id}`, customer
    // ).then( response => {
    ).then( async response => {
        // solution 1 with async parent function
        const cachedCustomers = await Cache.get('customers')
        const cachedCustomer = await Cache.get(`customers.${id}`)
        if(cachedCustomer) {
            Cache.set(`customers.${id}`,  response.data);
        }
        if(cachedCustomers){
            const index = cachedCustomers.findIndex(c => c.id === +id)
            // New cached customer = response.data
            cachedCustomers[index] = response.data
            // Cache.set('customers', cachedCustomers)
        }
        // or solution 2
        // Cache.invalidate('customer')

        return response;
    });
}

function create(customer) {
    return axios.post(CUSTOMERS_API, customer).then(async response => {
            const cachedCustomers = await Cache.get('customers')
            if(cachedCustomers){
                Cache.set('customers', [...cachedCustomers, response.data])
            }
            return response;
        });
}

export default {
    findAll,
    find,
    delete: deleteCustomer,
    update,
    create
}
