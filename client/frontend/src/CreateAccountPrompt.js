
import { useState } from 'react';
import createAccount from './api/createAccount';
import {useNavigate} from 'react-router-dom';

function CreateAccountPrompt(props) {

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");

    const [password, setPassword] = useState("");
    const [contact, setContact] = useState('')
    const [created, setCreated] = useState('')
    const [display, setDisplay] = useState('')
  const history = useNavigate(); 

    const redirectLogin = () =>  {
      console.log('test button')
      history('/login')
    }
    async function onCreateAccount(event)  {
      event.preventDefault()      


        const response1 = await createAccount(username,password,fullName, contact);
        console.log(response1)
         alert(response1)
         setCreated("Done")    
         setDisplay(response1)

    }

    if(created && display){
      console.log(1)
        return (
          <div className="prompt1">
            <p>{display}</p>
            <button onClick={redirectLogin}>Log in Now</button>

          </div>

        )
    }

    return (
<div className="prompt1">
<form onSubmit={(e)=>{onCreateAccount(e)}} >
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
          Full Name
          <div>
            <input
            required
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.currentTarget.value)}
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
          <label>
          Contact
          <div>
            <input
            required
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.currentTarget.value)}
            />
          </div>
          </label>
          
          <input className='submission' type='submit' value='Submit' />
        

      </form>
      <button onClick={redirectLogin}>Log in instead</button>


</div>
    );
  }

  export default CreateAccountPrompt;