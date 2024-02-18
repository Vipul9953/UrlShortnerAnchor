const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs");//hash the password
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      select: false,
    },
    
     

    url:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"url",
      }
  ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });


  userSchema.pre("save", async function (next){//save ke time, or Pre ek event hai
    if(!this.isModified("password")){//agar modified password nhi hua to simple next call() hoga or dubara hash nhi karnge hum
      next();
    }

    this.password = await bcrypt.hash(this.password, 10);
  });

  //jwt token => jaise hi user create hoga to login bhi ho jayega
  userSchema.methods.getJWTToken=function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
      expiresIn:process.env.JWT_EXPIRE, 
    })
  }

  //compare password
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

//generating password reset toekn
  userSchema.methods.getResetPasswordToken = function(){

    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

//hasing and adding resetPasswordToken to userSchema
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
this.resetPasswordExpire = Date.now() + 15*60*1000;

return resetToken;
  }
  
  module.exports = mongoose.model("User", userSchema);