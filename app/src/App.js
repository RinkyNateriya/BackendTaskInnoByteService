
import './App.css';

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './componets/Home';
import UserLogin from './componets/UserLogin';
import UserSignup from './componets/UserSignup';
import Dashboard from './componets/Dashboard';
import UserProfile from './componets/UserProfile';
import Confirmation from './componets/Confirmation';

function App() {
  return (
    <div className="App">
   
  

      <Router>
    <Dashboard/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/UserSignup" element={<UserSignup/>}></Route>
        <Route path="/UserLogin" element={<UserLogin/>}></Route>
        <Route path="/userProfile" element={<UserProfile/>}></Route>
        <Route path="/confirm" element={<Confirmation/>}></Route>
      </Routes>
      </Router>
   
    </div>
  );
}

export default App;
