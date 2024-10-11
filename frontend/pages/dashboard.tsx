import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/NavBar';

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { user } = authContext;

  return (
    <div>
      <Navbar />
      <h1>Welcome to BUDGET {user ? user.username : ''}</h1>
    </div>
  );
};

export default Dashboard;