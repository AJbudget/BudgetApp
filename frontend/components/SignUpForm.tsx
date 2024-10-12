import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import styles from '../styles/AuthForm.module.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { signup } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(username, password, email);
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
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;