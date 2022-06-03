var exp=require('express')
var loginApi=exp.Router()

loginApi.use(exp.json())
const asynchanlder =require('express-async-handler')
const bcrypt =require("bcryptjs")


loginApi.post('/dashboard',asynchanlder(async(req,res,next)=>{

dbObj=req.app.get('databaseObject')
credObj=req.body
colObj=dbObj.collection('users')
let dbUser= await colObj.findOne({mail:credObj.email})

if (dbUser !==  null){
    if(bcrypt.compare(credObj.password,dbUser.password)){
        if(dbUser.type == "admin"){
            res.send({message:"admin",obj:dbUser})
        }
        
        else{
            res.send({message:"user",obj:dbUser})
        }
    }
    else{
    res.send({message:"password"})
    }
}

else{
    res.send({message:"failed"})
}

}))




module.exports=loginApi