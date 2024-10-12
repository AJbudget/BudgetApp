import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = decodeJWT(token);
        setUser(decodedUser);
      } catch (error) {
        throw new Error('Failed to decode token');
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
      const response = await axios.post('http://127.0.0.1:8000/auth/token', new URLSearchParams({
        username,
        password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      const decodedUser = decodeJWT(token);
      setUser(decodedUser);
      router.push('/dashboard');
    } catch (error) {
      throw new Error('Login failed');
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
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const updateProfile = async (username: string, password: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://127.0.0.1:8000/auth/profile', { username, password }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedUser = response.data;
      setUser(updatedUser);
    } catch (error) {
      throw new Error('Profile update failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;