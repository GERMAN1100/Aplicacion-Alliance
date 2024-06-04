import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Login from './components/Login';
import Registro from './components/Registro';
import Final from './components/Final'
import Perfil from './components/Perfil';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/final" element={<Final />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;

