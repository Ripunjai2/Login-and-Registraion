const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const User=require('./models/User');
const bcrypt=require('bcryptjs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb://127.0.0.1/loginAndRegistration',{useNewUrlParser:true},()=>{

    console.log('connected');

});
app.post('/register',(req,res)=>{

    const newUser=new User();

    newUser.email=req.body.email;
    newUser.password=req.body.password;

    bcrypt.genSalt(10,(error,salt)=>{

        bcrypt.hash(newUser.password, salt,(err,hash)=>{

            if(err){
                return err;
            }
            newUser.password=hash;


            newUser.save().then(userSaved=>{

                res.send('UserSaved');
        
            }).catch(err=>{
                res.send('user cant be saved'+err);
        
            })
        })
    })

  
});


app.post('/login',(req,res)=>{

    User.findOne({email:req.body.email}).then(user=>{

        if(user){
            console.log('found email');
            bcrypt.compare(req.body.password,user.password,(err,matched)=>{
                if(err) return err;

                if(matched){
                    
                    res.send('LOGIN SUCCESSFUL');
                }else{
                    res.send('LOGIN FAILED');
                }
                
            })
        }
    })
});

app.listen(8888,()=>{

    console.log('listening on port no 8888');
});
