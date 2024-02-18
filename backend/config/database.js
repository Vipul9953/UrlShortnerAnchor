const mongoose = require('mongoose');
const dataBase = ()=>{
  mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('database is sucessfully connected');
  }).catch((error)=>{
    console.log(error);
  })
}

module.exports = dataBase;
