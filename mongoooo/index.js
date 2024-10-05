const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware,JWT_SECRET } = require('./auth') ;
const { UserModel,TodoModel } = require('./db') ;
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://shivanand:n7qhbmhrN3We30MF@testingshiva.0mtre41.mongodb.net/mongoooo');

app.post('/signup',async (req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    await UserModel.create({
        name:name,
        email:email,
        password:password
    })

    res.json({
        msg:"Account has been created",
    })
})

app.post('/signin',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email:email,
        password:password
    })

    if(response){
        const token = jwt.sign({
            id:response._id.toString()
        },JWT_SECRET);

        res.json({
            token
        })
    }else{
        res.staus(403).json({
            msg:'incorrect details',
        })
    }
})

app.post('/todo',authMiddleware,async (req,res)=>{
    const userId = req.userId;
    const todoDescription = req.body.description;
    const done = req.body.done;
    
    const response = await TodoModel.create({
        userId : userId,
        description : todoDescription,
        done : done,
    })

    if(response){
        res.json({
            msg:'todo created',
        })
    }else{
        res.status(403).json({
            msg : 'incorrect inputs',
        })
    }
})

app.get('/todos',authMiddleware,async (req,res)=>{
    const userId = req.userId;
    
    const todos = await TodoModel.findAll({});
    res.json({
        todos
    })
})

app.listen(3000);
