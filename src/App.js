import './App.css';
import TopBar from './components/TopBar';
import { Route, Routes } from 'react-router';
import ChatRoom from './components/ChatRoom';
import Home from './components/Home';
import NumberSumUp from './components/NumberSumUp';
import Login from './components/Login';
import CreateChatroom from "./components/CreateChatroom";

function App() {
  return (
    <div className="App">
      <TopBar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chatroom' element={<ChatRoom/>}/>
        <Route path='/sumNumber' element={<NumberSumUp/>}/>
        <Route path='/login' element={<Login/>}/>
          <Route path='/createChatroom' element={<CreateChatroom/>}/>
      </Routes>
    </div>
  );
}

export default App;
