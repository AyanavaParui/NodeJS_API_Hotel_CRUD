//passport middlewire
const passport=require('passport')
const localStrategy=require('passport-local').Strategy;//user name and password stratagy
const person=require('./models/person') //adjust the path as needed
//authintication macanisim
passport.use(new localStrategy(async(username,password,done)=>{
    //autentication logic
    try {
        console.log(`Recive Credentials: ${username} and ${password}`);
        const user =await person.findOne({username:username});
        if(!user){
            return done(null,false,{message:'Incorrect Username'})
        }
        const isPasswordMatch=await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:"Incorrect Password"})
        }
    } catch (error) {
        return done(error)
    }
}))

module.exports=passport;//Export configured passport