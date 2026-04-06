import { Link } from 'react-router-dom';
import { Home, Search, Film } from 'lucide-react';
import { Button } from '../components/ui';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.hero}>
          <div className={styles.heroText}>404</div>
          <div className={styles.heroIcon}>
            <div className={styles.heroIconInner}>
              <Film className={styles.heroIconSvg} />
            </div>
          </div>
        </div>

        <h1 className={styles.title}>
          Page Not Found
        </h1>
        
        <p className={styles.description}>
          Looks like this movie slipped through the reel. The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link to="/">
            <Button variant="primary">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="secondary">
              <Search className="w-5 h-5" />
              Search Movies
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
