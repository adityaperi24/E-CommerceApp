
import { useState } from 'react';
import loginAccount from './api/loginAccount';
import {useNavigate} from 'react-router-dom';

function LoginPrompt(props) {
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)
      const history = useNavigate(); 

    const redirectSignUp = () =>  {
      console.log('test button')
      history('/')
    }

    async function onLoginAccount(event)  {
      event.preventDefault()      

        console.log('login request received')
        const response = await loginAccount(username,password);
        console.log(response)
        if (response) {
           history('/profile')
           return
        }
        alert('Invalid Credentials')
        history('/login')

    }

    



    return (
<div className="prompt1">
<form onSubmit={(e)=>{onLoginAccount(e)}} >
    <p className='formtitle'> Enter Account Details </p>
        <label>
        Username 
          <div>
            <input
            required
              id="id"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
        </label>
        <label>
         Password
          <div>
            <input
            required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          </label>

          
          <input className='submission' type='submit' value='Submit' />
        

      </form>
      <button onClick={redirectSignUp}>Sign up instead</button>


</div>
    );
  }

  export default LoginPrompt;