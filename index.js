const express=require( "express");
const urlRoute= require("./Routes/url");
const {connectToMongoDB} = require("./connect")
const app=express();
const PORT=8001;
const URL=require("./models/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDb connected"))

app.use(express.json()); 

app.use("/url", urlRoute);

app.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{ $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }})
    res.redirect(entry.redirectURL);
})

app.listen(PORT, ()=>console.log(`Server started at PORT: ${PORT}`))
