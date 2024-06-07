import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Cursos from './Screens/Cursos';
import CursoDetalle from './Screens/CursoDetalle';
import HowWeWork from './Screens/HowWeWork';
import SignIn from './Screens/SignIn';
import NavBar from './Components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/curso/:id" element={<CursoDetalle/>} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/signin" element={<SignIn />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;