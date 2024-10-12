import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import styles from '../styles/AuthForm.module.css';

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!authContext) {
    return null;
  }

  const { login } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Incorrect username or password. Please try again.');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <button type="submit" className={styles.button}>Login</button>
    </form>
  );
};

export default LoginForm;