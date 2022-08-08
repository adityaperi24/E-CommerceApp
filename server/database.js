const {Client} = require('pg')
require("dotenv").config()

const devConfig = {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  password:process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE


}
const proConfig = {
  connectionString :  process.env.DATABASE_URL
}

async function passQuery(query,params) {
  try {
    const client = new Client(process.env.NODE_ENV === "production"? proConfig : devConfig)
  await client.connect()
  console.log('Connection to database successful')
  let results = await client.query(query,params)
  console.log('query successful')
  let data = results.rows
  
  await client.end()
  return data
  
   } 
  catch(error){
    throw error
  }
}

module.exports = passQuery