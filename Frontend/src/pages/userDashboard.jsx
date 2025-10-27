import React from "react";
import Nav from "../Components/Nav";
import {useUser} from "../Context/useUser";
import PersonalInfo from "../Components/personalInfo";
import PrescriptionsInfo from "../Components/prescriptionsInfo";

const Dashboard = ()=>{
    const {user , setUser} = useUser();
    //("user on dashboard" , user);
    return (
        <div className="container-fluid pt-4" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center", width: "100%", minHeight: "100vh" }}>
            <Nav />
            <div>
                <h1 style={{ color: "#2E2E2E" }}>Heal Mate</h1>
                <p className="mt-3" style={{ color: "#3D5A80" }}>
                    {user && `Hello ${user.name}`}
                    <br></br>
                    Your personal health dashboard — everything at a glance..
                </p>
            </div>
            <PersonalInfo/>
            <PrescriptionsInfo/>
        </div>
    )
}

export default Dashboard ;