const passQuery = require("./database")

 async function checkAccount(username) {
    let params = [username]
    let query = 'Select * from public."User" where "Username"=$1'
    const accounts =  await passQuery(query, params)
    if(accounts[0]){
        throw new Error(`Username Already Exists`)
    }

    else{
        console.log("Ready to create account")
    }
}


module.exports = {checkAccount}