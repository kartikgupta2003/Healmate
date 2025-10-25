const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    // general info 
    name : {
        type : String ,
        required : true,
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true ,
    } ,
    password : {
        type : String ,
        required : true ,
    } ,
    // health related info 
    age : {
        type : Number ,
        required : true ,
    } ,
    gender : {
        type : String ,
        enum : ["Male" , "Female" , "Other"],
    } ,
    weight : {
        type : Number ,
        required : true ,
    },
    medicalHistory : {
        type : String ,
        default : "No medical history available."
    } ,
    symptomChecks : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "SymptomCheck",
        }
    ] ,
    prescriptions :[
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "Prescription",
        }
    ],

    token : {
        type : String ,
    }

} , {timestamps : true});

userSchema.pre("save" , async function (next){
    const user = this ;

    if(!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password , salt);

    next();

});

userSchema.methods.matchPasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}


const User = mongoose.model("User" , userSchema);

module.exports = User ;