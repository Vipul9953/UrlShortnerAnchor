const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); 
const  connectDatabase = require("./config/database"); 
const dotenv = require('dotenv');
const errorMiddleware = require("./middleware/error");
const cors = require('cors');
require("dotenv").config()



// Using Middlewares
app.use(
    cors({
        origin:["https://url-shortner-anchor-fijbs8jq0-vipul-kumars-projects-b376d108.vercel.app/", "https://urlshortapp.onrender.com

"],
        methods:["POST", "GET", "PUT", "DELETE"],
        credentials:true,
    })
)
app.use(express.json());
app.use(errorMiddleware);
app.use(express.urlencoded());
app.use(cookieParser());



 


// Importing Routes
const user = require("./routes/userRoute");
const url = require("./routes/urlRoute");

// Using Routes
app.use("/api/v1", user);
app.use("/api/v1", url);
 

connectDatabase();
 

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


module.exports = app; 

  
