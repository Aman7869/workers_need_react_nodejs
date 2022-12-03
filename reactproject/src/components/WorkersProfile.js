import axios from 'axios';
import React, { useState } from 'react'
import swal from 'sweetalert';
import { Helmet } from "react-helmet";
function WorkersProfile() {
    const email_ss = sessionStorage.getItem('email');
    console.log(email_ss);
    const [picture, setPicture] = useState();
    const [formErrors, setFormErrors] = useState({});
    // const [file, setFile] = useState();
    // const [fileName, setFileName] = useState("");
    const [profileInput, setProfile] = useState({
        name: "",
        email: "",
        dob: "",
        id: "",
        phone: "",
        image: "",
        wType: "",
    }
    )

    if (!sessionStorage.getItem("email")) {
        document.location.href = "/login";
    }
    const data = {
        email: email_ss,
    }
    if (profileInput.id == "") {
        console.log("data", data);
        axios.post(`http://localhost:3000/workers_profile`, data).then(res => {
            setProfile({
                name: res.data.result[0].name,
                email: res.data.result[0].email,
                dob: res.data.result[0].dob,
                id: res.data.result[0]._id,
                phone: res.data.result[0].phone,
                image: res.data.result[0].images,
                wType: res.data.result[0].wType,
            });
        })
    }
    const handleInput = (e) => {
        e.persist();
        setProfile({ ...profileInput, [e.target.name]: e.target.value });
    }

    // const handleImage = (e) => {
    //     setFile(e.target.files[0]);
    //     setFileName(e.target.files[0].name);
    // };
    const profileSubmit = (e) => {
        e.preventDefault();
        console.log("wType", profileInput);
        if (validate(profileInput)) {
            const data = {
                name: profileInput.name,
                email: profileInput.email,
                dob: profileInput.dob,
                id: profileInput.id,
                phone: profileInput.phone,
                wType: profileInput.wType,
            }
            axios.post(`http://localhost:3000/workers_profile_submit`, data).then(res => {
                if (res.data.message) {
                    swal("Success", res.data.message, "success").then(() => {
                        document.location.href = "/workers_profile";
                    })
                }
            })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    const mystyle = {
        position: "absolute",
        left: "50%",
        top: "22%",
        color: "white",
    };
    const container_style = {
        backgroundColor: "#37517e",
        height: "20cm",
        paddingTop: "3px",
    }
    var image_path = "";
    if (profileInput.image == null) {
        image_path = "images/profile.jpg";
    } else {
        image_path = "images/" + profileInput.image;
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
    return (
        <>
            <Helmet><title>Profie</title></Helmet>
            <div className="container-fluid" style={container_style}>
                <div className="col-sm-4"></div>
                <div className="col-sm-3" style={{ marginLeft: "190px" }} >
                    <h1 style={{ color: "white" }}>Profile</h1>
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={image_path} alt="Card image cap" height="250" />
                        <div className="card-body">
                            <h4 style={{ marginTop: "5px" }}>User's information</h4>
                            <p>Name : {profileInput.name}</p>
                            <p>Email : {profileInput.email}</p>
                            <p>Date of Birth : {profileInput.dob}</p>
                            {profileInput.phone != null && profileInput.phone != "" && (
                                <p>Phone no : {profileInput.phone}</p>
                            )}
                            {profileInput.wType != null && profileInput.wType != "" && (
                                <p>Worker's Type : {profileInput.wType.replace("_", " ")}</p>
                             )}
                        </div>
                    </div>
                </div>
                <div className='col-sm-4' style={mystyle}>
                    <h2 >Edit profile</h2>
                    <form onSubmit={profileSubmit} encType="multipart/form-data">
                        <div className="col-sm-7 my-4">
                            <label htmlFor="name" >Name</label>
                            <input type="hidden" name="id" id="uid" onChange={handleInput} value={profileInput.id} className="form-control" />
                            <input type="text" name="name" id="name" onChange={handleInput} value={profileInput.name} className="form-control" placeholder="Enter name" />
                            <span className="text-white">{formErrors.name}</span>
                        </div>
                        <div className="col-sm-7 my-4">
                            <label htmlFor="email" >Email</label>
                            <input type="text" name="email" id="email" onChange={handleInput} value={profileInput.email} className="form-control" placeholder="Enter email" />
                            <span className="text-white">{formErrors.email}</span>
                        </div>
                        <div className="col-sm-7 my-4">
                            <label htmlFor="wtype" >Worker's Type</label>
                            <select class="form-select" aria-label="Default select example" onChange={handleInput} name="wType" value={profileInput.wType}>
                                <option selected>Open this select menu</option>
                                <option value="plumber">Plumber</option>
                                <option value="painter">Painter</option>
                                <option value="maid">Maid</option>
                                <option value="car_painter">Carpainter</option>
                            </select>
                        </div>
                        <div className="col-sm-7 my-4" >
                            <label htmlFor="dob">Date of birth</label>
                            <input type="date" name="dob" id="dob" onChange={handleInput} value={profileInput.dob} className="form-control" placeholder="Enter dob" />
                            <span className="text-white">{formErrors.dob}</span>
                        </div>
                        {/* <div className="col-sm-7 my-4" >
                            <label htmlFor="dob">Upload image</label>
                            <input type="file" name="image" id="file" className="form-control" onChange={handleImage} />
                        </div> */}
                        <div className="col-sm-7 my-4">
                            <label htmlFor="phone">Phone number</label>
                            <input type="number" name="phone" id="phone" onChange={handleInput} value={profileInput.phone} className="form-control" placeholder="Enter phone" />
                            <span className="text-white">{formErrors.phone}</span>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default WorkersProfile