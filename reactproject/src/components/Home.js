import axios from 'axios';
import React, { useState } from 'react'
import { useHistory  } from 'react-router-dom';
import { Helmet } from "react-helmet";
// import swal from 'sweetalert';

function Home() {
  const history = useHistory();
  // const navigate = useNavigate();

  if (!sessionStorage.getItem("email")) {
    // navigate('login');
        history.push('login');
}
  var image1 = "images/labourslid.jpg";
  var image2 = "images/plumber.jpg";
  var image3 = "images/tree3.jpg";
  return ( 
    <>
                <Helmet><title>Home</title></Helmet>
      <div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="carousel" >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={image1} className="d-block w-100" alt="..." height="800" />
            <div className="carousel-caption d-none d-md-block">

              <h1>Welcome</h1>
              <p>Welcome in Article page.</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={image2} className="d-block w-100" alt="..." height="800" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Welcome</h1>
              <p>Welcome in Article page.</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={image3} className="d-block w-100" alt="..." height="800" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Welcome</h1>
              <p>Welcome in Article page.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Home
