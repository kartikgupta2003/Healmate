const User = require("../Models/userModel.js");
const asyncHandler = require("express-async-handler"); 
const generateToken = require("../Config/generateToken.js");

const registerUser = async(req,res,next)=>{
    let {name , email , password , age , gender , weight , medicalHistory} = req.body ;
    
    try{
        if(!name || !email || !password || !age || !weight){
            // throw new Error("Please fill all the required fields !");
            const err = new Error("Please fill all the required fields !");
            err.status = 400;
            throw err;
        }

        if(age <= 0 || weight <= 0){
            if(age<=0){
                const err= new Error("Age cannot be negative or zero!");
                err.status = 400;
                throw err;
            }

            if(weight <= 0){
                const err= new Error("Weight cannot be negative or zero!");
                err.status = 400;
                throw err;
            }
        }

        const existingUser = await User.findOne({email : email});
        if(medicalHistory.length === 0) medicalHistory="No medical history available.";
        if(existingUser){
            const err= new Error("User already exists!");
            err.status = 400;
            throw err;
        }

        const user = await User.create({
            name ,
            email ,
            password ,
            age ,
            gender ,
            weight ,
            medicalHistory
        });
        //(user);

        return res.status(200).send({"message" : "User resgistered successfully !"})
    }catch(err){
        next(err);
    }
}

const loginUser = asyncHandler(async(req,res)=>{
    const {email , password} = req.body ;

    const user = await User.findOne({email : email}).populate("prescriptions");

    if(user && (await user.matchPasswords(password))){
        const token = generateToken(user._id);
        res.cookie("uid" , token, {
            httpOnly: true, 
            maxAge : 7 * 24 * 60 * 60 * 1000 
        });
        user.password="";
        res.send(user);
    }
    else{
        const error = new Error("Invalid email or password !");
        error.status= 401;
        throw error ;
    }
})

const showUserDashboard = asyncHandler(async(req,res)=>{
    let user = req.user ;
    res.json(user);
})

const updateUser = asyncHandler(async(req,res)=>{
    const {updateField , newValue} = req.body ;

    if(!updateField || !newValue){
        let err = new Error("Please provide the correct field and value to update !");
        err.status = 400 ;
        throw err; 
    }

    if(updateField === "weight" || updateField === "age"){
        if(updateField === "weight" && value <= 0){
            let err = new Error("Weight cannot be negative or zero!");
            err.status = 400 ;
            throw err; 
        }

        if(updateField === "age" && value <= 0){
            let err = new Error("Age cannot be negative or zero!");
            err.status = 400 ;
            throw err; 
        }
    }

    const user = req.user ;

    const updatedUser = await User.findOneAndUpdate({_id : user._id} , { $set : {[updateField] : newValue}} , {new : true}).populate("prescriptions");

    //("user got updated " , updatedUser);

    res.json(updatedUser);
})


const addUserToken = asyncHandler(async(req,res)=>{
    const {userToken} = req.body ;
    const id= req.user._id;
    const user = await User.findByIdAndUpdate(id , {$set : {token : userToken}} , {new : true}).populate("prescriptions");
    //("user token add ho gya " , user);
    res.json(user);
})

const logoutUser = (req,res)=>{
    res.clearCookie("uid");
    res.status(200).send("User logged out successfully !");
}

module.exports = {
    registerUser ,
    loginUser ,
    showUserDashboard ,
    updateUser , 
    addUserToken ,
    logoutUser
}