import React from "react";
import AvatarComp from "./Avatar";

const Nav = ()=>{
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark bg-opacity-10">
                <div className="container">
                    {/* <a className="navbar-brand" href="#">Navbar</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item rounded-pill border border-3">
                                <a className="nav-link" aria-current="page" href="/dashboard">User Dashboard</a>
                            </li>
                            <li className="nav-item rounded-pill border border-3">
                                <a className="nav-link" href="/symptoms">Search Symptoms</a>
                            </li>
                            <li className="nav-item rounded-pill border border-3">
                                <a className="nav-link" href="/prescriptions">Add Prescriptions</a>
                            </li>
                            {/* <li className="nav-item rounded-pill border border-3">
                                <button className="btn"><AvatarComp/></button>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Nav;