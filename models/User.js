const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema =new Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
 

    password:{
        type:String,
        required:true,
        minlength:4
    }

});

module.exports=mongoose.model('User',userSchema);