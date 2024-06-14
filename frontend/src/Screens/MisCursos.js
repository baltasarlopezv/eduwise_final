import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Components/AuthContext';
import styles from './MisCursos.module.css';

const MisCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchMisCursos = async () => {
      if (!data.token || !data.userId) {
        setError('Usuario no autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/enrollments/user_id/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los cursos');
        }

        const data = await response.json();
        setCursos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMisCursos();
  }, [token, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.misCursos}>
      <h1>Mis Cursos</h1>
      {cursos.length === 0 ? (
        <p>Aún no se ha inscrito a ningún curso</p>
      ) : (
        <ul>
          {cursos.map(curso => (
            <li key={curso.CourseID}>{curso.CourseID}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisCursos;
