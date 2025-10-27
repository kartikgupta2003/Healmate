import React, { useState } from "react";
import { useUser } from "../Context/useUser";
import {toast , ToastContainer} from "react-toastify";
import axios from "axios";

const PersonalInfo = () => {
    const { user, setUser } = useUser();
    const [isEditable, setIsEditable] = useState(false);
    const [changed , setChanged] = useState({
        name : false ,
        age : false ,
        gender : false ,
        weight : false ,
        medicalHistory : false  
    })
    // //(isEditable);
    if (!user) return;

    const inputHandler = (e)=>{
        let name= e.target.name 
        let value = e.target.value 

        setChanged((obj)=>{
            return {...obj , [name] : true}
        })

        setUser((obj)=>{
            return {...obj , 
                [name] : value 
            }
        })
    }

    const updateDB = async(field , value) =>{
        const body = {
            updateField : field ,
            newValue : value 
        }

        const config = {
            headers : {
                "Content-type" : "application/json"
            } ,
            withCredentials : true 
        }

        try{
            const {data} = await axios.patch("https://healmate-d6a2.onrender.com/api/user/update" , body , config);
            localStorage.setItem("userInfo", JSON.stringify(data));
        }catch(err){
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error(err.response.data.message);
        }

    }

    const submitHandler = ()=>{
        if(changed.name){
            updateDB("name" , user.name)
        }

        if(changed.age){
            if(user.age <= 0){
                window.scrollTo({ top: 0, behavior: "smooth" });
                return toast.error("Age cannot be negative or zero !");
            }
            updateDB("age" , user.age)
        }

        if(changed.weight){
            if(user.weight <= 0){
                window.scrollTo({ top: 0, behavior: "smooth" });
                return toast.error("Weight cannot be negative or zero !");
            }
            updateDB("weight" , user.weight)
        }

        if(changed.gender){
            updateDB("gender" , user.gender)
        }

        if(changed.medicalHistory){
            updateDB("medicalHistory" , user.medicalHistory)
        }

        setIsEditable(false);
        setChanged({
        name : false ,
        age : false ,
        gender : false ,
        weight : false ,
        medicalHistory : false  
    })
    }

    return (
        <>
            {(isEditable) ? (<>
                <div className="container mb-2">
                    <div className="card" style={{ background: "rgba(255, 255, 255, 0.2)" }}>
                        <h3 className="card-header" style={{ color: "#2c2c2c" }}>General Info</h3>
                        <div className="card-body">
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Name :- <input onChange={inputHandler} type="text" value={user.name} name="name"></input></label>
                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Age :- <input onChange={inputHandler} type="number" value={user.age} name="age"></input></label>
                            </div>
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Gender :- <input onChange={inputHandler} type="text" value={user.gender} name="gender"></input></label>
                            </div>
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <label className="fw-semibold me-2 mb-2" style={{ color: "#2c2c2c" }}>Weight in Kg :- <input onChange={inputHandler} type="number" value={user.weight} name="weight"></input></label>
                                <label className="fw-semibold me-2 mb-2" style={{ color: "#2c2c2c" }}>Medical History :- <input onChange={inputHandler} type="text" value={user.medicalHistory} name="medicalHistory"></input></label>
                            </div>
                            <button onClick={submitHandler} className="btn btn-danger" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </>) : (
                <div className="container mb-2">
                    <div className="card" style={{ background: "rgba(255, 255, 255, 0.2)" }}>
                        <h3 className="card-header" style={{ color: "#2c2c2c" }}>General Info</h3>
                        <div className="card-body">
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Name :- <span>{user.name}</span></label>
                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Age :- <span>{user.age}</span></label>
                            </div>
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Gender :- <span>{user.gender}</span></label>
                                <label className="fw-semibold me-2 mb-2" style={{ color: "#2c2c2c" }}>Weight in Kg :- <span>{user.weight}</span></label>
                            </div>
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <label className="fw-semibold me-2 mb-2" style={{ color: "#2c2c2c" }}>Medical History :- <span>{user.medicalHistory}</span></label>
                            </div>
                            <button onClick={() => setIsEditable(true)} className="btn btn-primary" type="button">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PersonalInfo;