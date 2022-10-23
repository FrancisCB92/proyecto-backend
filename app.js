const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const session = require('express-session')
const cookieparser = require('cookie-parser')
require('dotenv').config()



const app = express()

const indexRouter = require("./routes/index.js")

const {conect} = require("./db/db.js")


app.use(logger("dev"));
app.use(express.json());

app.use(cors());

app.use(cookieparser())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));



app.use('/', indexRouter);
conect();

module.exports= app
