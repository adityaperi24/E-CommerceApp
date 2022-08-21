const express = require('express') 

const passQuery = require('./database.js')
ordersRouter = express.Router(); 

orders.get('/seeAll',  async (req,res,next)=>{
    

    try{
    console.log('request received')
     let query = 'Select * from public."Orders" where "Username"=$1'
     const { Username } = req.user;

     const params = [Username]
    const orders =  await passQuery(query, params)
    if (! carts[0]){
        const responseObject = {message: "No such Orders"}
        res.status(501).send(responseObject)

    }
    else{
        query = 'Select PID from public."Cart"  Natural Join public."Cart" where Username =$1'
        const items =  await passQuery(query, params)
        if(!items){
            res.status(200).send({message: "No items in cart"})
            return
        }     
        const products = []
        query = 'select * from public."Products" where PID= $1'
     items.forEach(async (item) => {
            params = [item.PID]
            allItems = await passQuery(query, params)
            products.push(allItems[0])
        })
        responseObject = {products : products}
        res.status(200).send(responseObject)
    
    }
}catch(err){
     next(err)
    }

})