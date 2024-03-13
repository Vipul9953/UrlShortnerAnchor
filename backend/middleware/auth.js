const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

 exports.isAuthenticatedUser = catchAsyncError(async(req, res, next)=>{
    // const {token} = req.cookies; 
   const token = req.cookies._vercel_jwt;
    if(!token){
        return next(new ErrorHandler("Please Login to access this resorce", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})

exports.authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
          return next( new ErrorHandler(`Roles: ${req.user.role} is not allowed to access this resources`, 403))//403 means server ko pata hai ye kya karna chahta hai lekin server ne access nhi diya
        }

        next();
    }
}
