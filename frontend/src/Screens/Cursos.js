import React, { useState } from 'react';
import styles from "./Cursos.module.css";
import { useNavigate } from 'react-router-dom';

const Cursos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/courses/name/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data received:', data); // Añadir este log para verificar la estructura de los datos recibidos
      setCurso(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching course", error);
      setCurso(null);
      setError("Course not found or there was an error fetching the course.");
    }
  };

  const handleCursoClick = (id) => {
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

      {curso && (
        <div className={styles.cursoCard} onClick={() => handleCursoClick(curso.ID)}>
          <div className={styles.cursoContent}>
            <h3>{curso.name}</h3>
            <p>{curso.description}</p>
            <p><strong>Duración:</strong> {curso.length}</p>
            <p><strong>Profesor:</strong> {curso.teachername}</p>
            <p><strong>Keywords:</strong> {curso.keywords }</p>
            <p><strong>Requerimientos:</strong> {curso.req}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cursos;
