import { useState, useContext, FormEvent } from 'react';
import AuthContext from '../context/AuthContext';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { signup } = authContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(username, password, email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;