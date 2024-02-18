const express = require('express');
const dotenv = require('dotenv');
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require('path')
// Enable CORS with the appropriate origin
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Replace with your actual frontend URL on Vercel
    credentials: true,
};

app.use(cors(corsOptions));

//midlleware
//using middleware
app.use(express.json());
app.use(cookieParser());

dotenv.config({path:"backend/config/config.env"})

//database connected
const dataBase = require('./config/database');
dataBase();



//routing
const URL = require("./routes/urlRoute");
const USER = require("./routes/userRoute");
app.use("/api/v1", URL);
app.use("/api/v1", USER);





//Middleware for Errors
app.use(errorMiddleware);




app.listen(process.env.NEXT_PUBLIC_API_URL || process.env.PORT, ()=>{
    console.log(`server is working at ${process.env.PORT}`);
})