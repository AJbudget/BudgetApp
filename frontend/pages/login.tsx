import LoginForm from '../components/LoginForm';
import Navbar from '../components/NavBar';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;