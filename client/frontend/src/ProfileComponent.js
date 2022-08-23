
import { useState } from 'react';
import loginAccount from './api/loginAccount';
import { useHistory } from 'react-router-dom';

function LoginPrompt() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)
    const history = useHistory(); 
    
    const redirectLogin = () =>  {
      console.log('test button')
      history.push('/login')
      history.go(0)
    }

    async function onLoginAccount(event)  {
      event.preventDefault()      

        console.log('login request received')
        const response = await loginAccount(username,password);
        console.log(response)
        setRedirect(response)
        if (response) {
            history.push('/profile')
            history.go(0)
            return
        }
        alert('Incorrect credentials')
        history.push('/login')
        history.go(0)

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
      <button onClick={redirectLogin}>Log in instead</button>


</div>
    );
  }

  export default LoginPrompt;