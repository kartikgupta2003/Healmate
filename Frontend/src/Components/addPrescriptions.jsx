import React , {useState} from "react";
import {toast , ToastContainer} from "react-toastify";
import axios from "axios";
import {useUser} from "../Context/useUser.js";


const PrescriptionForm = ()=>{

    const {setUser} = useUser();

    const [state , setState] = useState({
        diagnosisName : "" ,
        medicines : [] ,
        durationInDays : 0 ,
    })

    const [name , setName] = useState("");
    const [frequency , setFrequency] = useState("");
    const [amount , setAmount] = useState("");

    const handleName = (e)=> setName(e.target.value)
    const handleFrequency = (e)=> setFrequency(e.target.value)
    const handleAmount = (e)=> setAmount(e.target.value)

    const inputHandler = (e)=>{
        const name = e.target.name ;
        const value = e.target.value ;

        if(name === "medicines"){
            const med = {name : name , frequencyPerDay : frequency , dosageAmount : amount};
            // if(state.medicines.size === 0){
            //     setState({...state , medicines : [med]})
            // }
            // else{
                setState((obj)=>{
                    return {...obj
                      , 
                      medicines : [...obj.medicines , med]
                    }
                })
            // }b
            setName("");
            setFrequency("");
            setAmount("");
            return ;
        }

        return setState({...state , [name] : value});
    }

    const submitHandler = async()=>{
        const body = {
            diagnosisName : state.diagnosisName,
            medicines : state.medicines,
            durationInDays : state.durationInDays,
        }

        const config = {
            headers : {
                "Content-type" : "application/json"
            } ,
            withCredentials : true 
        }

        try{
            const {data}= await axios.post("http://localhost:8000/api/prescriptions/add" , body , config);

            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);


            // console.log("ur prescription " , data);
            setState({
                diagnosisName : "" ,
                medicines : [] ,
                durationInDays : 0 ,
            })

            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.success("Prescription added successfully !");

        }catch(err){
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error(err.response.data.message);
        }
    }

    return (
        <div
  className="bg-dark bg-opacity-25 p-4 rounded-4 shadow-sm container responsive-form"
  style={{
    width: "45%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  }}
>
  <form style={{ width: "100%" }}>
    {/* Diagnosis Section */}
    <div className="mb-3 text-start">
      <label className="form-label fw-semibold">
        Diagnosis Name <span className="text-danger">*</span>
      </label>
      <input
        onChange={inputHandler}
        className="form-control rounded-pill"
        type="text"
        name="diagnosisName"
        placeholder="Enter diagnosis name"
        value={state.diagnosisName}
      />
    </div>

    {/* Medicine Inputs */}
    <div className="mb-3 text-start">
      <label className="form-label fw-semibold">
        Add Medicine <span className="text-danger">*</span>
      </label>
      <input
        onChange={handleName}
        className="mb-2 form-control rounded-pill"
        type="text"
        name="name"
        placeholder="Medicine name"
        value={name}
      />
      <input
        onChange={handleFrequency}
        className="mb-2 form-control rounded-pill"
        type="number"
        name="frequencyPerDay"
        placeholder="Frequency per day"
        value={frequency}
      />
      <input
        onChange={handleAmount}
        className="mb-3 form-control rounded-pill"
        type="text"
        name="dosageAmount"
        placeholder="Dosage amount (e.g., 2 tablets or 5 ml)"
        value={amount}
      />
      <div className="d-flex justify-content-center">
        <button
          onClick={inputHandler}
          className="btn btn-primary rounded-pill px-4"
          type="button"
          name="medicines"
        >
          + Add
        </button>
      </div>
    </div>

    {/* Duration */}
    <div className="mb-3 text-start">
      <label className="form-label fw-semibold">
        Duration in days <span className="text-danger">*</span>
      </label>
      <input
        onChange={inputHandler}
        className="form-control rounded-pill"
        type="number"
        name="durationInDays"
        placeholder="e.g., 7"
        value={state.durationInDays}
      />
    </div>

    {/* Save Button */}
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-danger rounded-pill px-5 fw-semibold"
        type="button"
        onClick={submitHandler}
      >
        Save
      </button>
    </div>
  </form>
</div>

    )
}

export default PrescriptionForm;