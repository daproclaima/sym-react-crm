/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./js/components/Navbar";
import HomePage from "./js/pages/Homepage";
import { HashRouter, Switch, Route } from 'react-router-dom';
import CustomersPage from "./js/pages/CustomersPage";
import CustomersPageWithPagination from "./js/pages/CustomerPageWithPagination";
import InvoicesPage from "./js/pages/ InvoicesPage";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello World');
// rs shortcut
const App = () => {
    return(
        <HashRouter>
            <Navbar />
            <main className="container pt-5">
                <Switch>
                    {/* mind to put the most detailed route the highest in list */}
                    <Route path={"/customers"} component={CustomersPage}/>
                    <Route path={"/invoices"} component={InvoicesPage}/>
                    <Route path={"/"} component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>
    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

