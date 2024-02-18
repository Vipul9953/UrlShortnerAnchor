const URL = require("../models/url");
const User = require("../models/user");
const shortid = require('shortid');
const validator = require('validator');
const axios = require('axios');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


 

exports.createShortURL = catchAsyncErrors(async(req, res, next)=>{
  const { originalUrl } = req.body;
  console.log("create url");
  
  //isValid Url
  if (!validator.isURL(originalUrl)) {
    return next(new ErrorHandler('Invalid URL format', 400 ));  
  }


  const user = await User.findById(req.user._id);
   console.log(user);
    let find = false;

  for (const item of user.url) {
    const temp = await URL.findById(item);
    if (temp.originalUrl === originalUrl) {
      find = true;
      break;
    }
  }

    //already url in db
  if(find){
    console.log("find",find);
    return next(new ErrorHandler('URL Already in Use Please Choose diffrent Url', 400 ));  
    }
  //isReachableUrl
  try {
    await axios.head(originalUrl);
  } catch (error) {
    return next(new ErrorHandler('URL is not reachable or does not exist', 400 ));  
  }


   

  // Generate a short code
  const shortCode = shortid.generate();

  
  // Create a new URL entry in the database
  const urlObj = {
    originalUrl, 
    shortUrl: `${shortCode}`,
    owner: req.user._id,
  };


   const url = await URL.create(urlObj);   

   user.url.unshift(url._id);
    
   await user.save();
   console.log("done");

    res.status(201).json({ user, shortUrl: url.shortUrl });
});

exports.redirectToOriginalURL =  catchAsyncErrors(async(req, res, next)=>{
  const { shortCode } = req.params;
    const url = await URL.findOne({ shortUrl: `${shortCode}` });
    if (url) {
        const originalUrl = await url.originalUrl;
        url.click++;
        await url.save();
      return res.status(201).json({
        originalUrl
      })
      res.redirect(url.originalUrl);
    } else {
    return next(new ErrorHandler('URL is Wrong', 404));  
    }
  
});


 

 
