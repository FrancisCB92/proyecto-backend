const mongoose = require("mongoose")
require('dotenv').config()

const conect = async ()=>{
  
  try{
    await mongoose.connect(process.env.CONNECT_MONGO)
    console.log("base de datos conectada")
  } catch{
    console.log("no se puede conectar a la base de datos")
  }
}

module.exports = {conect}