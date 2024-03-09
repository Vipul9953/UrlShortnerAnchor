const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); 
const  connectDatabase = require("./config/database"); 
const dotenv = require('dotenv');
const errorMiddleware = require("./middleware/error");

require("dotenv").config()



// Using Middlewares
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

  
