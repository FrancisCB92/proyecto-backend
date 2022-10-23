const mongoose = require('mongoose');

const Schema = mongoose.Schema
const schema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  verified:{
    type: Boolean,
    default: false   
  },
  hidden: {
    type: Boolean,
    default: false
  },
  msg:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  comentaries:{
    type: Number,
    default: 0
  },
  likes:{
    type: Number,
    default: 0
  }
})

const Mensajes = mongoose.model('Mensajes', schema);
module.exports = { Mensajes }