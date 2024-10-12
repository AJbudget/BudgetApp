import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/NavBar';
import styles from '../styles/AuthForm.module.css';

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    console.log('User context:', authContext?.user);
    if (authContext?.user?.sub) {
      setUsername(authContext.user.sub);
    }
  }, [authContext]);

  if (!authContext) {
    return null;
  }

  const { user, updateProfile, logout } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(username, password);
    setIsEditingUsername(false);
    setIsEditingPassword(false);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Welcome {capitalizeFirstLetter(user?.sub || '')}</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username:</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                disabled={!isEditingUsername}
              />
              <button
                type="button"
                onClick={() => setIsEditingUsername(true)}
                className={styles.editButton}
              >
                Edit
              </button>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                value={isEditingPassword ? password : '********'}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                disabled={!isEditingPassword}
              />
              <button
                type="button"
                onClick={() => {
                  setIsEditingPassword(true);
                  setPassword('');
                }}
                className={styles.editButton}
              >
                Edit
              </button>
            </div>
          </div>
          <button type="submit" className={styles.button}>Update</button>
        </form>
        <button onClick={logout} className={styles.button} style={{ marginTop: '20px' }}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;