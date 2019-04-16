const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const User=require('./models/User');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb://127.0.0.1/loginAndRegistration',{useNewUrlParser:true},()=>{

    console.log('connected');

});
app.post('/register',(req,res)=>{

    const newUser=new User();

    newUser.email=req.body.email;
    newUser.password=req.body.password;

    newUser.save().then(userSaved=>{

        res.send('UserSaved');

    }).catch(err=>{
        res.send('user cant be saved');

    })
});

app.listen(8888,()=>{

    console.log('listening on port no 8888');
});
