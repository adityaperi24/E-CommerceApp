const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passQuery = require('./database.js')



const passportHelper = async(app) => {

app.use(passport.initialize());  
app.use(passport.session());

passport.use(
    new LocalStrategy( async(username, password, done) => {
        let query = 'Select * from public."User" where "Username"=$1'
        
        const params = [username]
        const accounts =  await passQuery(query, params)
        const user = accounts[0]
        try{

        if(! user) {
            return done(null, false)
        }

        if(password != user.Password) {
            return done(null, false)
        }
        
        return done(null, user)
        }catch(err) {
            console.log(err.message)
            return null
        }}
))

passport.serializeUser((user, done) => {
    done(null, user.Username)
})

passport.deserializeUser(async(username, done) => {
    let query = 'Select * from public."User" where "Username"=$1'
    const params = [username]
  try{
    const accounts =  await passQuery(query, params)
    const user = accounts[0]

    

    return done(null, user)}
    catch(err){
        consolelog(err)
    }
})
return passport
}

module.exports = passportHelper