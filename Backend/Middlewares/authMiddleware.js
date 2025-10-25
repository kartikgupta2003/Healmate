const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const Prescription = require("../Models/prescriptionsModel");
const SymptomCheck = require("../Models/symptomsModel");

const protect = asyncHandler(async(req , res , next)=>{
    console.log("entered");
    const token = req.cookies?.uid;

    console.log("token is " , token)

    if(!token){
        const err = new Error("Not authorized !");
        err.status=401;
        throw err ;
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    console.log(decoded);

    const user = await User.findById(decoded.id).select("-password")
                                                .populate("symptomChecks")
                                                .populate("prescriptions");

    console.log(user);

    if(user){
        req.user = user ;
        next();
    }
    else{
        const err = new Error("Not authorized , token failed");
        err.status = 401 ;
        throw err ;
    }
})

module.exports = protect ;