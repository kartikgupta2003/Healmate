import React , {useState} from 'react';
import Login from "../Components/login.jsx";
import SignUp from '../Components/signUp.jsx';

const Homepage = () => {
    const [isVisible , setIsVisible] = useState(0);

    return (
        <div className= "container pt-4" style={{display : "flex" , flexDirection : "column" , alignItems : "center" , justifyContent : "center" , textAlign: "center"}}>
            <h1 style={{color : "#2E2E2E"}}>Heal Mate</h1>
            <p style={{color : "#3D5A80"}}>Know your symptoms. Never miss a dose.
                <br></br>
            HealMate — your personal health assistant.</p>
            <div style={{display : "flex"}}>
                <button className='btn btn-light me-4 mt-2 rounded-pill' onClick = {()=> setIsVisible(1)}>Login</button>
                <button className='btn btn-light mt-2 rounded-pill' onClick = {()=> setIsVisible(2)}>Signup</button>
            </div>
            {(isVisible===1 || isVisible===2) && (
                (isVisible === 1) ? (
                    <>
                    <Login/>
                    </>
                ) : (
                    <><SignUp func={setIsVisible}/></>
                )
            )}
        </div>
    )
}

export default Homepage;