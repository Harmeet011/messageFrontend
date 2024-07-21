import './App.css';
import TopBar from './components/TopBar';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router';
import ChatRoom from './components/ChatRoom';
import Home from './components/Home';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import localStorageService from './LocalStorageService';
import Register from './components/Register';

function App() {
  const navigate = useNavigate()
  const location = useLocation()	
  const token = localStorageService.get('auth-token')
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    if(token){
      setIsUserLoggedIn(true)
    }
    else {
      setIsUserLoggedIn(false)
      if(location.pathname !== '/login' && location.pathname !== '/register'){
        navigate('/login')
      }
    }

  },[token, navigate, location.pathname])

  return (
    <div className="App">
      {isUserLoggedIn && <TopBar/>}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chatroom' element={<ChatRoom/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<Navigate to="/" replace />}/>
      </Routes>
    </div>
  );
}

export default App;
