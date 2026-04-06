import { NavLink, useLocation } from 'react-router-dom';
import { Film, Menu, X } from 'lucide-react';
import { useState } from 'react';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movies/popular", label: "Popular" },
    { to: "/movies/top_rated", label: "Top Rated" },
    { to: "/movies/upcoming", label: "Upcoming" },
    { to: "/movies/now_playing", label: "Now Playing" },
  ];

  const isSearchPage = location.pathname === '/search';

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <NavLink to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className={styles.logoText}>
                Cine<span className={styles.logoHighlight}>Vault</span>
              </span>
            </NavLink>

            <nav className={styles.navLinks}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className={styles.actions}>
              {!isSearchPage && <SearchBar className="hidden md:block w-64" />}
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={styles.menuButton}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuInner}>
              {isSearchPage || <SearchBar className="w-full mb-4" />}
              
              <nav className={styles.mobileNavLinks}>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
