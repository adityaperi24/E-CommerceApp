const express = require('express') 

const passQuery = require('./database.js')
credentialsRouter = express.Router();

const { checkAccount } = require('./validationChecks.js')







credentialsRouter.get('/signin',  async (req,res,next)=>{
    

    try{
      console.log('request received')
     let query = 'Select * from public."User Information" where "Username"=$1 and "Password"=$2'
     const { body } = req;
     console.log(body)
     const { username } = body
     console.log(username)

     const { password } = body
     const params = [username, password]
    const accounts =  await passQuery(query, params)
    if (! accounts[0]){
        throw new Error('Incorrect Account Credentials, Please Try Again')
    }
    else{
        const responseObject = {message: "Login Successfull"}
        res.status(200).send()
    }
    
    } catch(err){
     next(err)
    }



})

credentialsRouter.post('/create',  async (req,res,next)=>{
    

  try{
   const { body } = req;
   const { username } = body
   await checkAccount(username)
   const {firstName} = body
   const {lastName} = body
   const {password} = body
   const {contact} = body
   const query = 'INSERT INTO public."User Information"("Username", "FirstName", "LastName", "Contact", "Password") VALUES ($1, $2, $3, $4, $5)'
   const params = [username,firstName, lastName,contact, password]

   await passQuery(query, params)
  res.status(200).send({message: "Account Created Successfully!"})
  } catch(err){
   next(err)
  }



})






credentialsRouter.use((err, req, res, next) => {
    
  res.status(500).send({message: err.message})
})

 module.exports = credentialsRouter