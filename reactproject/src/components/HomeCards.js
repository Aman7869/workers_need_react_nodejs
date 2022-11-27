import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function HomeCards(props) {
    const navigate = useNavigate();
    function redirect_function(){
        navigate('/service', {state: {wType: props.wType}});
    }
    return (
        <>
            <div className="card" style={{ width: "18rem", marginLeft: "135px", marginTop: "20px" }} onClick={redirect_function}>
                <img className="card-img-top" src={props.imagePath} alt="Card image cap" height={"200px"} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                </div>
            </div>
        </>
    )
}

export default HomeCards