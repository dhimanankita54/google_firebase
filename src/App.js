import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Components/Login';
import Dashboard from './Components/Dashboard';
import UserProvider from './Components/Providers/UserProvider';
import { Register } from './Components/Register';
import Reset from './Components/Reset';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/reset' element={<Reset />}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
