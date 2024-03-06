const mongoose =require('mongoose');

//Define the person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    salary:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String
    } ,
    age:{
        type:Number,
        require:true
    },
})

//Create Person Model
const person=mongoose.model('person',personSchema);

//export module
module.exports=person