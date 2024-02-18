const mongoose = require('mongoose');
const urlSchema = mongoose.Schema({
     originalUrl:{
        type:String,
        require:true
    },

     shortUrl:{
        type:String,
        require:true,
        unique: true
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    click:{
        type:Number,
        default: 0
    },

    createdAt:{
        type:Date,
        default:Date.now,
    }
    

})


module.exports = mongoose.model("URL", urlSchema);