import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/' className="nav-link text-dark">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/share-post' className="nav-link text-dark">SHARE POST</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/users' className="nav-link text-dark">USERS</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/profile' className="nav-link text-dark">PROFILE</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;