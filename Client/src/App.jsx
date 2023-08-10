
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Register } from './components/register';
import { Login } from './components/login';
import Dashboard from './components/dashboard';



function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={!user ?<Login />: <Navigate to="/home" />}></Route>
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
