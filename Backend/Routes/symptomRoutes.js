const express = require("express");
const protect = require("../Middlewares/authMiddleware");
const symptomChecker = require("../Controllers/symptomController");

const router = express.Router();

router.post("/check" , protect , symptomChecker);

module.exports = router;