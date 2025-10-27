import React , {useContext , createContext , useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";

export const userContext = createContext(null);


export const Provider = (props)=>{
    const [user , setUser] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        //("chal ja mere bhai");
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         Even though you’ve defined the field in your Mongoose schema as:

// startDate: { type: Date, required: true }


// Mongoose indeed stores it in MongoDB as a Date type (not a string).
// However, when you send that data to the frontend (e.g., via Express + JSON response), it automatically gets serialized to a string in ISO format (like "2025-10-23T00:00:00.000Z").

// That’s because:

// JSON doesn’t have a native Date type — only strings, numbers, etc.

// During serialization (res.json()), all Date objects become strings.

// So on the frontend, when you receive user.prescriptions, each startDate looks like:

// "2025-10-23T00:00:00.000Z"
        if(!userInfo){
            //("chala na ")
            navigate("/");
        }
        setUser(userInfo);
        //("chal ja mere bhai");
    } , [location.pathname , navigate, setUser ])

    return (
        <userContext.Provider value={{user , setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

