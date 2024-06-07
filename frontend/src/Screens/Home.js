
import React from "react";
import styles from "./Home.module.css";
import image from '../assets/horizontal.jpg'

const Home = () => {
 

  return (
    <div className={styles.home}>
    
      <div className={styles.titleContainer}>
      
    
        
        <p className={styles.Parrafo2}>
          Start Your Learning Journey <br />
          <b>Today</b>
        </p>
        <p className={styles.Parrafo2}>
          <b>Unlock your potential </b> with our <br />
          expert-led online courses.
        </p>
        <div className={styles.imageContainer}>
          <img src={image} alt="Learning Journey" className={styles.image} />
        </div>
        <p className={styles.Parrafo}>Join our vibrant community of learners and professionals. <br>
      </br>Share your journey, collaborate on projects, and grow together.</p>
      </div>
    </div>
  )
}

export default Home;
