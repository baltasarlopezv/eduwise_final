import React, { useState } from 'react';
import styles from "./Login.module.css"; // Asumiendo que has importado tu archivo CSS correctamente
import { CiUser, CiLock } from "react-icons/ci";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      console.log('Login successful');
      // Aquí puedes redirigir al usuario o realizar alguna acción adicional

    } catch (error) {
      console.error('Error:', error);
      // Aquí puedes manejar errores y mostrar un mensaje al usuario
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <CiUser className={styles.icon} />
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <CiLock className={styles.icon} />
          </div>

          <div className={styles.rememberMe}>
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div>

          <button type="submit">Login</button>

          <div className={styles.register}>
            <p>Don’t have an account? <a href="/signIn">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;