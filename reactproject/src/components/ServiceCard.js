import React from 'react'

function ServiceCard(props) {
    return (
        <>
         <div className="card" tabIndex={"0"}>
                <div className="card-body ms-5">
                <img className="car" src={props.imagePath} alt="Card image cap" height={"200px"} width={"200px"} />
                    <span className='float-end my-5'>This is some text within a card body.</span>
                </div>
            </div>
        </>

    )
}

export default ServiceCard