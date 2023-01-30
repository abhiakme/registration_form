const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const hbs=require("hbs");
const port=process.env.PORT||3000;
const app=express();

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/resistration",()=>{
    console.log("db connected");
});

// const formmodel=require("./models/form");
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

const static_path=path.join(__dirname,"../public");
const templets_path=path.join(__dirname,"../templets/views");
const partials_path=path.join(__dirname,"../templets/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templets_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.get("/login",(req,res)=>{
    res.render("login");
});


app.post("/login",async (req,res)=>{
    const email=req.body.e;
    const password=req.body.p;
    try{
        const detail=await formmodel.findOne({email:email});
        if(detail.password!=password){
            res.send("wrong password");
        }
        else{
            res.render("index2");
        }
    }catch(err){
        res.send("wrong email");
    }
});

app.post("/register",async (req,res)=>{
    const password=req.body.p;
    const repassword=req.body.r;
    const name=req.body.n;
    const email=req.body.e;
    const detail=await formmodel.findOne({email:email});
    try{
        if(detail){
            res.send("this email is alredy exist");
        }
    else if(password===repassword){
    const data=await formmodel.insertMany({
               name:name,
               email:email,
               password:password,
               repassword:repassword
            });
            res.render("index2");
        }
        else{
                res.send("password not maching");
               }
    }catch(err){
        res.status(400).send("err");
    }       
});

app.listen(port,()=>{
    console.log("lisning");
});