import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui';
import styles from './HeroSlider.module.css';

const HeroSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <img
          src={currentMovie.backdrop_path}
          alt={currentMovie.title}
          className={styles.heroImage}
        />
        <div className={styles.heroGradient1} />
        <div className={styles.heroGradient2} />
      </div>

      <div className={styles.navButtons}>
        <button
          onClick={goToPrev}
          className={`${styles.navButton} ${styles.prevButton}`}
        >
          <ChevronLeft className={styles.navIcon} style={{ width: '1.5rem', height: '1.5rem' }} />
        </button>
        
        <button
          onClick={goToNext}
          className={`${styles.navButton} ${styles.nextButton}`}
        >
          <ChevronRight className={styles.navIcon} style={{ width: '1.5rem', height: '1.5rem' }} />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.badges}>
            <span className={styles.badge}>
              Featured
            </span>
            {currentMovie.genres?.slice(0, 2).map((genre, i) => (
              <span 
                key={i}
                className={styles.genreBadge}
              >
                {genre}
              </span>
            ))}
          </div>

          <h1 className={styles.movieTitle}>
            {currentMovie.title}
          </h1>

          <div className={styles.meta}>
            <span className={styles.rating}>
              {currentMovie.vote_average.toFixed(1)}
              <span className={styles.ratingMax}>/10</span>
            </span>
            <span>{currentMovie.release_date?.split('-')[0]}</span>
            {currentMovie.runtime && (
              <span>{Math.floor(currentMovie.runtime / 60)}h {currentMovie.runtime % 60}m</span>
            )}
          </div>

          <p className={styles.overview}>
            {currentMovie.overview}
          </p>

          <div className={styles.buttons}>
            <Link to={`/movie/${currentMovie.id}`}>
              <Button variant="primary" size="lg" style={{ boxShadow: '0 0.25rem 1rem rgba(139, 92, 246, 0.3)' }}>
                <Play className="w-5 h-5" style={{ fill: 'currentColor' }} />
                Watch Now
              </Button>
            </Link>
            <Link to={`/movie/${currentMovie.id}`}>
              <Button variant="secondary" size="lg">
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.indicators}>
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`${styles.indicator} ${i === currentIndex ? styles.indicatorActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
