 
const createAccount = async (username,password,fullName, contact) => {
    try{
        console.log('sending request')
    const response = await fetch(`http://localhost:3000/create`,{
        method: "POST", 
        body: JSON.stringify({
            username: username,
            password: password,
            fullName: fullName,
            contact: contact
          }),     headers: {
            "Content-Type": "application/json",
          },
    });
  
    const {message} = await response.json();
  
    return message;
}catch(err){
    console.log(err.message)
}
  };

  module.exports = createAccount