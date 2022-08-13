const express = require('express') 

const passQuery = require('./database.js')
cartRouter = express.Router();




cartRouter.get('/:username',  async (req,res,next)=>{
    

    try{
      console.log('request received')
     let query = 'Select * from public."Cart" where "Username"=$1'
     const  username  = req.params.username
     console.log(username)

     const params = [username]
    const items =  await passQuery(query, params)
    if (! items[0]){
        const responseObject = {message: "There are no items in this cart"}
        res.status(501).send(responseObject)

    }
    else{
        const products = []
        query = 'Select * from public."Product Information" where "PID"=$1'
        let params = []
        items.forEach(async (item) => {
            params = [item.PID]
            allItems = await passQuery(query, params)
            products.push(allItems[0])
        })
        responseObject = {products : products}
        res.status(200).send(responseObject)
    }
    
    } catch(err){
     next(err)
    }



})

cartRouter.post('/:username/:productID',  async (req,res,next)=>{
    

    try{
      console.log('request received')
     let query = 'INSERT INTO public."Cart"(username, "PID") VALUES ($1, $2)'
     const  username  = req.params.username

     console.log(username)
     const  PID  = req.params.productID


     const params = [username, PID]
     await passQuery(query, params)
    if (! items[0]){
        const responseObject = {message: "Item added"}
        res.status(200).send(responseObject)

    }

    
    }  catch(err){
     next(err)
    }



})

cartRouter.post('/:username/:productID',  async (req,res,next)=>{
    

    try{
    console.log('request received')
    let query = 'INSERT INTO public."Cart"(username, "PID") VALUES ($1, $2)'
    const  username  = req.params.username

    console.log(username)
    const  PID  = req.params.productID


    const params = [username, PID]
    await passQuery(query, params)
        
    const responseObject = {message: "Item added"}
    res.status(200).send(responseObject)

    
    }  catch(err){
     next(err)
    }



})

cartRouter.delete('/:username/:productID',  async (req,res,next)=>{
    

    try{
    console.log('request received')
    let query = 'DELETE FROM  public."Cart" where Username = $1 and "PID" = $2'
    const  username  = req.params.username

    console.log(username)
    const  PID  = req.params.productID


    const params = [username, PID]
    await passQuery(query, params)
    

    console.log('Item Deleted')
    res.status(201).send()
    

    
    }  catch(err){
     next(err)
    }



})

