const {Usuario} = require("../models/users.js")

const validarMail = async (req, res, next) => {
  const item = await Usuario.findOne({email: req.body.email})
  if(item === null){
    next()
  } else {
    res.status(500).json({msg: "usted ya se encuentra registrado, ingrese a través de login"}) 
}}

module.exports = { validarMail }
