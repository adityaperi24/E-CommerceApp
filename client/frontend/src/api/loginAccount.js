 
const loginAccount = async (username,password) => {
    try{
        console.log('sending request')
       const response = await fetch(`http://localhost:3000/login`,{
        method: "POST", 
        credential: 'same-origin',
            body: JSON.stringify({
            username: username,
            password: password
            
          }),     headers: {
            "Content-Type": "application/json",
          },



    }
    
    );
  
    
    const {transfer} = await response.json();
    console.log(transfer)
    return transfer

}catch(err){
    console.log(err.message)
}
  };

  module.exports = loginAccount