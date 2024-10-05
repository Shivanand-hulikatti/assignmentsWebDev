const express = require('express');
const app = express();

let requestCount = 0;
function httpCounter(req,res,next){
    requestCount++;
    console.log(requestCount);
    console.log(req.url);
    console.log(req.method);
    console.log(Date.time());
}

app.get('/sum',httpCounter,(req,res)=>{
    res.json({
        'msg':"request recieved",
    })
})

app.listen(3000);