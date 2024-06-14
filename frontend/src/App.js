import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Cursos from './Screens/Cursos';
import CursoDetalle from './Screens/CursoDetalle';
import MisCursos from './Screens/MisCursos';
import SignIn from './Screens/SignIn';
import NavBar from './Components/NavBar';
import { CursoProvider } from './Components/CursoContext';

function App() {
  return (
    <Router>
        <CursoProvider>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/curso/:id" element={<CursoDetalle />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/miscursos" element={<MisCursos />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </div>
        </CursoProvider>
    </Router>
  );
}

export default App;
