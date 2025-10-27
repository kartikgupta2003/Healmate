const errorHandler = (err , req , res , next)=>{
    let message = err.message || "Something went wrong !";
    let status = err.status || 500;
    //(err.status);
    res.status(status);
    res.send({
        message : message 
    })
}

module.exports = errorHandler;