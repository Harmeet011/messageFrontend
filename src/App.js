import './App.css';
import TopBar from './components/TopBar';
import { Route, Routes, useNavigate } from 'react-router';
import ChatRoom from './components/ChatRoom';
import Home from './components/Home';
import NumberSumUp from './components/NumberSumUp';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import localStorageService from './LocalStorageService';
import Register from './components/Register';

function App() {
  const navigate = useNavigate()
  const token = localStorageService.get('auth-token')
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    if(token){
      setIsUserLoggedIn(true)
    }
    else {
      setIsUserLoggedIn(false)
      navigate('/login')
    }

  },[token])

  return (
    <div className="App">
      {isUserLoggedIn && <TopBar/>}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chatroom' element={<ChatRoom/>}/>
        <Route path='/sumNumber' element={<NumberSumUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
