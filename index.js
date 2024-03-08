const express = require('express');
const dotenv = require('dotenv');
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require('path')
// Enable CORS with the appropriate origin
app.use(cors());


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




app.listen(process.env.PORT || 4000, ()=>{
    console.log(`server is working at ${process.env.PORT}`);
})


// api/index.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors({
//     origin: ["https://url-shortner-anchor-mavg.vercel.app/"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));
// app.use(bodyParser.json());

// // Your routes go here
// app.get('/', (req, res) => {
//     // Handle your endpoint logic
// console.log("done");
//     res.json({ message: 'Hello from Vercel serverless function!' });
//   });
  

module.exports = app;