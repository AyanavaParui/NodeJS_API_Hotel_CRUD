const express=require('express');
const router = express.Router();
const person = require('./../models/person');

//Post route to add a person
// router.post('/person', function (req, res) {

//     //Assuming the request body contains the person data
//     const data = req.body

//     //creeate a new person document using mongoose model
//     // const newPerson = new person();
//     // newPerson.name=data.name;
//     // newPerson.salary=data.salary;
//     // newPerson.work=data.work;
//     // newPerson.mobile=data.mobile;
//     // newPerson.email=data.email;
//     // newPerson.address=data.address;
//     // newPerson.age=data.age;
//     const newPerson = new person(data);

//     //save the new person to the Database
//     newPerson.save((error,savedperson)=>{
//         if(error){
//             console.log('Error saving person'+error)
//             res.status(500).json({error:'Internal Server Error'})
//         }else{
//             console.log('Data saved Sucessfully ')
//             res.status(200).json(savedperson)
//         }
//     })

// })


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log('data Saved...');

        res.status(200).json(response);

    } catch (error) {
        console.log('data not Saved...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



//GET methode to get person
router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log('data Fetched...');
        res.status(200).json(data);

    } catch (error) {
        console.log('data not Saved...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//find by worktype
router.get('/:work',async(req,res)=>{
    try {
        const workType=req.params.work;//Extract work from url parameter (this is called parameterised url)
    if(workType=='chef'||workType=='waiter'||workType=='manager'){
        const response=await person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response)
    }else{
        res.status(404).json({error:"Invalid Worktype"})
    }
    } catch (error) {
        console.log('data not found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    })


    //update 

    router.put('/:id',async(req,res)=>{
        try {
            const personId=req.params.id; //extract id from the Url Parameter
            const updatedPersonData=req.body;//updated data from the person

            const response=await person.findByIdAndUpdate(personId,updatedPersonData,{
                new:true, //Return the updated Document
                runValidators:true, //Run Mongoose validation
            })
            if (response === null) {
                return res.status(404).json({error:'Person Not Found'});
            }
            console.log('Data Updated...')
            res.status(200).json(response)
        } catch (error) {
            console.log('data not found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    })


    //Delete
router.delete('/:id',async(req,res)=>{
    try {
        const personId=req.params.id; //extract id from the Url Parameter
        //Assuming you have a person model
        const response =await person.findByIdAndDelete(personId);
        if (response === null) {
            return res.status(404).json({error:'Person Not Found'});
        }
        console.log('Data Deleted Sucessfully!!!')
            res.status(200).json({message :"Person Deleted Sucessfully!!!"})
    } catch (error) {
        console.log('data not found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

    module.exports=router;