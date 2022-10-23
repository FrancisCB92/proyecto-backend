const { Mensajes } = require('../models/mensajes.js');
const { Usuario } = require('../models/users.js');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs')
const axios = require("axios")

const crearUsuario = async (req, res) => {
  try {
    const err = validationResult(req);
    if (err.isEmpty()){
      let salt = bcryptjs.genSaltSync(10)
      let hash = bcryptjs.hashSync(req.body.password, salt)
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hash
      }
      const usuario = new Usuario(user)
      await usuario.save()
      res.status(201).json({msg:"has creado tu cuenta con éxito!", usuario})
    } else {
      res.status(501).json(err)
    }
  } catch (error) {
    res.status(501).json({error})
  }
}

const loginUser = async (req, res) =>{ 
  try {
      const err = validationResult(req)
      if (err.isEmpty()){
        const usuario = await Usuario.findOne({email: req.body.email})
        if (usuario == null){
          res.json({mgs:"el mail o la contraseña es incorrecta"})
        } 
        else if (!bcryptjs.compareSync(req.body.password, usuario.password)){
          res.json({msg:"el mail o la contraseña es incorrecta"})
        } 
        else { 
          const user ={
            _id: usuario._id,
            name: usuario.name
          }
          req.session.user = user;
          if (req.body.remember){ 
            res.cookie("sessionDelUsuario", req.session.user, {maxAge: 6000*60*24})
          };
          res.json({msg: "usuario logueado", remember: req.body.remember})}
      }
  } catch (error) {
    res.json(error)
  }
}

const logout = (req, res)=>{
  res.clearCookie("sessionDelUsuario")
  req.session.destroy()
  res.json({msg:"usuario fuera de sessión"})
}

const verSession = async (req, res) =>{
  res.json(req.session)
}

const verCookieSession = async (req, res) =>{
  res.json(req.cookies.sessionDelUsuario)
} 

//postear msg
const crearMsg = async (req, res) => {
  try {
    const err = validationResult(req);
    if (err.isEmpty()){
      let usuarioLogueado = await Usuario.findOne({_id: req.session.user._id})
      let posteo = {
          name: usuarioLogueado.name,
          verified: usuarioLogueado.verified_user,
          hidden: req.body.hidden,
          msg: req.body.msg
        }
        const msg = new Mensajes(posteo)
        await msg.save()
        await Usuario.updateOne({ _id: req.session.user._id },{ $inc: {msg_count: +1} })
        res.status(201).json({posteo})
    } else {
      res.status(501).json(err)
    }
  } catch (error) {
    res.status(501).json({error})
  }
}

//likes al usuario
const like = async (req, res) =>{
  await Usuario.updateOne({_id: req.params.id},{ $inc:{likes: +1}})
  res.json({msg: "has dado like!"})
}

//ver "muro" de usuario
const vistaMuro = async (req, res) => {
  const todosMsg = await Mensajes.find({id: req.params.name})
  res.status(200).json({ todosMsg })
}

//eliminar msg
const eliminarMsg = async (req, res) => {
  item= await Mensajes.findByIdAndDelete(req.params.id)
  res.status(200).json({msg: "el siguiente item se eliminó correctamente", item})
}

//consulta axios
const consultaAxios = async (req, res) =>{
  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
    res.json({status: respuesta.status, data: respuesta.data})
  } catch (error) {
    res.json({status: error.response.status, data: error.response.data})
  }
}

module.exports = controllers = { crearMsg, eliminarMsg, crearUsuario, loginUser, logout, verSession, verCookieSession, like, vistaMuro, consultaAxios }