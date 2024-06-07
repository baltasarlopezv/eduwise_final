import React from 'react';
import styles from "./Login.module.css";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <form action="">
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input type="text" placeholder="Username" required maxlength="25"/>
            <CiUser className={styles.icon} />
          </div>

          <div className={styles.inputBox}>
            <input type="password" placeholder="Password" required maxlength="25" />
            <CiLock className={styles.icon} />
          </div>

          <div className={styles.rememberMe}>
            <label><input type="checkbox" /> Remember Me</label>
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
