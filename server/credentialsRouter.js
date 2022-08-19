const express = require('express') 

const passQuery = require('./database.js')

const { checkAccount } = require('./validationChecks.js')

const passportHelper = require('./passport')


const loadCredentials = async(app) => {
app.use('/credentials', credentialsRouter)
const passport = await passportHelper(app)

const notAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    res.redirect('/')

  }
  next()
}

app.post('/LogIn', notAuthenticated, passport.authenticate("local", 
    {failureRedirect: "/LogIn"}, (req, res) => {
      res.redirect("profile")
    })
    )



app.post('/create',  async (req,res,next)=>{
    

  try{
   const { body } = req;
   const { username } = body
   await checkAccount(username)
   const {fullName} = body
   const {lastName} = body
   const {password} = body
   const {contact} = body
   const query = 'INSERT INTO public."User"("Username", "FullName", "Password", "Contact") VALUES ($1, $2, $3, $4)'
   const params = [username,fullName,password, contact]

   await passQuery(query, params)
  res.status(200).send({message: "Account Created Successfully!"})
  } catch(err){
   next(err)
  }



})

app.get('/LogOut', (req, res) => {
  req.logout()
  res.redirect("/LogIn")
})





app.use((err, req, res, next) => {
    
  res.status(500).send({message: err.message})
})
}
 module.exports = loadCredentials