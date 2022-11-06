import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { Helmet } from "react-helmet";

function Admin() {
    const [userInfo, setUserData] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const [profileInput, setProfile] = useState({
        name: "",
        email: "",
        dob: "",
        id: "",
        phone: "",
    }
    )
    //  for add user
    const [registerInput, setRegister] = useState({
        add_name: '',
        add_email: '',
        add_password: '',
        add_dob: '',
    });
    const email_ss = sessionStorage.getItem('email');
    const history = useHistory();

    if (!sessionStorage.getItem("email")) {
        history.push('login');
    }
    if (userInfo == "") {
        axios.post(`http://localhost:3000/admin`).then(res => {
            setUserData(res.data.result);
            console.log(res.data.result);
        });
    }

    const container_style = {
        backgroundColor: "#37517e",
        height: "20cm",
        paddingTop: "3px",
        color: "white"
    }
    const handleInput = (e) => {
        e.persist();
        setProfile({ ...profileInput, [e.target.name]: e.target.value });

    }
    const profileSubmit = (e) => {
        e.preventDefault();
        if (validate(profileInput)) {
            const data = {
                name: profileInput.name,
                email: profileInput.email,
                dob: profileInput.dob,
                id: profileInput.id,
                phone: profileInput.phone,

            }
            axios.post(`http://localhost:3000/profile_submit`, data).then(res => {
                if (res.data.message) {
                    swal("Success", "Data edited successfully", "success").then(() => {
                        document.location.href = "/admin";
                    })

                }
            })
                .catch(err => {
                    console.log(err);
                })

        }
    }


    // for add user
    const handleAddInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if (user_validate(registerInput)) {
            console.log("called");

            const data = {
                name: registerInput.add_name,
                email: registerInput.add_email,
                password: registerInput.add_password,
                dob: registerInput.add_dob,
            }


            axios.post(`http://localhost:3000/register`, data).then(res => {
                // alert(res.data.message);
                if (res.data.message) {
                    swal("Success", "User added successfully", "success").then(() => {
                        document.location.href = "/admin";
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

        if (!values.dob) {
            errors.dob = "Dob is required!";
            formIsValid = false;
        }
        if (values.phone.length > 10) {
            errors.phone = "Please enter correct phone number";
            formIsValid = false;
        }



        setFormErrors(errors);
        return formIsValid;
    };
    const user_validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let formIsValid = true;
        if (!values.add_name) {
            errors.add_name = "Name is required"
            formIsValid = false;
        }
        if (!values.add_email) {
            errors.add_email = "Email is required!";
            formIsValid = false;
        } else if (!regex.test(values.add_email)) {
            errors.add_email = "This is not a valid email format!";
            formIsValid = false;
        }

        if (!values.add_password) {
            errors.add_password = "Password is required!";
            formIsValid = false;
        }

        if (!values.add_dob) {
            errors.add_dob = "Dob is required!";
            formIsValid = false;
        }




        setFormErrors(errors);
        return formIsValid;
    };


    var i = 0;
    var displayData = "";
    displayData = userInfo.map((item) => {
        // console.log("item" + item.name);

        $(document).ready(function () {
            $('#myTable').DataTable();
        });

        $(document).ready(function () {
            $('#deleteButton').on('click', function () {
                console.log("function has called");
                console.log($(this).data("id"));
            });
        });

        return (
            <>
                <tr>
                    <td>{++i}</td>
                    {/* <td>{item._id}</td> */}
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.dob}</td>
                    <td>{item.phone}</td>
                    <td>
                        <button type="button" className="btn btn-primary me-2"
                            onClick={(() => {
                                const data = {
                                    id: item._id,

                                }
                                console.log(item._id);
                                axios.post(`http://localhost:3000/admin_edit`, data).then(res => {
                                    console.log(res.data);
                                    const name = res.data.result[0].name ? res.data.result[0].name : "";
                                    const email = res.data.result[0].email ? res.data.result[0].email : "";
                                    const dob = res.data.result[0].dob ? res.data.result[0].dob : "";
                                    const phone_f = res.data.result[0].phone ? res.data.result[0].phone : "";
                                    const _id = res.data.result[0]._id ? res.data.result[0]._id : "";
                                    setProfile({
                                        name: name,
                                        email: email,
                                        dob: dob,
                                        id: _id,
                                        phone: phone_f,
                                    });
                                })
                                window.$('#exampleModal').modal('show')
                            })}
                        > Edit</button>

                        <button type="button" className="btn btn-danger" data-id={item._id} onClick={(() => {
                            setProfile({
                                id: item._id,
                            });
                            window.$('#myModal1').modal('show');

                        })}>Delete</button>

                    </td>
                </tr>


            </>
        )
    });


    return (
        <>
            <Helmet><title>Admin</title></Helmet>
            <h4>Admin</h4>
            <div className="container-fluid" style={container_style} >
                <button className="btn btn-primary float-end" onClick={(() => {
                    window.$('#AddexampleModal').modal('show')
                })}>Add User</button>
                <h3>List</h3>
                <table className="table table-hover" id="myTable" style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "white" }}>S.NO</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData}
                    </tbody>
                </table>
            </div>

            {/* for edit  */}

            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Record</h5>
                            <button type="button" className="close btn btn-danger" onClick={(() => {
                                window.$('#exampleModal').modal('hide')
                            })}>
                                <span aria-hidden="true">x</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div id="response">
                                <div className="container">
                                    <h2 >Edit profile</h2>
                                    <form onSubmit={profileSubmit}>

                                        <div className="container-fluid my-4">
                                            <label htmlFor="name" >Name</label>
                                            <input type="hidden" name="id" id="uid" onChange={handleInput} value={profileInput.id} className="form-control" />
                                            <input type="text" name="name" id="name" onChange={handleInput} value={profileInput.name} className="form-control" placeholder="Enter name" />
                                            <span className="text-danger">{formErrors.name}</span>

                                        </div>

                                        <div className="container-fluid my-4" >
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" id="email" onChange={handleInput} value={profileInput.email} className="form-control" placeholder="Enter email" />
                                            <span className="text-danger">{formErrors.email}</span>

                                        </div>
                                        <div className="container-fluid my-4" >
                                            <label htmlFor="dob">Date of birth</label>
                                            <input type="date" name="dob" id="dob" onChange={handleInput} value={profileInput.dob} className="form-control" placeholder="Enter dob" />
                                            <span className="text-danger">{formErrors.dob}</span>

                                        </div>

                                        <div className="container-fluid my-4">
                                            <label htmlFor="phone">Phone number</label>
                                            <input type="number" name="phone" id="phone" onChange={handleInput} value={profileInput.phone} className="form-control" placeholder="Enter phone" />
                                            <span className="text-danger">{formErrors.phone}</span>

                                        </div>

                                        <div className="" style={{ marginLeft: "210px" }}>
                                            <input type="submit" className="btn btn-primary col-sm-7" value="Submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* for logout modal */}
            <div className="container">

                <div className="modal fade model-xl" id="myModal1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Confirm</h4>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure want to delete this record</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={(() => {
                                    const data = { id: profileInput.id }
                                    console.log("data   yes", data)
                                    axios.post(`http://localhost:3000/delete`, data).then(res => {
                                        console.log(res.data.message);
                                        // console.log(res);
                                        if (res.data.message) {

                                            swal({
                                                title: "Success!",
                                                text: "Data deleted successfully",
                                                type: "success",
                                                timer: 5000,
                                                showConfirmButton: false
                                            }).then(function () {
                                                window.location.href = "/admin";
                                            });

                                        }
                                    });
                                }
                                )} className="btn btn-danger">Yes</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            {/* for add user */}
            <div className="modal fade bd-example-modal-lg" id="AddexampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h5 className="modal-title" id="exampleModalLabel">Add Record</h5>
                            <button type="button" className="close btn btn-danger" onClick={(() => {
                                window.$('#AddexampleModal').modal('hide')
                            })}>
                                <span aria-hidden="true">x</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div id="response">
                                <div className="container">
                                    <h2 >Add User</h2>
                                    <form onSubmit={registerSubmit}>
                                        <div className="container-fluid my-4">
                                            <label htmlFor="add_name">Name</label>
                                            <input type="text" name="add_name" id="add_name" onChange={handleAddInput} value={registerInput.add_name} className="form-control" placeholder="Enter username" />
                                            <span className="text-danger">{formErrors.add_name}</span>
                                        </div>
                                        <div className="container-fluid my-4">
                                            <label htmlFor="add_email">Email</label>
                                            <input type="email" name="add_email" id="add_email" onChange={handleAddInput} value={registerInput.add_email} className="form-control" placeholder="Enter email" />
                                            <span className="text-danger">{formErrors.add_email}</span>
                                        </div>
                                        <div className="container-fluid my-4">
                                            <label htmlFor="add_password">Password</label>
                                            <input type="password" name="add_password" id="add_password" onChange={handleAddInput} value={registerInput.add_password} className="form-control" placeholder="Enter password" />
                                            <span className="text-danger">{formErrors.add_password}</span>
                                        </div>
                                        <div className="container-fluid my-4">
                                            <label htmlFor="add_dob">Date of birth</label>
                                            <input type="date" name="add_dob" id="add_dob" onChange={handleAddInput} value={registerInput.add_dob} className="form-control" placeholder="Enter dob" />
                                            <span className="text-danger">{formErrors.add_dob}</span>
                                        </div>


                                        <br />

                                        <input type="submit" value="Submit" style={{ marginLeft: "200px" }} className="btn btn-primary col-sm-6" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin


