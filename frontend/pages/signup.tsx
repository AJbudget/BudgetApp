import SignUpForm from '../components/SignUpForm';
import Navbar from '../components/NavBar';
import styles from '../styles/AuthForm.module.css';

const SignUpPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;