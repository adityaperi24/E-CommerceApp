
import { useState } from 'react';
import { useEffect } from 'react';
import profileInfo from './api/profileInfo';
function ProfilePage() {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(()=> {
        async function fetchData(){
        const user =  await profileInfo()
        setUserInfo(user)
        
    
        }
        fetchData()
       },[])
    if(!userInfo){
        return (
            <p>loading page</p>
        )
    }

    if(userInfo){
        return (
            <div>
            <p>{userInfo.Username}</p>
            <p>{userInfo.Password}</p>
            <p>{userInfo.FullName}</p>
            <p>{userInfo.Contact}</p>
            </div>

        )
    }



    
  }

  export default ProfilePage;