const express = require("express");
const router  = express.Router();
const {check} = require('express-validator')
const controllers = require("../controller/index.js");
const auth = require("../middleware/auth.js");
const { validarMail } = require('../middleware/validarMail.js')

// USUARIO
router.post('/crearusuario', [
  check('name').not().isEmpty().withMessage('nombre inválido'),
  check('email').not().isEmpty().withMessage('campo obligatorio').isEmail().withMessage("Eso no es un email!"),
  check('password').not().isEmpty().withMessage('campo obligatorio'),
  validarMail
  ], controllers.crearUsuario);

router.post('/login', [
  check("email").not().isEmpty().withMessage("campo obligatorio").isEmail().withMessage("Eso no es un email!"),
  check("password").not().isEmpty().withMessage("No se ingresó una contraseña")
], controllers.loginUser)
router.post('/like/:id', controllers.like)

router.delete('/logout', controllers.logout)
router.get('/versession', controllers.verSession)
router.get('/vercookiesession', controllers.verCookieSession)
router.get('/vermuro/:name', controllers.vistaMuro);
// router.get('/verusuario/:iduser', vistaMuroUsuario)

router.post('/postear', [
  check('msg').not().isEmpty().withMessage('tienes que escribir algo'),
  auth
], controllers.crearMsg);

router.delete('/eliminarmensaje/:id', controllers.eliminarMsg)

router.get('/consultaAxios', controllers.consultaAxios)

module.exports= router;