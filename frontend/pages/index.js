import { useContext } from 'react';
import AuthContext, { AuthProvider } from '../context/AuthContext';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

const Home = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user, logout } = authContext;

  return (
    <div>
      {user ? (
        <div>
          <h1>Hello {user.username}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <SignUpForm />
          <LoginForm />
        </div>
      )}
    </div>
  );
};

const HomePage = () => (
  <AuthProvider>
    <Home />
  </AuthProvider>
);

export default HomePage;