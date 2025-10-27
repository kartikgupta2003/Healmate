import React , {useState} from "react" ;
import {toast} from "react-toastify";
import axios from "axios";

const SignUp = (props)=>{
    const [state , setState] = useState({
        name : "",
        email : "",
        password : "",
        showpassword : false ,
        age : 0,
        gender : "select gender",
        weight : 0,
        medicalHistory : "",
    })

    const handleFunction = (e)=>{
        const name = e.target.name ;
        const value = e.target.value ;

        setState((obj)=>{
            return {...obj , [name]: value}
        })
    }

    const handleSubmit = async()=>{
        const body = {
            name : state.name,
            email : state.email,
            password : state.password,
            age : state.age,
            gender : state.gender,
            weight : state.weight,
            medicalHistory : state.medicalHistory,
        }

        const age = Number(state.age);
        const weight = Number(state.weight);


        if(age<=0){
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error("Age cannot be negative or zero!");
        }

        if(weight<=0){
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error("Weight cannot be negative or zero!");
        }

        const config = {
            headers : {
                "Content-type" : "application/json" ,
            } ,
            withCredentials : true 
        }

        try{
            const {data} = await axios.post("https://healmate-d6a2.onrender.com/api/user/register" , body , config);
            //(data);
            window.scrollTo({ top: 0, behavior: "smooth" });
            toast.success("User registered successfully !");
            props.func(1);
        }catch(err){
            //(err);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error(err.response.data.message);
        }
    }

    return (
        <div className="bg-dark bg-opacity-25 mt-3 py-3 authenticationContainer" style={{ width: '100%', maxWidth: '400px'}}>
            <form>
                <div className=" container" style={{ width: '100%', maxWidth: '400px'}}>
                    <label className="form-label">Name<span className="text-danger">*</span></label>
                    <input className="form-control" onChange={handleFunction} type="text" name="name" value={state.name}></input>
                </div>
                <div className=" container mt-2" style={{ width: '100%', maxWidth: '400px'}}>
                    <label className="form-label">Email<span className="text-danger">*</span></label>
                    <input className="form-control" onChange={handleFunction} type="email" name="email" value={state.email}></input>
                </div>
                <div className="container mt-2" style={{ width: '100%', maxWidth: '400px'}}>
                    <label className="form-label">Password<span className="text-danger">*</span></label>
                    <div className="d-flex">
                        <input className="form-control" type={state.showpassword ? 'text' : 'password'} onChange={handleFunction} name="password" value={state.password}></input>
                        <button onClick={()=>{
                            setState((obj)=>{
                                return {...obj , showpassword : !obj.showpassword}
                            })
                        }} className="ms-2 btn btn-light" type="button">{(state.showpassword)?<>Hide</> : <>Show</>}</button>
                    </div>
                </div>
                <div className="container mt-2" style={{ width: '100%', maxWidth: '400px'}}>
                    <label className="form-label">Age<span className="text-danger">*</span></label>
                    <input className="form-control" onChange={handleFunction} type="number" name="age" value={state.age}></input>
                </div>
                <div className="container mt-2" style={{ width: '100%', maxWidth: '400px'}}>
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={state.gender} onChange={handleFunction}>
                        {/* <select> → creates a dropdown menu.
                        className="form-select" → Bootstrap class for styled dropdowns. */}
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="container mt-2" style={{ width: '100%', maxWidth: '400px'}}>
                    <label className="form-label">Weight in Kg<span className="text-danger">*</span></label>
                    <input className="form-control" onChange={handleFunction} type="number" name="weight" value={state.weight}></input>
                </div>
                <div className="container mt-2" style={{ width: '100%', maxWidth: '400px'}}>
                    <label className="form-label">Any Medical history/condition</label>
                    <input className="form-control" onChange={handleFunction} type="text" name="medicalHistory" value={state.medicalHistory}></input>
                    <button onClick={handleSubmit} className="btn btn-primary w-100 mt-3" type="button">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;