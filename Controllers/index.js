const shortid = require("shortid");
const URL=require('../models/url')
async function handleGenerateNewShortURL(req,res){
     const body=req.body;
     if(!body.url)
    return res.status(400).json({error: "url is required"});
      const shortID=shortid();
      await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[],
      })

      return res.json({id: shortID});
}

async function handlesGetAnalytics(req,res){
     const shortId =req.params.shortId;

     try {
      const urlData = await URL.findOne({ shortId });
      return res.json({ totalclicks: urlData.visitHistory.length,
        analytics: urlData.visitHistory,
       });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
}
 
module.exports={
    handleGenerateNewShortURL,
    handlesGetAnalytics,
}