const User=require('../models/User');

const getUsers=async(req,res,next)=>{
    try{
        let users=await User.find({});
        res.status(200).json(users);
    }
    catch(err){
        next(err)
    }
   
}
const getUser=async(req,res,next)=>{
    try{
        let user=await User.findOne({id:req.params.id});
        res.status(200).json(user);
    }
    catch(err){
        next(err)
    }
   
}

const addUser=async(req,res,next)=>{
    if(req.body.name&&req.body.phone&&req.body.email&&req.body.hobbies.length>0){
        let existingUser=await User.findOne({phone:req.body.phone});
        if(existingUser){
            res.status(400).json({error:"Phone number already exists"});
        }
        else{
            existingUser=await User.findOne({email:req.body.email});
            if(existingUser){
                res.status(400).json({error:"Email already exists"});
            }
            else{
                let validPhoneNum=/^[1-9]\d{9}/g.test(String(req.body.phone));
                if(validPhoneNum){
                    let user=new User(req.body);
                    try{
                        let newUser=await user.save();
                        res.status(200).json(newUser);
                    }
                    catch(err){
                        next(err)
                    }
                }
                else{
                    res.status(400).json({error:"Invalid Phone number"});
                }
            }
        }
        
       
    }
    else{
        res.status(400).json({error:"Enter all fields"});
    }
    
}

/*const updateUser=async(req,res,next)=>{
    let id=req.params.id;
    try{
        let updatedUser=await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);
    }
    catch(err){
        next(err)
    }
   
}*/

const updateUser=async(req,res,next)=>{


    if(req.body.name&&req.body.phone&&req.body.email&&req.body.hobbies.length>0){
        let id=req.params.id;
        let existingUser=await User.findOne({phone:req.body.phone});
        console.log('existing user',existingUser);
        if(!existingUser._id.equals(id)){
            res.status(400).json({error:"Phone number already exists"});
        }
        else{
            existingUser=await User.findOne({email:req.body.email});
            if(!existingUser._id.equals(id)){
                res.status(400).json({error:"Email already exists"});
            }
            else{
                let validPhoneNum=/^[1-9]\d{9}/g.test(String(req.body.phone));
                if(validPhoneNum){
                   
                    
                    try{
                        let updatedUser=await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
                        res.status(200).json(updatedUser);
                    }
                    catch(err){
                        next(err)
                    }
                }
                else{
                    res.status(400).json({error:"Invalid Phone number"});
                }
            }
        }
        
       
    }
    else{
        res.status(400).json({error:"Enter all fields"});
    }
}


const deleteUser=async(req,res,next)=>{
    let id=req.params.id;
    try{
        let deletedUser=await User.findByIdAndDelete(id);
        res.status(200).json(deletedUser);
    }
    catch(err){
        next(err)
    }
   
}
module.exports={getUser,getUsers,addUser,updateUser,deleteUser};


