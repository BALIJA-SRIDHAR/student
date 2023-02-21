if(process.env.NODE_ENV!=="production"){
    require("dotenv").config()
}

const { urlencoded } = require("express")
const express=require("express")
const {engine}=require("express-handlebars")
const mongoose=require("mongoose")
let contactModel=require("./Model/Contact")

let app=express()

app.use(express.static(__dirname+"/public"))
mongoose.set('strictQuery', true);
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGODB_URI,(err)=>{
    if(err) throw err
    console.log("database is connected");
})

app.engine("handlebars",engine())
app.set("view engine","handlebars")

app.get("/",(req,res)=>{
    res.render("home",{title:"WELCOME TO STUDENT APP"})
})
app.get("/contact",(req,res)=>{
    res.render("contact",{title:"Student Registration"})
})
app.post("/contact",async (req,res)=>{
    await new contactModel(req.body).save()
    console.log("save data");
    res.redirect(302,"/")
})
app.get("/allstudents",async (req,res)=>{
    const student=await contactModel.find({}).lean()
    res.render("allstudents",{student})
})

app.listen(4000,(err)=>{
    console.log("server is running on port 4000");
})