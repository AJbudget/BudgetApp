import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { logout } = authContext;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;