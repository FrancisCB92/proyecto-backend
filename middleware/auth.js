
module.exports = (req, res, next) =>{
  if (!req.session.user){
    res.json({ msg: "no estás logueado" })
  } else {
    next()
  }
}