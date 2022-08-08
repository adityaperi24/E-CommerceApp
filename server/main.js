// Importing and creating an Express Server
const express = require('express') 
const app = express()

// Import cors for security 
const cors = require('cors')

// Setting the port at which the server should listen for requests
const  PORT = process.env.PORT || 3000

app.listen(PORT, (req,res,next)=> {
    console.log('listening at Port ' + PORT)
})


app.use((err, req, res, next) => {
    
    res.status(err.status).send({message: err.message})
  })
