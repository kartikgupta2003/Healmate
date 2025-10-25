const mongoose = require("mongoose");

const symptomsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : true ,
    } ,
    symptoms : {
        type : String ,
        required : true, 
    },
    apiResponse : {
        type : Object ,
        required : true ,
    } , 
    createdAt : {
        type : Date ,
        default : Date.now
    }
} , {timestamps : true});

const SymptomCheck = mongoose.model("SymptomCheck" , symptomsSchema);

module.exports = SymptomCheck ;
