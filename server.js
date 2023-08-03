const express = require("express");
const path = require("path");
const bodyparser= require("body-parser"); //(main logic to know)
const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/todolistDB2", {useNewUrlParser: true}, { useUnifiedTopology: true });
// import {useState} from "react";
// const[cat,setcat]=useState("");
mongoose.connect("mongodb+srv://deekshit:9848022338@cluster0.mjqw8eh.mongodb.net/todolistDB2", {useNewUrlParser: true}, { useUnifiedTopology: true });

const itemsSchema = {
    name: String
  };
  
const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
    name: String,
    items: [itemsSchema]
  };
  
const List = mongoose.model("List", listSchema);

const app = express();
// app.use(bodyparser.urlencoded({extended: true})); //(main logic to know)
app.use(bodyparser.json())
// Define a route to handle checkbox state 


const arr=[]
var cat="";
var presentcat=""


const port = process.env.PORT || 5000;
app.post("/api/add",(req,res)=>{
  const item = req.body.item;
  arr.push(item);
  console.log(arr)
  res.json({"message" :"form submitted"});
})
app.post("/api/Cat",(req,res)=>{
  var item= new List({
    name:req.body.item,
    items:[]
})
cat=(req.body.item)
  item.save();
})


app.get("/api/sendCats",(req,res)=>{
  var catarr=[]
  console.log("sending")
  List.find({})
  .then((items)=>{
     items.map((hero)=>{
      let some={
        name:hero.name,
        key: hero._id
      }
      catarr.push(some)} ) 
      // console.log(catarr)
//   console.log(items[0].name)
res.send(catarr);
  })
    .catch((err) => {
      console.error(err);
    })
  // console.log(catarr);
  
})

app.post("/api/check",(req,res)=>{
  console.log(req.body.key)
  List.deleteOne({name:req.body.key})
  .then(()=>console.log("deleted ra unga amma"+req.body.key))
  
  .catch((error)=> console.log(error));
  res.json({"message" :"form submitted"});
})

app.get("/api/tasks",(req,res)=>{
  console.log("sending")
  res.send(arr);
})



app.post("/api/redirect",(req,res)=>{
  presentcat=req.body.key
  console.log(presentcat+" at redirecting");
})


app.post("/api/All",(req,res)=>{
  List.updateMany({name:presentcat},{$push:{items:{name:req.body.item}}})
  .then(()=>console.log("yass"))
// console.log(presentcat+" at all");
// console.log(req.body.item)
})


app.get("/api/sendall",(req,res)=>{
  var allarr=[]
  console.log("sending")
  console.log(presentcat +" presentcat")
  List.find({name:presentcat})
  .then((items)=>{
    //  items.map((hero)=>{
    //   let some={
    //     name:hero.name,
    //     key: hero._id
    //   }
    //   allarr.push(some)} ) 
      // console.log(catarr)
//   console.log(items[0].name)
// console.log(items);
// console.log(items[0]);
allarr=items[0].items;
// console.log(allarr);
 res.send(allarr);
  })
    .catch((err) => {
      console.error(err);
    })
  // console.log(catarr);
  
})

app.post("/api/alladd",(req,res)=>{
  
  List.updateMany({name:presentcat},{$push:{items:{name:req.body.item}}})
.then(()=>console.log("yass"))
})

app.post("/api/alldelete",(req,res)=>{
  console.log(req.body.key + " delete "+presentcat )
  List.updateMany({ name: presentcat }, { $pull: { items: { name: req.body.key} } }).then(()=>console.log("deleted"))

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

});
