import React from "react";

const SearchResult = (props)=>{
    let advice = props.diagnosis.advice;
    advice = advice.split("*").map((s)=> s.trim()).join(" ");
    return (
        <div className="container">
            <div className="card" style={{backgroundColor : "rgba(255,255,255,0.7)"}}>
                <div className="card-header" style={{display : "flex" , justifyContent : "space-between" , color : "#1e1e1e"}}>
                    Result Summary
                    <button className="btn btn-close" onClick={()=> props.func("")} type="button"></button>
                </div>
                <div className="card-body" style={{color : "#333"}}>
                    <h4>Possible conditions :-</h4>
                    <br></br>
                    <ul>
                        {props.diagnosis.conditions.map((ele , index)=>{
                            return <li key={index} style={{marginBottom : "10px"}}>{ele}</li>
                        })}
                    </ul>
                    <br></br>
                    <p>{advice}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchResult;