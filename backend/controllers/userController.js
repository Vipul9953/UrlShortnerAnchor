const User = require("../models/user");
const URL = require("../models/url");
const sendEmail  = require("../utils/sendEmail");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.registerUser =  catchAsyncErrors( async(req, res, next)=>{
  const {name, email, password} = req.body;  
 

  let userAlready = await User.findOne({ email });
  if (userAlready) {
   return next(new ErrorHandler('User already exists', 400));  
  }  

  const user = await User.create({
    name,email,password
  });

  sendToken(user, 200, res);
 
})
 
  exports.login = catchAsyncErrors(async (req, res, next)=>{

    const {email, password} = req.body;

   

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
 
})

  exports.logoutUser = catchAsyncErrors(async(req, res, next)=>{

    res.cookie(`token`, null, {
      expires:new Date(Date.now()),
      httpOnly:true
    })
  
    res.status(200).json({
      success:true,
      message:"Logged Out",
    })
    
  })

  //forgot and reset
  exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
   

    const user = await User.findOne({email:req.body.email});

    if(!user){
     return next(new ErrorHandler("User not found", 404))
    }
        sendToken(user, 200, res);
    //get resetpasswrd
 const resetToken  = user.getResetPasswordToken();
 await user.save({validateBeforeSave:false});
 const resetPasswordUrl = `${req.protocol}://${req.get(
  "host"
 )} http://localhost:3000/password/reset/${resetToken}`;
   
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not request this email then, please ignore it`
   
   
    try {
     await sendEmail({
       email:user.email,
       subject:`Anchors ShortURL Password Recovery`,
       message,
     })
   
     res.status(200).json({
       success:true,
       message:`Email sent to ${user.email} successfully`,
     });
   
    } catch (error) {
     user.resetPasswordToken=undefined;
     user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false});
     return next(new ErrorHandler(error.message, 500)) 
    }
   })
   
  
   //reset Password
   exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler('Token is invalid or has expired', 401));
    }
 sendToken(user, 200, res);
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  
});


//get my urls
exports.getMyUrls = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user._id);
     sendToken(user, 200, res);
    console.log("urls");
    const allURL = [];

    for (let i = 0; i < user.url.length; i++) {
      const url = await URL.findById(user.url[i]);
      allURL.push(url);
    }

    res.status(200).json({
      success: true,
      allURL,
    });
   
  });


//   //delete my urls
  exports.deleteURL =  catchAsyncErrors( async(req, res, next)=>{
  
        const url = await URL.findById(req.params.id);


        if(!url){
           return next(new ErrorHandler("Post not found", 404));
        }

        await url.deleteOne();
       

        const user = await User.findById(url.owner);


        
        const index = user.url.indexOf(req.params.id);

        user.url.splice(index, 1);
       

        await user.save();

        res.status(200).json({
            success:true,
            message:"Post deleted",
        })
})


