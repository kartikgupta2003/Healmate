const dotenv = require("dotenv");
dotenv.config();
const http= require("http");
const express = require("express");
const userRoutes = require("./Routes/userRoutes.js");
const symptomRoutes = require("./Routes/symptomRoutes.js");
const prescriptionRoutes = require("./Routes/prescriptionRoutes.js");
const dashboardRoutes = require("./Routes/dashboardRoutes.js");
const errorHandler = require("./Middlewares/errorMiddleware.js");
const connectDB = require("./Config/db.js");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("./cronJob/scheduler.js");

connectDB();
const app = express();

// const __dirname = path.resolve();

app.use(cors({
  origin: "https://healmate-d6a2.onrender.com",  // ✅ your frontend origin
  credentials: true,                // ✅ allow credentials (cookies)
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname , "/public")));

app.use("/api/user" , userRoutes);
app.use("/api/symptoms" , symptomRoutes);
app.use("/api/prescriptions" , prescriptionRoutes);
app.use(errorHandler);

app.use(express.static(path.join(__dirname , "../Frontend/dist")))
app.get(/.*/ , (req,res)=>{
  res.sendFile(path.join(__dirname , "../Frontend/dist/index.html"))
})

const port= process.env.PORT;
app.listen(port , ()=>{
    console.log(`Server started at port ${port}`);
})