const mongoose=require('mongoose');

//Define the mongoose Url
const mongoURL="mongodb://localhost:27017/hotels";//Replace "hotels" with your databse name

//Set up Mongoose Connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB Connection
const db=mongoose.connection;

//Define event listners for databse Connection
db.on('connected',()=>{
    console.log("Connected to mongoDB server...");
})

db.on('error',(err)=>{
    console.log("MongoDB cONNECTION ERROR "+err);
})

db.on('disconnected',(err)=>{
    console.log("MongoDB is Disconnected !!!");
})

//Export the database Connection
module.exports=db;