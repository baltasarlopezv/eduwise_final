import React, { useState } from 'react';
import styles from "./Cursos.module.css";
import { useNavigate } from 'react-router-dom';

const Cursos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [curso, setCurso] = useState(null);
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
      setCurso(data);
    } catch (error) {
      console.error("Error fetching course", error);
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
          type="text" 
          placeholder="Buscar cursos..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button onClick={handleSearchClick} className={styles.searchButton}>Buscar</button>
      </div>

      {curso && (
        <div className={styles.cursoCard}>
          <div className={styles.cursoContent}>
            <h3>{curso.name}</h3>
            <p>{curso.description}</p>
            <p><strong>Duración:</strong> {curso.length}h</p>
            <p><strong>Profesor:</strong> {curso.teachername}</p>
            <p><strong>Keywords:</strong> {curso.keywords.join(', ')}</p>
            <p><strong>Requerimientos:</strong> {curso.req}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cursos;
