 
const profileInfo = async () => {
    try{
        console.log('sending request')
       const response = await fetch(`http://localhost:3000/orders`,{
        credential: 'same-origin'       })
    
  
    
    const {user} = await response.json();
    console.log(user)
    return user

}catch(err){
    console.log(err.message)
}
  };

  module.exports = profileInfo