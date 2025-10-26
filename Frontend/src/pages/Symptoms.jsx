import React, { useState , useEffect } from "react";
import AvatarComp from "../Components/Avatar";
import Nav from "../Components/Nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import SearchResult from "../Components/SearchResult";
import { messaging } from '../firebase'
import { getToken, onMessage } from 'firebase/messaging';

const Symptomspage = () => {

    // function to request notification permission from user 
    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            // generate token 
            const token = await getToken(messaging, { vapidKey: "BB8mlDm4I4NUdv67cEM4F7PZU0fUy1lg8-OxLP8MK8QDQF0Bk2wzm_GA4yCbaZ-lm-NKmR2TasMQh_Isr23NJPA" })
            await axios.post("https://healmate-d6a2.onrender.com/api/user/addToken", { userToken: token }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log("token generated ", token);
            // now we need to send this token to DB
        }
        else if (permission === 'denied') {
            alert('You denied for the notifications !');
        }
    }

    useEffect(()=>{
        requestPermission();
    } , []);

    const [symptom, setSymptom] = useState("");
    const [searching, setSearching] = useState(false);
    const [searchResult, setSearchResult] = useState();

    const inputHandler = (e) => {
        setSymptom(e.target.value);
    }

    const submitHandler = async (e) => {
        if (e.key !== 'Enter' || symptom === "") return;
        setSearching(true);
        const body = {
            symptoms: symptom
        }

        const config = {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }

        try {
            const { data } = await axios.post("https://healmate-d6a2.onrender.com/api/symptoms/check", body, config);

            console.log(data);
            setSearching(false);
            setSymptom("");

            setSearchResult(data)
        } catch (err) {
            setSearching(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error(err.response.data.message);
        }
    }

    return (
        <div className="container-fluid pt-4" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center", width: "100%", minHeight: "100vh" }}>
            <Nav />
            {searching ? (<>
                <div className="spinner-border" style={{ width: "5rem", height: "5rem", position: "fixed", bottom: "100px" }} role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </>) : (
                <>
                    {(!searchResult) ? (
                        <>
                            <div>
                                <h1 style={{ color: "#2E2E2E" }}>Heal Mate</h1>
                                <p style={{ color: "#3D5A80" }}>Notice something off with your health?
                                    <br></br>
                                    We’ll help you understand it.</p>
                            </div>
                            <div className="d-flex rounded-pill overflow-hidden" style={{ width: "70%", height: "45px", background: "white" }}>
                                <input placeholder="Enter your symptoms (e.g., headache, fever, sore throat)" onChange={inputHandler} onKeyDown={submitHandler} style={{ width: "100%", height: "100%", fontSize: "16px", padding: "10px 15px" }} type="text" value={symptom}></input>
                                <button onClick={submitHandler} className="btn" style={{ color: "black" }}><i className="fa-solid fa-paper-plane"></i></button>
                            </div>
                        </>
                    ) : (<SearchResult diagnosis={searchResult.diagnosis} func={setSearchResult} />)}
                </>
            )}
        </div>

    )
}

export default Symptomspage;