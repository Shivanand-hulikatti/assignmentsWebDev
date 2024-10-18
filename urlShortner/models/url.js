const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    vistedHistory:[{ timeStamp :{type:Date}}]
},{timestamps:true});

const URL = mongoose.model('Url',urlSchema);

module.exports = URL;