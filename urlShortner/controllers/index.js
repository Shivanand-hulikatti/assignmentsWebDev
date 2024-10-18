const Url = require('../models/url');
const shortid = require('shortid');

async function handleCreateShortUrl(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({message:'url is required'});
    }
    const shortUrl = shortid.generate(8);
    Url.create({
        shortUrl : shortUrl,
        redirectUrl : body.url,
        visitedHistory : [],    
    }).then((url)=>{
        res.status(201).json({
            id:url.shortUrl
        });
    }).catch((err)=>{
        res.status(500).json({message:'Internal Server Error'});
    });
} 

async function handleGetAllShortUrls(req,res){
    urls = await Url.find({});
    res.status(200).json(urls);
}

async function handleUrl(req,res){
    const id = req.params.id;
    const url = await Url.findOneAndUpdate({
        _id:id
    },{
        $push:{
            visitedHistory:{
                timeStamp:Date.now()
            }
        }
    })
    res.redirect(url.redirectUrl);
}

async function handleAnalyticsId(req,res){
    const id = req.params.id;
    const url = await Url.findById(id);
    res.status(200).json({
        visitedCount:url.visitedHistory.length,
        url:url.redirectUrl,
    });
}

module.exports={
    handleCreateShortUrl,
    handleGetAllShortUrls,
    handleUrl,
    handleAnalyticsId
};