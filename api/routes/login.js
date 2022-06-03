var exp=require('express')
var loginApi=exp.Router()

loginApi.use(exp.json())
const asynchanlder =require('express-async-handler')
const bcrypt =require("bcryptjs")


loginApi.post('/signin',asynchanlder(async(req,res,next)=>{

dbObj=req.app.get('databaseObject')
credObj=req.body
colObj=dbObj.collection('users')
let dbUser= await colObj.findOne({email:credObj.email})
if(dbUser==null){
    return res.status(200).json({
        errors: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
}
let isMatch=await bcrypt.compare(credObj.password,dbUser.password)
    if(!isMatch){
        return res.status(200).json({
            errors: [
              {
                msg: "Invalid credentials",
              },
            ],
          });
    }
    res.status(200).json({
        errors: false});

}))




module.exports=loginApi