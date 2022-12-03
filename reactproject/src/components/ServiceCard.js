import React from 'react'

function ServiceCard(props) {
    return (
        <>
         <div className="card" tabIndex={"0"}>
                <div className="card-body ms-5">
                <img className="car" src={props.workersData.images ? "images/" + props.workersData.images : "images/plumber.jpg"} alt="Card image cap" height={"200px"} width={"200px"} />
                <div className='float-end me-5'>
                <p className='workers-data'>Name: {props.workersData.name}</p>
                <p className='workers-data'>Email: {props.workersData.email}</p>
                <p className='workers-data'>Phone No: {props.workersData.phone}</p>
                <p className='workers-data'>Worker: {props.workersData.wType}</p>
                </div>
                    {/* <p className='float-end'>This is some text within a card body.</p> */}
                </div>
            </div>
        </>
    )
}

export default ServiceCard