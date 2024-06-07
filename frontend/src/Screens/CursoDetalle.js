import React from "react";
import { useParams } from "react-router-dom";
import styles from "./CursoDetalle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';


const CursoDetalle = () => {

    const { id } = useParams();

    const cursos = [
        {
            id: 1,
            title: "Curso Online: Uso de Inteligencia Artificial para Docentes",
            description: "Aprende a utilizar la inteligencia artificial en el ámbito educativo.",
            duration: "40h",
            image: require("../assets/imagen5.png"),
            requisitos: "Conocimientos básicos de informática",
            instructor: "Dr. Juan Pérez"
          },
          {
            id: 2,
            title: "Curso de Programación",
            description: "Domina los fundamentos de la programación.",
            duration: "50h",
            image: require("../assets/imagen6.png"),
            requisitos: "Ninguno",
            instructor: "Ing. María López"
          },
          {
            id: 3,
            title: "Curso de Diseño Gráfico",
            description: "Mejora tus habilidades de diseño con este curso.",
            duration: "30h",
            image: require("../assets/imagen7.png"),
            requisitos: "Conocimientos básicos de diseño",
            instructor: "Sr. Carlos García"
          },
          {
            id: 4,
            title: "Curso de Marketing Digital",
            description: "Aprende estrategias de marketing digital efectivas.",
            duration: "45h",
            image: require("../assets/imagen8.png"),
            requisitos: "Ninguno",
            instructor: "Lic. Ana Martínez"
          },
          {
            id: 5,
            title: "Curso de Programación en Python",
            description: "Domina Python desde lo básico hasta lo avanzado.",
            duration: "60h",
            image: require("../assets/imagen9.png"),
            requisitos: "Conocimientos básicos de programación",
            instructor: "Dr. Roberto Sánchez"
          },
          
          {
            id: 6,
            title: "Curso de Desarrollo Web",
            description: "Aprende a crear sitios web dinámicos y responsivos.",
            duration: "50h",
            image: require("../assets/imagen10.png"),
            requisitos: "Conocimientos básicos de HTML y CSS",
            instructor: "Ing. Laura Gómez"
          },
          
          {
            id: 7,
            title: "Curso de Data Science",
            description: "Conviértete en un experto en análisis de datos.",
            duration: "70h",
            image: require("../assets/imagen11.png"),
            requisitos: "Conocimientos básicos de estadística",
            instructor: "Dr. José Ramírez"

          },
          
          {
            id: 8,
            title: "Curso de Machine Learning",
            description: "Descubre los fundamentos del aprendizaje automático.",
            duration: "80h",
            image: require("../assets/imagen12.png"),
            requisitos: "Conocimientos básicos de programación y matemáticas",
            instructor: "Dr. Elena Rodríguez"
          },
    ];

    const curso = cursos.find(curso => curso.id === parseInt(id));

    if (!curso){
        return <p>Curso no encontrado</p>
    }

    return(

        <div className={styles.cursoDetalle}>
        <div className={styles.cursoContent}>
        <h1>{curso.title}</h1>
            <img className={styles.cursoImagen} src={curso.image} alt={curso.title} />
            <button className={styles.inscripcion}>Inscribirse</button>
        </div>
       
        <p>{curso.description}</p>
        <p><FontAwesomeIcon icon={faClock} /> Duración: {curso.duration}</p>
        <p><FontAwesomeIcon icon={faCheck} /> Requisitos: {curso.requisitos}</p>
        <p><FontAwesomeIcon icon={faChalkboardTeacher} /> Instructor: {curso.instructor}</p>

    </div>
    );
        
  
}

export default CursoDetalle;