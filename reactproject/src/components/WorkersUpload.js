import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert';
import { Helmet } from "react-helmet";

function WorkersUpload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const email_ss = sessionStorage.getItem('email');

    if (!sessionStorage.getItem("email")) {
        document.location.href = "/login";
    }
    const handleImage = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    function submitproduct(e) {
        e.preventDefault();
        const formData = new FormData();
      formData.append("image", file);
      formData.append("fileName", fileName);
        formData.append('email', email_ss );
        console.log(formData);
        axios.post(`http://localhost:3000/wokers_image_upload`, formData).then(res => {
           console.log("image uploaded");
           if (res.data.message) {
            swal("Success", res.data.message, "success").then(() => {
                document.location.href = "/upload";
            })
        } else {
            swal("error", 'Please select image', "error");
        }
        });
    }
    return (
        <div className="container">
            <Helmet><title>Upload</title></Helmet>
            <form onSubmit={submitproduct} encType="multipart/form-data">
                <h1>Please upload your image </h1>
                <div className="col-sm-4">
                    <input type="file" name="image" id="file" className="form-control" onChange={handleImage} />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </div>
    )
}
export default WorkersUpload
