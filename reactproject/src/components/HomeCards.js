import React from 'react'

function HomeCards(props) {
    return (
        <>
            <div className="card" style={{ width: "18rem", marginLeft: "135px", marginTop: "20px" }}>
                <img className="card-img-top" src={props.imagePath} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Painter</h5>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </>
    )
}

export default HomeCards