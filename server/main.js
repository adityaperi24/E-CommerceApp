// Importing and creating an Express Server
const express = require('express') 
const app = express()
const session = require('express-session')

const loadCredentials = require('./credentials')

const  productRouter = require('./productRouter')

const cartRouter = require('./cartRouter')
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


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, (req,res,next)=> {
    console.log('listening at Port ' + PORT)
})


loadCredentials(app)

app.use('/products', productRouter)

app.use('/cart', cartRouter)





