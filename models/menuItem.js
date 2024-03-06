const mongoose =require('mongoose');

//Define the person schema
const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,require:true,
        require:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        require:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],//note taht it is storing a string
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    } 
    
})

//Create Person Model
const menuItem=mongoose.model('menuItem',menuItemSchema);

module.exports=menuItem