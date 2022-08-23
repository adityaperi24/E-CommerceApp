import './App.css';
import CreateAccountPrompt from './CreateAccountPrompt';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPrompt from './LoginAccountPrompt';
function App() {

  


  return (
    <div>
    <Router>

     <Route exact path='/'>      
     <CreateAccountPrompt />
     </Route>      
     
     <Route exact path='/login'>      
     <LoginPrompt />
     </Route>      
     
     </Router>


  

    </div>
  );
}

export default App;
