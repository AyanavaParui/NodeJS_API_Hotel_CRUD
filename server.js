const express = require('express');
const app = express();
const passport=require('./auth')

//config  by dotenv
require('dotenv').config();
//fetichimg data from env
const PORT = process.env.PORT||3000;

require('./db');


var bodyParser = require('body-parser');
app.use(bodyParser.json())//it will store all data in req.boy


//Middle wire function
const logRequest=(req,res,next)=>{
    console.log(`[  ${new Date().toLocaleString()}  ] Request made to :  ${req.originalUrl}`);
    next();//Move to the next Phase
}
app.use(logRequest); //using middle wire for every api

app.use(passport.initialize())

const localAuthMiddleWare=passport.authenticate('local',{session:false})

app.get('/',function (req, res) {                 //app.get('/',logRequest, function (req, res) {    by this we can specify middle wire
    res.send('Welcome To Our Hotel #')
})

//import the router files personroutes
const personRouts =require("./routs/personrouts");
//Use the Routes
app.use('/person',localAuthMiddleWare,personRouts)
//import the router files menuRoutes
const menuRouts =require("./routs/menuRoutes");
//Use the Routes
app.use('/menu',menuRouts)



//LISTENING ON PORT 3000
app.listen(PORT, () => {
    console.log("Server is Running on the port 3000...")
})