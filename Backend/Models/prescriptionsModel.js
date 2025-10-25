const mongoose = require("mongoose");

const prescriptionsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true ,
    } ,
    diagnosisName : {
        type : String ,
        required : true 
    } ,
    medicines : [{
        name : {
            type : String ,
            required : true 
        } ,
        frequencyPerDay : {
            type : Number ,
            required : true ,
        } ,
        dosageAmount : {
            type : String ,
            // eg -> 5 ml , 2 tablets 
            required : true
        } ,
    }] ,
    durationInDays : {
        type : Number ,
        required : true ,
    } ,

    startDate : {
        type : Date ,     //basically i can add a drop down to add months or years , and internally convert it into days before sending it to backend 
        default : Date.now
    },
    notificationsEnabled : {
        type : Boolean ,
        default : true ,
    }

} , {timestamps : true});

const Prescription = mongoose.model("Prescription" , prescriptionsSchema);

module.exports = Prescription ;