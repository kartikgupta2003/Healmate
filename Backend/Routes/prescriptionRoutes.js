const express = require("express");
const {prescriptionAdder , prescriptionDeleter} = require("../Controllers/prescriptionController");
const protect = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/add" , protect , prescriptionAdder);
router.post("/delete" , protect , prescriptionDeleter);

module.exports = router;