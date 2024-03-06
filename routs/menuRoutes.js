const express=require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');

//Post Menu
router.post('/', async (req, res) => {
    try {
        const menudata = req.body;
        const newmenu = new menuItem(menudata);
        const response = await newmenu.save();
        console.log('Menu Saved...');

        res.status(200).json(response);

    } catch (error) {
        console.log('Menu not Saved...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//GET menu 
router.get('/', async (req, res) => {
    try {
        const menudata = await menuItem.find();
        console.log('Menu Fetched...');
        res.status(200).json(menudata);

    } catch (error) {
        console.log('Menu not Found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//find menu item by test
router.get('/:test',async(req,res)=>{
    try {
        const testType=req.params.test;//Extract work from url parameter (this is called parameterised url)
    if(testType=='sweet'||testType=='spicy'||testType=='sour'){
        const response=await menuItem.find({taste:testType});
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
            const menuId=req.params.id; //extract id from the Url Parameter
            const updatedmenuData=req.body;//updated data from the person

            const response=await menuItem.findByIdAndUpdate(menuId,updatedmenuData,{
                new:true, //Return the updated Document
                runValidators:true, //Run Mongoose validation
            })
            if (response === null) {
                return res.status(404).json({error:'Menu Not Found'});
            }
            console.log('Menu Updated...')
            res.status(200).json(response)
        } catch (error) {
            console.log('Menu not found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    //Delete
    router.delete('/:id',async(req,res)=>{
        try {
            const menuId=req.params.id; //extract id from the Url Parameter
            //Assuming you have a person model
            const response =await menuItem.findByIdAndDelete(menuId);
            if (response === null) {
                return res.status(404).json({error:'Menu Not Found'});
            }
            console.log('Menu Deleted Sucessfully!!!')
                res.status(200).json({message :"Menu Deleted Sucessfully!!!"})
        } catch (error) {
            console.log('Menu not found...' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

module.exports=router;