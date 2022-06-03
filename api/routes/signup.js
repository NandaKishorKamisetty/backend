var exp=require('express')
var signupApi=exp.Router()
var asynchandler=require("express-async-handler")
var bcryptjs= require("bcryptjs")
signupApi.use(exp.json())


signupApi.post('/signup',asynchandler(async(req,res,next)=>{

    let userObj=req.body
    dbObj=req.app.get('databaseObject')
    colObj=dbObj.collection('users')
    let userObjDb =await colObj.findOne({email:userObj.email})
    
    userObj.dateofbirth=new Date(userObj.dateofbirth).toISOString();
    
    if (userObjDb) {
        // 422 Unprocessable Entity: server understands the content type of the request entity
        // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
        return res.status(200).json({
          errors: [
            {
              msg: "The user already exists",
            }
          ],
        });
      }
        userObj.password=await bcryptjs.hash(userObj.password,6)
        let result= await colObj.insertOne(userObj)
        res.status(200).json({
            errors: false
          });
}))





module.exports=signupApi