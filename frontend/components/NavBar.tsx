import { useContext } from 'react';
import Link from 'next/link';
import AuthContext from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { user, logout } = authContext;

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {!user ? (
          <>
            <li className={styles.navItem}>
              <Link href="/signup">Sign Up</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/login">Login</Link>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;