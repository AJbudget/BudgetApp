import { useContext, useState } from 'react';
import Link from 'next/link';
import AuthContext from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!authContext) {
    return null;
  }

  const { user, logout } = authContext;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
            <div className={styles.profileIcon} onClick={toggleDropdown}>
              <img src="/profile-icon.png" alt="Profile" />
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/profile" legacyBehavior>
                    <a className={styles.dropdownItem}>Profile</a>
                  </Link>
                  <button onClick={logout} className={styles.dropdownItem}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;