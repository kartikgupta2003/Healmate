import React from "react";
import Nav from "../Components/Nav";
import PrescriptionForm from "../Components/addPrescriptions";

const Prescriptions = () => {
    return (
        <div className="container-fluid pt-4" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center", width: "100%", minHeight: "100vh" }}>
            <Nav />
            <div>
                <h1 style={{ color: "#2E2E2E" }}>Heal Mate</h1>
                <p style={{ color: "#3D5A80" }}>Add your prescriptions here to keep track of your medicines.
                </p>
            </div>
            <PrescriptionForm/>
        </div>
    )
}

export default Prescriptions;