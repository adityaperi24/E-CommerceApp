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

        if(err){
            return done(err)
        }
        if(! user) {
            return done(null, false)
        }

        if(password != user.Password) {
            return done(null, false)
        }
        
        return done(err)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.Username)
})

passport.deserializeUser(async(username, done) => {
    let query = 'Select * from public."User" where "Username"=$1'
    const params = [username]
    const accounts =  await passQuery(query, params)
    const user = accounts[0]

    if(err) {
        return done(err)
    }

    return done(null, user)
})
return passport
}

module.exports = passportHelper