import React , {useState} from "react";
import {toast , ToastContainer} from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [state , setState] = useState({
        email : "" ,
        password : "" ,
        showpassword : false 
    })
    const navigate = useNavigate();

    const handleFunction = (e)=>{
        let name = e.target.name ;
        let value = e.target.value ;

        setState((obj)=>{
            return {...obj , [name] : value}
        })
    }

    const handleSubmit = async()=>{
        const body = {
            email : state.email ,
            password : state.password 
        }

        const config = {
            headers : {
                "Content-type" : "application/json"
            } ,
            withCredentials : true 
        }

        try{
            const {data}= await axios.post("http://localhost:8000/api/user/login" , body , config);
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            // navigate to symptoms page 
            navigate("/symptoms")
        }catch(err){
            // console.log(err.response.data.message);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error(err.response.data.message);
        }
    }

    return (
        <>
        <div className="bg-dark bg-opacity-25 mt-3 authenticationContainer" style={{ width: '100%', maxWidth: '400px', height:"250px"}}>
            <form>
                <div className=" container" style={{ width: '100%', maxWidth: '400px', height:"100%"}}>
                    <label className="form-label">Email<span className="text-danger">*</span></label>
                    <input className="form-control" onChange={handleFunction} type="email" name="email" value={state.email}></input>
                </div>
                <div className="container mt-4" style={{ width: '100%', maxWidth: '400px', height:"100%"}}>
                    <label className="form-label">Password<span className="text-danger">*</span></label>
                    <div className="d-flex">
                        <input className="form-control" type={state.showpassword ? 'text' : 'password'} onChange={handleFunction} name="password" value={state.password}></input>
                        <button onClick={()=>{
                            setState((obj)=>{
                                return {...obj , showpassword : !obj.showpassword}
                            })
                        }} className="ms-2 btn btn-light" type="button">{(state.showpassword)?<>Hide</> : <>Show</>}</button>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary w-100 mt-3" type="button">Login</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login;
