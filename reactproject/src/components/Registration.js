import axios from 'axios';
import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Helmet } from "react-helmet";

function Registration() {
    // const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        select_user: '',
        error_list: [],
    });
    const [userInput, setUser] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }
    // const handleUserInput = (e) => {
    //     e.persist();
    //     setRegister({ ...userInput, [e.target.name]: e.target.value });
    // }

    const registerSubmit = (e) => {
        e.preventDefault();

        if (validate(registerInput)) {
            const data = {
                name: registerInput.name,
                email: registerInput.email,
                password: registerInput.password,
                dob: registerInput.dob,
                user: registerInput.select_user,
            }
            console.log("data");
            console.log(data);


            axios.post(`http://localhost:3000/register`, data).then(res => {
                // alert(res.data.message);
                if (res.data.message) {
                    swal("Success", res.data.message, "success");
                    // history.push('/login');
                    document.location.href = "/login";
                }

            })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let formIsValid = true;
        if (!values.name) {
            errors.name = "Name is required"
            formIsValid = false;
        }
        if (!values.email) {
            errors.email = "Email is required!";
            formIsValid = false;
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
            formIsValid = false;
        }
        if (!values.password) {
            errors.password = "Password is required";
            formIsValid = false;
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
            formIsValid = false;
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
            formIsValid = false;
        }
        if (!values.dob) {
            errors.dob = "Dob is required!";
            formIsValid = false;
        }

        setFormErrors(errors);
        return formIsValid;
    };

    const style = {
        marginLeft: '267px',
    }

    return (
        <>


            <Helmet><title>Registration</title></Helmet>
            <div className="App">
                <div className="container-fluid row" >
                    <div className="col-sm-2"></div>
                    <div className="col-sm-5">
                        <h1>Signup</h1>
                        <form onSubmit={registerSubmit}>
                            <div className="col-sm-5 my-4 fields" style={style}>
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" onChange={handleInput} value={registerInput.name} className="form-control" placeholder="Enter username" />
                                <span className="text-danger">{formErrors.name}</span>
                            </div>
                            <div className="col-sm-5 my-4 fields" style={style}>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" onChange={handleInput} value={registerInput.email} className="form-control" placeholder="Enter email" />
                                <span className="text-danger">{formErrors.email}</span>
                            </div>
                            <div className="col-sm-5 my-4 fields" style={style}>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" onChange={handleInput} value={registerInput.password} className="form-control" placeholder="Enter password" />
                                <span className="text-danger">{formErrors.password}</span>
                            </div>
                            <div className="col-sm-5 my-4 fields" style={style}>
                                <label htmlFor="dob">Date of birth</label>
                                <input type="date" name="dob" id="dob" onChange={handleInput} value={registerInput.dob} className="form-control" placeholder="Enter dob" />
                                <span className="text-danger">{formErrors.dob}</span>
                            </div>
                            <div className='col-sm-5 my-4'>
                                <select className="form-select" onChange={handleInput} aria-label="Default select example" name="select_user" style={style}>
                                    <label htmlFor="dob">User</label>
                                    <option selected>Select menu</option>
                                    <option value="1">Customer</option>
                                    <option value="2">Worker</option>
                                </select>
                            </div>


                            <br />

                            <input type="submit" value="Submit" className="btn btn-primary col-sm-5" style={{ marginLeft: "230px" }} />
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Registration
