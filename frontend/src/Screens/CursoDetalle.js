import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./CursoDetalle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { cursoContext, userId } from '../Components/CursoContext';

const CursoDetalle = () => {
  const { curso } = useContext(cursoContext);
  const { id } = useParams();

  const handleInscribirseClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Usuario no autenticado');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          course_id: parseInt(id, 10),
        }),
      });

      if (response.ok) {
        alert('¡Inscrito al curso!');
      } else {
        const data = await response.json();
        console.error('Error al inscribirse:', data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div className={styles.cursoDetalle}>
      <div className={styles.cursoContent}>
        <h1>{curso.Name}</h1>
        <button className={styles.inscripcion} onClick={handleInscribirseClick}>
          Inscribirse
        </button>
      </div>
      <p>{curso.Description}</p>
      <p><FontAwesomeIcon icon={faClock} /> Duración: {curso.Length}</p>
      <p><FontAwesomeIcon icon={faCheck} /> Requisitos: {curso.Req}</p>
      <p><FontAwesomeIcon icon={faChalkboardTeacher} /> Instructor: {curso.TeacherName}</p>
    </div>
  );
}

export default CursoDetalle;
