const mongoose = require('mongoose');

const Schema = mongoose.Schema
const schema = new Schema ({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true    
  },
  profileImg: {
    type: String,
  },
  password:{
    type: String,
    required: true
  },
  verified_user: {
    type: Boolean,
    default: false
  },
  likes:{ 
    type: Number,
    default: 0
  },
  msg_count:{
    type: Number,
    default: 0
  }
})

const Usuario = mongoose.model('Usuario', schema);
module.exports = { Usuario }