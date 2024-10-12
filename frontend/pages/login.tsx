import LoginForm from '../components/LoginForm';
import Navbar from '../components/NavBar';
import styles from '../styles/AuthForm.module.css';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;