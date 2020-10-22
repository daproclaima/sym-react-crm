import React from 'react';
// rsc
const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                SymReact
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Customers</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Invoices</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">Dropdown</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {/*li.nav-item>a.nav-link{inscription}*/}
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            Sign up
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-success">
                            Sign in
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-danger">
                            Sign out
                        </a>
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;