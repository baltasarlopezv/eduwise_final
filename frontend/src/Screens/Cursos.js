import React, { useState } from 'react'; // <-- Agregado useState
import styles from "./Cursos.module.css";
import { useNavigate } from 'react-router-dom';



const Cursos = () => {


  const [searchTerm, setSearchTerm] = useState(""); // <-- Agregado estado para la barra de búsqueda
  const navigate = useNavigate();

  const handleSearchChange = (event) => { // <-- Agregado manejador de cambio
    setSearchTerm(event.target.value);
  };

  const handleCursoClick = (id) => {
    navigate(`/curso/${id}`);
  };

  
  const cursos = [
    {
      id: 1,
      title: "Curso Online: Uso de Inteligencia Artificial para Docentes",
      description: "Aprende a utilizar la inteligencia artificial en el ámbito educativo.",
      duration: "40h",
      image: require("../assets/imagen5.png"),
    },
    {
      id: 2,
      title: "Curso de Programación",
      description: "Domina los fundamentos de la programación.",
      duration: "50h",
      image: require("../assets/imagen6.png"),
    },
    {
      id: 3,
      title: "Curso de Diseño Gráfico",
      description: "Mejora tus habilidades de diseño con este curso.",
      duration: "30h",
      image: require("../assets/imagen7.png"),
    },
    {
      id: 4,
      title: "Curso de Marketing Digital",
      description: "Aprende estrategias de marketing digital efectivas.",
      duration: "45h",
      image: require("../assets/imagen8.png"),
    },
    {
      id: 5,
      title: "Curso de Programación en Python",
      description: "Domina Python desde lo básico hasta lo avanzado.",
      duration: "60h",
      image: require("../assets/imagen9.png"),
    },
    
    {
      id: 6,
      title: "Curso de Desarrollo Web",
      description: "Aprende a crear sitios web dinámicos y responsivos.",
      duration: "50h",
      image: require("../assets/imagen10.png"),
    },
    
    {
      id: 7,
      title: "Curso de Data Science",
      description: "Conviértete en un experto en análisis de datos.",
      duration: "70h",
      image: require("../assets/imagen11.png"),
    },
    
    {
      id: 8,
      title: "Curso de Machine Learning",
      description: "Descubre los fundamentos del aprendizaje automático.",
      duration: "80h",
      image: require("../assets/imagen12.png"),
    },
  ]
 

  return (
    <div className={styles.cursos}>

    <div className={styles.searchContainer}> {/* <-- Agregado contenedor de búsqueda */}
        <label className={styles.searchLabel} htmlFor="search">Qué estás buscando?</label> {/* <-- Agregado etiqueta de búsqueda */}
        <input 
          id="search"
          type="text" 
          placeholder="Buscar cursos..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
    
      <p className={styles.cursosOracion}>Cursos Destacados :</p>
      <div className={styles.cursosContainer}>
        {cursos.filter(curso =>
          curso.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((curso) => (
          <div key={curso.id} className={styles.cursoCard} onClick={() => handleCursoClick(curso.id)}>
            <img className={styles.cursoImagen} src={curso.image} alt={curso.title} />
            <div className={styles.cursoContent}>
              <h3>{curso.title}</h3>
              <p className= {styles.cursoDescription}>{curso.description}</p>
              <div className={styles.cursoDetails}>
                <span>👥 1
                ⏳ {curso.duration}
                </span>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default Cursos;
