import React from 'react'
import { useFormik } from 'formik';
import { signUpSchema } from './Validation';
import swal from 'sweetalert';
import axios from 'axios';

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
}

function LearnFormik() {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            axios.post(`http://localhost:3000/learn`, values).then(res => {
                if (res.data.message) {
                    swal("Success", res.data.message, "success");
                    console.log(res);
                    // history.push('/login');
                    // document.location.href = "/login";
                }

            })
                .catch(err => {
                    console.log(err);
                })
            console.log(window.btoa(values.password));
          
            action.resetForm();
        },
    })
    return (
        <>
        <div className= "container">
            <div>LearnFormik</div>
            <form onSubmit={handleSubmit}>
                <div className="col-sm-5 my-4 fields">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={handleChange} value={values.name} className="form-control" placeholder="Enter username" />
                    {errors.name && touched.name ? <span className="text-danger">{errors.name}</span> : null}
                </div>
                <div className="col-sm-5 my-4 fields">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={handleChange} value={values.email} className="form-control" placeholder="Enter email" />
                    {errors.email && touched.email ? <span className="text-danger">{errors.email}</span> : null}
                </div>
                <div className="col-sm-5 my-4 fields" >
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={handleChange} value={values.password} className="form-control" placeholder="Enter password" />
                    {errors.password && touched.password ? <span className="text-danger">{errors.password}</span> : null}
                </div>
                <div className="col-sm-5 my-4 fields" >
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirm_password" id="password" onChange={handleChange} value={values.confirm_password} className="form-control" placeholder="Enter password" />
                    {errors.confirm_password && touched.confirm_password ? <span className="text-danger">{errors.confirm_password}</span> : null}
                </div>
                <br />
                <input type="submit" value="Submit" className="btn btn-primary col-sm-5" style={{ marginLeft: "230px" }} />
            </form>
            </div>
        </>
    )
}

export default LearnFormik