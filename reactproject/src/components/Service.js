import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import {useLocation} from 'react-router-dom';

function Service() {
    const [getWorkers, setWorkers] = useState([]);
    const location = useLocation();
    const data = {
        wType: location.state.wType,
    }
    useEffect(() => {
        axios.post(`http://localhost:3000/get_workers`, data).then(res => {
            console.log("res",res);
            setWorkers(res.data.result);
        })
    },[]);
    console.log(getWorkers);
  
    var displayData = "";
    displayData = getWorkers.map((item) => {
        return (
            <>
             <ServiceCard imagePath={"images/plumber.jpg"} workersData={item} />
            </>
        )
    });
    return (
        <>
        {displayData}
            {/* <ServiceCard imagePath={"images/plumber_2.jpg"} /> */}
            {/* <ServiceCard imagePath={"images/plumber.jpg"} data={getWorkers} /> */}
            {/* <ServiceCard imagePath={"images/plumber.jpg"} />
            <ServiceCard imagePath={"images/plumber.jpg"} /> */}
        </>

    )
}

export default Service