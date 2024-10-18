const mongoose = require('mongoose');

async function connect(url){
    return mongoose.connect(url).then(()=>{
        console.log('Connected to the database');
    }).catch((err)=>{   
        console.log('Error connecting to the database');
        console.log(err);
    });
};

module.exports = connect;