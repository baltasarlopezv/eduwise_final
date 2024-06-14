import React, { useState, useEffect, useContext } from 'react';
import styles from "./Cursos.module.css";
import { useNavigate } from 'react-router-dom';
import { CursoContext } from '../Components/CursoContext';

const Cursos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { cursos, setCursos, setCurso } = useContext(CursoContext);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/courses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data received:', data);
        setCursos(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching courses", error);
        setCursos([]);
        setError("Error fetching courses. Please try again later.");
      }
    };

    fetchCursos();
  }, [setCursos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/courses/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data received:', data);
      setCursos(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching courses", error);
      setCursos([]);
      setError("Courses not found or there was an error fetching the courses.");
    }
  };

  const handleCursoClick = (id) => {
    const selectedCurso = cursos.find(curso => curso.ID === id);
    setCurso(selectedCurso);
    navigate(`/curso/${id}`);
  };

  return (
    <div className={styles.cursos}>
      <div className={styles.searchContainer}>
        <label className={styles.searchLabel} htmlFor="search">Qué estás buscando?</label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button onClick={handleSearchClick} className={styles.searchButton}>Buscar</button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.cursosContainer}>
        {cursos.map(curso => (
          <div key={curso.ID} className={styles.cursoCard} onClick={() => handleCursoClick(curso.ID)}>
            <div className={styles.cursoContent}>
              <h3>{curso.Name}</h3>
              <p>{curso.Description}</p>
              <p><strong>Duración:</strong> {curso.Length}</p>
              <p><strong>Profesor:</strong> {curso.TeacherName}</p>
              <p><strong>Keywords:</strong> {curso.Keywords}</p>
              <p><strong>Requerimientos:</strong> {curso.Req}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cursos;
