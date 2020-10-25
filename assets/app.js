/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Navbar from "./js/components/Navbar";
import HomePage from "./js/pages/HomePage";
import CustomersPage from "./js/pages/CustomersPage";
// import CustomersPageWithPagination from "./js/pages/CustomerPageWithPagination";
import InvoicesPage from "./js/pages/InvoicesPage";
import LoginPage from "./js/pages/LoginPage";
import AuthAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/authContext";
import PrivateRoute from "./js/components/PrivateRoute";
import CustomerPage from "./js/pages/CustomerPage";
import InvoicePage from "./js/pages/InvoicePage";
import SignupPage from "./js/pages/SignupPage";
import {toast, ToastContainer} from "react-toastify";


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

AuthAPI.setup();

// rs shortcut
const App = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(AuthAPI.isAuthenticated())
    // console.log(isAuthenticated)

    const NavbarWithRouter = withRouter(Navbar);


    return(
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        {/* mind to put the most detailed route the highest in list */}
                        <Route path={"/login"} component={LoginPage} />
                        <Route path={"/signup"} component={SignupPage} />
                        <PrivateRoute path={"/customers/:id"} component={CustomerPage} />
                        <PrivateRoute path={"/customers"} component={CustomersPage} />
                        {/*<Route path={"/customers"} render={(props) => {*/}
                        {/*    return isAuthenticated && <CustomersPage {...props} /> || <Redirect to={"/login"} />*/}
                        {/*}}/> */}
                        <PrivateRoute path={"/invoices/:id"} component={InvoicePage} />
                        <PrivateRoute path={"/invoices"} component={InvoicesPage} />
                        <Route path={"/"} component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.TOP_CENTER} />
        </AuthContext.Provider>
    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

