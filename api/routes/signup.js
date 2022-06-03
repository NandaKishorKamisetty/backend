var exp=require('express')
var signupApi=exp.Router()
var asynchandler=require("express-async-handler")
var bcryptjs= require("bcryptjs")
signupApi.use(exp.json())


signupApi.post('/user',asynchandler(async(req,res,next)=>{

let userObj=req.body
dbObj=req.app.get('databaseObject')
colObj=dbObj.collection('users')
let userObjDb =await colObj.findOne({mail:userObj.email})

if(userObjDb == null){
    if (userObj.password == userObj.repassword){
        delete userObj.repassword
        userObj.type="user"
        userObj.password=await bcryptjs.hash(userObj.password,6)
        let result= await colObj.insertOne(userObj)
        res.send({message:'success',user:userObj})
    }

    else{
        res.send({message:'password failed'})
    }
}

else{
    res.send({message:'failed'})
    }
}))





module.exports=signupApi