import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Layout from './components/Layout/Layout';
import Login from './pages/login/Login';

function App() {
  return(
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} />
        <Route path='main' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App;
