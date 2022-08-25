import './App.css';
import CreateAccountPrompt from './CreateAccountPrompt';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import {useNavigate} from 'react-router-dom';
import LoginPrompt from './LoginAccountPrompt';
import ProfilePage from './ProfileComponent';


function App() {

  


  return (
    <div>
    <Router >
<Routes >
     <Route exact path='/' element ={<CreateAccountPrompt/>} />      
      

     <Route exact path='/login' element= {<LoginPrompt/>} />      

     <Route exact path='/profile' element={<ProfilePage/>} />      
     </Routes>

     </Router>



    </div>
  );
}

export default App;
