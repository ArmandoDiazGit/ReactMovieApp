import { Link } from 'react-router-dom';
import { Star, Calendar, Clock } from 'lucide-react';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie, index = 0 }) => {
  const year = movie.release_date?.split('-')[0] || 'N/A';
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const displayRuntime = movie.runtime ? `${hours}h ${minutes}m` : 'N/A';

  return (
    <Link to={`/movie/${movie.id}`}>
      <article 
        className={styles.card}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className={styles.poster}>
          <img
            src={movie.poster_path}
            alt={movie.title}
            className={styles.posterImage}
            loading="lazy"
          />
          <div className={styles.posterOverlay} />
          
          <div className={styles.ratingBadge}>
            <Star className={styles.ratingIcon} style={{ fill: 'currentColor' }} />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>

          <div className={styles.genreOverlay}>
            <div className={styles.genreList}>
              {movie.genres?.slice(0, 2).map((genre, i) => (
                <span 
                  key={i}
                  className={styles.genre}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>
            {movie.title}
          </h3>
          
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Calendar className={styles.metaIcon} />
              <span>{year}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock className={styles.metaIcon} />
              <span>{displayRuntime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
