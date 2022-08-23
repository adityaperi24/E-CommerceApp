const express = require('express') 

const passQuery = require('./database.js')
cartRouter = express.Router();
const uuid = require('uuid');


cartRouter.post('/', async(req, res, next) => {
    try{
        console.log('request received')
        let query = 'Select * from public."Cart" where "Username"=$1'    
        const { Username } = req.user;

        const params = [Username]
        const items =  await passQuery(query, params)
            if (items[0]){
                  const message = 'Cart Already Exists'

                  res.status(500).send({message: message})
                  return
            }
            else {
                query = 'INSERT INTO public."Cart"("CartID", "Date", "Username") VALUES ($1, $2, $3)'
                const cartID = uuid.v4()
                const date = new Date()

                params = [cartID, date, Username]
                await passQuery(query, params)



            }
    } catch(err){
        next(err)
    }
})

cartRouter.get('/',  async (req,res,next)=>{
    

    try{
    console.log('request received')
     let query = 'Select * from public."Cart" where "Username"=$1'
     const { Username } = req.user;

     const params = [Username]
    const carts =  await passQuery(query, params)
    if (! carts[0]){
        const responseObject = {message: "Cart Doesn't Exist"}
        res.status(501).send(responseObject)
        return
    }
    else{
        query = 'Select PID from public."Cart"  Natural Join public."CartItems" where Username =$1'
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

cartRouter.put('/:productID',  async (req,res,next)=>{
    

    try{
      console.log('request received')
      let query = 'Select * from public."Cart" where "Username"=$1'
      const { Username } = req.user;
      
      const params = [Username]
     const carts =  await passQuery(query, params)
     if (! carts[0]){
        const responseObject = {message: "Cart Doesn't Exist"}
        res.status(501).send(responseObject)

    }

    const {CartID} = carts[0]
    
     const  PID  = req.params.productID
     const itemID = uuvid.v4()

    params = [itemID, PID, cartID]

    query = 'INSERT INTO public."CartItems"("ItemID", "PID", "CartID") VALUES ($1,$2,$3);'
     await passQuery(query, params)
        const responseObject = {message: "Item added"}
        res.status(200).send(responseObject)



    
    }  catch(err){    
     next(err)
    }
})



cartRouter.delete('/:productID',  async (req,res,next)=>{
    

    try{
    console.log('request received')
    let query1  = 'Select * from public."Cart" where "Username"=$1'
    let  params = [Username]
    const carts =  await passQuery(query, params)
    if (! carts[0]){
       const responseObject = {message: "Cart Doesn't Exist"}
       res.status(501).send(responseObject)

   }
   const {CartID} = carts[0]
    
   const  PID  = req.params.productID
   params = [CartID, PID]
    let query2 = 'DELETE FROM  public."CartItems" where "CartID" = $1 and "PID" = $2'
    await passQuery(query, params)
    

    console.log('Item Deleted')
    res.status(201).send()
    

    
    }  catch(err){
     next(err)
    }



})

cartRouter.use((err, req, res, next) => {
    
    res.status(500).send({message: err.message})
  })

  module.exports = cartRouter