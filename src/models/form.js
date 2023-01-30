const mongoose=require("mongoose");
const formschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    repassword:{
        type:String,
        required:true
    }
});
const formmodel=mongoose.model("formdatas",formschema);
mongoose.exports=formmodel;

//this form model is not readed by app.js why dont know???
