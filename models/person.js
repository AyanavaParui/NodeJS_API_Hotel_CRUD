const mongoose =require('mongoose');
const bcrypt = require('bcrypt')
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
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

personSchema.pre('save',async function(next){
    const person = this;

    //Hash the password only if it has been modified (or is new)
    if(!person.isModified('password'))return next();

    try {
        //password to generate hashpassword
const salt =await bcrypt.genSalt(10);

//hash password
const hashedpassword = await bcrypt.hash(person.password,salt)
person.password=hashedpassword
        next();
    } catch (error) {
      return next(error)  
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try {
        //use bcrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    } catch (error) {
        throw error
    }
}

//Create Person Model
const person=mongoose.model('person',personSchema);


module.exports=person