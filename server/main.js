// Importing and creating an Express Server
const express = require('express') 
const app = express()
const session = require('express-session')
const flash = require('express-flash')

const loadCredentials = require('./credentialsRouter')

const  productRouter = require('./productRouter')

// Import cors for security 
const cors = require('cors')

// Setting the port at which the server should listen for requests
const  PORT = process.env.PORT || 3000

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "PUT", "POST", "DELETE"]
}))


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(flash())


app.listen(PORT, (req,res,next)=> {
    console.log('listening at Port ' + PORT)
})

app.use(express.json())

loadCredentials(app)

app.use('/products', productRouter)




