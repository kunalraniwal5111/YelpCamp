const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

const UserSchema= new Schema({
    email:{
        type:String,
        required:true,
        // this is actually not considered a validation,
        // it sets up an index so if we sets up a validation middleware at some point 
        // unique:true is not going to be one of the validaions
        unique:true
    }
})
UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',UserSchema);