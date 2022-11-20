import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// import { useHistory } from 'react-router';
import swal from 'sweetalert';
// import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Navbar() {
    // const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('admin_email');
        sessionStorage.removeItem('user');
        document.location.href = "/login";

    }
    var admin = '';
    var wprofile = '';
    if (sessionStorage.getItem("admin_email")) {
        admin = (<li className="nav-item">
            <Link exact activeClassName="active  " className="nav-link " aria-current="page" to="/admin">Admin</Link>
        </li>
        )
    }
    if (sessionStorage.getItem("user") == "2") {
        wprofile =(<NavDropdown.Item href="workers_profile">Work .Profile</NavDropdown.Item>)
    }

    var AuthButtons = '';
    // console.log(localStorage.getItem("email"));
    if (!sessionStorage.getItem("email")) {
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link exact activeClassName="active" className="nav-link " to="/registration">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link exact activeClassName="active" className="nav-link " to="/login">Login</Link>
                </li>


            </ul>
        );
    } else {
        AuthButtons = (

            <ul className="navbar-nav" style={{ marginLeft: '20cm' }}>
                <li className="nav-item">
                    <Link exact className="nav-link " to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <NavLink exact className="nav-link " to="/profile">Profile</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link " aria-current="page" to="/upload">Upload</NavLink>
                </li>
                {/* if (!sessionStorage.getItem("admin_email")) {
                    <li className="nav-item">
                        <NavLink exact activeClassName="active  " className="nav-link " aria-current="page" to="/admin">Admin</NavLink>
                    </li>
                } */}
                {admin}

                <NavDropdown title="Workers" id="basic-nav-dropdown">
                  {wprofile}
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                </NavDropdown>
                <li className="nav-item">
                    <button type="button" data-toggle="modal" data-target="#myModal" className="btn btn-danger">Logout</button>
                </li>
            </ul>
        );
    }



    return (
        <>


            {/* for logout modal */}
            <div className="container">

                <div className="modal fade model-xl" id="myModal" role="dialog">
                    <div className="modal-dialog">


                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Confirm</h4>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure want to logout</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={logoutSubmit} className="btn btn-danger">Yes</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>




            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Reactjs/Nodejs</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {/* <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" to="/about">{props.abouttext}</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/">Action</a></li>
                                <li><a className="dropdown-item" href="/">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Something else here</a></li>
                            </ul>
                        </li> */}
                            {AuthButtons}

                        </ul>


                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar