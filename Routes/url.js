const express=require("express");
const {handleGenerateNewShortURL,handlesGetAnalytics}=require("../Controllers/index")
const router = express.Router();
router.post("/",handleGenerateNewShortURL);

router.get("/analytics", handlesGetAnalytics )
module.exports= router; 