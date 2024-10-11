import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext, { AuthProvider } from '../context/AuthContext';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

const Home = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div>
      <SignUpForm />
      <LoginForm />
    </div>
  );
};

const HomePage = () => (
  <AuthProvider>
    <Home />
  </AuthProvider>
);

export default HomePage;