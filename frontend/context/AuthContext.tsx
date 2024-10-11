import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = decodeJWT(token);
        console.log('Decoded user from token:', decodedUser);
        setUser(decodedUser);
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const decodeJWT = (token: string): User => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting to log in...');
      const response = await axios.post('http://127.0.0.1:8000/auth/token', new URLSearchParams({
        username,
        password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Login response:', response);
      const token = response.data.access_token;
      console.log('Received token:', token);
      localStorage.setItem('token', token);
      const decodedUser = decodeJWT(token);
      console.log('Decoded user:', decodedUser);
      setUser(decodedUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const signup = async (username: string, password: string, email: string) => {
    try {
      console.log('Attempting to sign up...');
      const response = await axios.post('http://127.0.0.1:8000/auth/signup', { username, password, email });
      console.log('Signup response:', response);
      if (response.status === 200) {
        await login(username, password);
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;