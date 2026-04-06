import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MovieCard from './MovieCard';
import styles from './MovieGrid.module.css';

const MovieGrid = ({ movies, title, viewAllLink, emptyMessage }) => {
  if (!movies || movies.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.empty}>{emptyMessage || 'No movies available'}</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title}
        </h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink}
            className={styles.viewAll}
          >
            View All
            <ArrowRight className={styles.viewAllIcon} style={{ width: '1rem', height: '1rem' }} />
          </Link>
        )}
      </div>

      <div className={styles.grid}>
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
