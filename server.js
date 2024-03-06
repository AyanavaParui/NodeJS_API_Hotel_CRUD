const express = require('express');
const app = express()

const db = require('./db');


var bodyParser = require('body-parser');
app.use(bodyParser.json())//it will store all data in req.boy



app.get('/', function (req, res) {
    res.send('Welcome To Our Hotel #')
})


//import the router files personroutes
const personRouts =require("./routs/personrouts");
//Use the Routes


app.use('/person',personRouts)
//import the router files menuRoutes
const menuRouts =require("./routs/menuRoutes");
//Use the Routes
app.use('/menu',menuRouts)



//LISTENING ON PORT 3000
app.listen(3000, () => {
    console.log("Server is Running on the port 3000...")
})