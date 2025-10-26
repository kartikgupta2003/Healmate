import React , {useState , useEffect} from "react";
import { useUser } from "../Context/useUser";
import {toast , ToastContainer} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PrescriptionsInfo = () => {
    const { user, setUser } = useUser();
    const [activePrescriptions , setActivePrescriptions] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if (!user) return;
        let arr = user.prescriptions.filter((pre) => {
            const currDate = new Date();
            let lastDate = new Date(pre.startDate);
            lastDate.setDate(lastDate.getDate() + pre.durationInDays - 1);
            lastDate.setHours(23, 59, 59, 999);
            return (currDate <= lastDate);
        })
        setActivePrescriptions(arr);
    } , [user])




    const handleDelete = async(preId)=>{

        console.log("chal raha ");
        const body = {
            preId
        }

        const config = {
            headers : {
                "Content-type" : "application/json"
            } ,
            withCredentials : true 
        }

        try{
            const {data} = await axios.post("https://healmate-d6a2.onrender.com/api/prescriptions/delete" , body , config);
            localStorage.setItem("userInfo", JSON.stringify(data));
            console.log("user after updates" , data);
            setUser(data);
        }catch(err){
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error(err.response.data.message);
        }

    }

    const handleLogout = async()=>{
        const {data} = await axios.get("https://healmate-d6a2.onrender.com/api/user/logout" , { withCredentials: true });
        setUser(null);
        localStorage.removeItem("userInfo" , "");
        navigate("/");
    }


    // let activePrescriptions = [];
    // {
    //     (user) ? (activePrescriptions = user.prescriptions.filter((pre) => {
    //         const currDate = new Date();
    //         let lastDate = new Date(pre.startDate);
    //         lastDate.setDate(lastDate.getDate() + pre.durationInDays - 1);
    //         lastDate.setHours(23, 59, 59, 999);
    //         return (currDate <= lastDate);
    //     })) : (activePrescriptions = [])
    // }
    return (
        <div className="container">
            <div className="card mb-2" style={{ background: "rgba(255, 255, 255, 0.2)", display: "flex", justifyContent: "center" }}>
                <h3 className="card-header" style={{ color: "#2c2c2c" }}>Active Prescriptions</h3>
                <div className="card-body" style={{ display: "flex" , flexDirection :"column", alignItems : "center" , justifyContent: "space-between" }}>
                    {(activePrescriptions.length === 0) ? (
                        <p>Currently you have no active prescriptions!</p>
                    ) : (
                        <>
                            {activePrescriptions.map((pre, idx) => {
                                let startDate = new Date(pre.startDate)
                                let day = startDate.getDate()
                                let month = startDate.getMonth()+1
                                let year = startDate.getFullYear()
                                return (
                                    <div key={idx} className="card" style={{ background: "rgba(255, 255, 255, 0.2)", width: "100%" }}>
                                        <h3 className="card-header" style={{ color: "#2c2c2c" }}>{pre.diagnosisName
                                        }</h3>

                                        <div className="card-body">
                                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Duration in days:-
                                                    <span className="ms-1">{pre.durationInDays}</span></label>
                                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Start Date :- <span className="ms-1">{day}/{month}/{year}</span></label>
                                            </div>
                                            <div className="container">
                                                <h5 className="fw-semibold mb-1">Medicines</h5>
                                                {pre.medicines.map((med , idx)=>{
                                                    return (
                                                        <div key={idx} className="d-flex mb-3 mt-1" style={{flexDirection : "column" , justifyContent : "center" , alignItems : "center" , background: "rgba(255, 255, 255, 0.2)"}}>
                                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Name:-
                                                    <span className="ms-1">{med.name}</span></label>
                                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Frequency per Day :- <span className="ms-1">{med.frequencyPerDay}</span></label>
                                                <label className="fw-semibold mb-2" style={{ color: "#2c2c2c" }}>Dosage Amount :-
                                                    <span className="ms-1">{med.dosageAmount}</span></label>
                                            </div>
                                                
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="card-footer">
                                            <button onClick={()=> handleDelete(pre._id)} className="btn btn-danger" type="button">Delete</button>
                                        </div>

                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
            <button onClick={handleLogout} className="btn btn-danger" type="button">Logout</button>
        </div>
    )
}

export default PrescriptionsInfo;