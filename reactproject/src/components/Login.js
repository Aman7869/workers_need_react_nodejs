import axios from 'axios';
import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Helmet } from "react-helmet";
import  {useSelector, useDispatch}  from "react-redux";
import  {updateStatus}  from "../reducers/actions";

function Login() { 
    const {name, age, status, email} = useSelector((state)=>{
        // state.name = registerInput.email;
        // console.log(state);
        return state;
      });
      const dispatch = useDispatch();
      const updateReduxValue = (email) => {
        dispatch({type:'UPDATE_EMAIL', payload:email})
      }
      const updateNameValue = (name) => {
        dispatch({type:'UPDATE_NAME', payload:name})
      }
      const updateStatusValue = (status) => {
        dispatch(updateStatus(status))
      }
    // const history = useHistory();
    const [registerInput, setRegister] = useState({
        email: '',
        password: '',
        error_list: [],
    });
    const [formErrors, setFormErrors] = useState({});

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }
  
    const loginSubmit = (e) => {
        e.preventDefault();
        if (validate(registerInput)) {
            const data = {
                email: registerInput.email,
                password: registerInput.password,
            }
            axios.post(`http://localhost:3000/login`, data).then(res => {
                if (res.data.message === 400) {
                    updateReduxValue(res.data.email);
                    updateNameValue("Aman");
                    sessionStorage.setItem('email', res.data.email);
                    // sessionStorage.setItem('user', "Aman");
                    if (res.data.email === "aman@gmail.com") {
                        sessionStorage.setItem('admin_email', res.data.email);
                    }
                    console.log(res);
                    if (res.data.user == "2") {
                        sessionStorage.setItem('user', res.data.user);
                    } else {
                        sessionStorage.setItem('user', "1")
                    }
                    swal("Success", "Successfully loggedin", "success");
                    document.location.href = "/home";
                } else {
                    swal("Error", "User not found", "error").then(() => {
                        document.location.href = "/login";
                    })
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

        setFormErrors(errors);
        return formIsValid;
    };

    return (
        <>
            <Helmet><title>Login</title></Helmet>
            <div className="App" style={{ backgroundImage: `url("imagess/login.jpg")` }}>
                <div className="container-fluid row my-5" >
                    <div className="col-sm-2"></div>
                    <div className="col-sm-7">
                        <form onSubmit={loginSubmit}>
                            <h1>Login</h1>

                            <div className="col-sm-5 my-4" style={{ marginLeft: "267px" }}>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" onChange={handleInput} value={registerInput.email} className="form-control" placeholder="Enter email" />
                                <span className="text-danger">{formErrors.email}</span>
                            </div>
                            <div className="col-sm-5 my-4" style={{ marginLeft: "267px" }}>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" onChange={handleInput} value={registerInput.password} className="form-control" placeholder="Enter password" />
                                <span className="text-danger">{formErrors.password}</span>
                            </div>
                            <input type="submit" value="Login" className="btn btn-primary col-sm-5" style={{ marginLeft: "100px" }} />  
                            <br />
                            {/* <button onClick={()=>updateStatusValue("software developer")}>update status</button> */}

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Login
