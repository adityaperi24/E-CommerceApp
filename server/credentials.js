
const passQuery = require('./database.js')

const { checkAccount } = require('./validationChecks.js')

const passportHelper = require('./passport')


const loadCredentials = async(app) => {


const passport = await passportHelper(app)



app.post('/login', passport.authenticate("local", 
    {failureRedirect: "/login"}), (req, res) => {
    res.send({transfer: true})
        }
    )



app.post('/create',  async (req,res,next)=>{
    

  try{
    console.log('request received')
    console.log(req.body)
   const { body } = req;
   const { username } = body
   console.log(username)
   await checkAccount(username)
   const {fullName} = body
   const {password} = body
   const {contact} = body
   const query = 'INSERT INTO public."User"("Username", "Password", "FullName", "Contact") VALUES ($1, $2, $3, $4)'
   const params = [username, password, fullName, contact]

   await passQuery(query, params)
  res.status(200).send({message: "Account Created Successfully!"})
  } catch(err){
   next(err)
  }



})

app.get('/LogOut', (req, res) => {
  req.logout()
  res.redirect("/login")
})





app.use((err, req, res, next) => {
    
  res.status(500).send({message: err.message})
})
}
 module.exports = loadCredentials