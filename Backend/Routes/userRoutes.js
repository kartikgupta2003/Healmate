const express = require("express");
const {registerUser , loginUser , showUserDashboard , updateUser , addNewMedicalHistory , deleteMedicalHistory , addUserToken , logoutUser} = require("../Controllers/userController.js");
const protect = require("../Middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/me" , protect , showUserDashboard);
router.patch("/update" ,protect , updateUser);
router.post("/addToken", protect ,addUserToken);
router.get("/logout" , protect , logoutUser);


module.exports = router;
