const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String
    },
    hobbies:{
        type:Array
    }
});
UserSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
});
const User=new mongoose.model('user',UserSchema);
module.exports=User;
