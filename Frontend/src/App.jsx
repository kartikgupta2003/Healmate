import React, { useEffect } from 'react';
import { messaging } from './firebase'
import { getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';
import './App.css'
import Homepage from "./pages/homePage";
import Symptomspage from "./pages/Symptoms";
import Prescriptions from './pages/PrescriptionsPage';
import Dashboard from './pages/userDashboard';
import { toast, ToastContainer } from "react-toastify";
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // function to request notification permission from user 
  // async function requestPermission() {
  //   const permission = await Notification.requestPermission();
  //   if (permission === 'granted') {
  //     // generate token 
  //     const token = await getToken(messaging, { vapidKey: "BB8mlDm4I4NUdv67cEM4F7PZU0fUy1lg8-OxLP8MK8QDQF0Bk2wzm_GA4yCbaZ-lm-NKmR2TasMQh_Isr23NJPA" })
  //     await axios.post("http://localhost:8000/api/user/addToken", { userToken: token }, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       withCredentials: true
  //     });
  //     //("token generated ", token);
  //     // now we need to send this token to DB
  //   }
  //   else if (permission === 'denied') {
  //     alert('You denied for the notifications !');
  //   }
  // }

  useEffect(() => {
    // Request user for notification permission
    // requestPermission();
    // Foreground notifications
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.info(`${payload.notification.title}: ${payload.notification.body}`);
    });
  }, [])
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/symptoms" element={<Symptomspage/>}></Route>
        <Route path="/prescriptions" element={<Prescriptions/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        closeOnClick
        pauseOnHover
        theme="colored"
        toastClassName="responsive-toast"
        className="toast-container Toastify__toast-container"
      />
    </div>
  )
}

export default App

// Token is used to uniquely identify each device

