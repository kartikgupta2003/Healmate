const asyncHandler = require("express-async-handler");
const Prescription = require("../Models/prescriptionsModel");
const User = require("../Models/userModel");

const prescriptionAdder = asyncHandler(async(req,res)=>{
  const {diagnosisName , medicines , durationInDays , startDate , notificationsEnabled} = req.body ;
  const userId = req.user._id ;
  
  if(!diagnosisName || !medicines || !durationInDays){
    const err = new Error("Please fill all the required fields !");
    err.status = 400 ;
    throw err;
  }

  if(durationInDays <= 0){
    const err= new Error("Duration must be positive !");
    err.status =400;
    throw err;
  }

  const prescription = await Prescription.create({
    userId ,
    diagnosisName ,
    medicines ,
    durationInDays ,
    startDate ,
  })

  const user = await User.findByIdAndUpdate(userId , {$push : {prescriptions : prescription._id}} , {new : true}).populate("prescriptions");

  console.log(user);

  res.status(200).json(user);
})

const prescriptionDeleter = asyncHandler(async(req,res)=>{
  const {preId}= req.body ;
  const userId = req.user._id ;


  await Prescription.deleteOne({_id : preId});
  const user = await User.findByIdAndUpdate(userId , {$pull : {prescriptions : {_id :  preId}}} , {new : true}).populate("prescriptions");

  res.status(200).send(user);

})

module.exports = {
  prescriptionAdder ,
  prescriptionDeleter
};