import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, Play, 
  Share2, BookmarkPlus, Heart, Star
} from 'lucide-react';
import { Button, ErrorState, CastSkeleton } from '../components/ui';
import { CastCard, TrailerSection } from '../components/movie';
import { getMovieById } from '../data/movies';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const movieData = getMovieById(id);
        
        if (!movieData) {
          setError('Movie not found');
        } else {
          setMovie(movieData);
        }
      } catch {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingHero} />
        <div className={styles.loadingContent}>
          <div className={styles.loadingRows}>
            <div className={`${styles.loadingRow} ${styles.loadingTitle}`} />
            <div className={`${styles.loadingRow} ${styles.loadingSubtitle}`} />
            <div className={`${styles.loadingRow} ${styles.loadingText}`} />
            <div className={`${styles.loadingRow} ${styles.loadingTextHalf}`} />
          </div>
          <div className={styles.castLoading}>
            <h3 className={styles.castLoadingTitle}>Cast</h3>
            <CastSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className={styles.page} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ErrorState message={error || 'Movie not found'} onRetry={() => window.location.reload()}>
          <Link to="/" style={{ display: 'inline-block', marginTop: '0.5rem' }}>
            <Button variant="primary">Go Home</Button>
          </Link>
        </ErrorState>
      </div>
    );
  }

  const year = movie.release_date?.split('-')[0];
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <div className={styles.backdrop}>
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className={styles.backdropImage}
          />
          <div className={styles.backdropGradient} />
        </div>

        <div className={styles.content}>
          <Link 
            to="/"
            className={styles.backLink}
          >
            <ArrowLeft className={styles.backIcon} style={{ width: '1rem', height: '1rem' }} />
            Back to Home
          </Link>

          <div className={styles.movieContent}>
            <div className={styles.poster}>
              <div className={styles.posterImage}>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className={styles.details}>
              <div>
                <h1 className={styles.movieTitle}>
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className={styles.tagline}>"{movie.tagline}"</p>
                )}
              </div>

              <div className={styles.ratingRow}>
                <span className={styles.ratingBadge}>
                  <Star style={{ width: '1rem', height: '1rem', fill: 'currentColor' }} />
                  {movie.vote_average?.toFixed(1)}
                </span>
                
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Calendar className={styles.metaIcon} />
                    {year}
                  </span>
                  <span className={styles.metaItem}>
                    <Clock className={styles.metaIcon} />
                    {hours}h {minutes}m
                  </span>
                </div>
              </div>

              <div className={styles.genres}>
                {movie.genres?.map((genre, i) => (
                  <span key={i} className={styles.genre}>
                    {genre}
                  </span>
                ))}
              </div>

              <div className={`${styles.overviewCard} ${showFullOverview ? styles.expanded : ''}`}>
                <h3 className={styles.overviewTitle}>Overview</h3>
                <p className={styles.overviewText}>{movie.overview}</p>
                {movie.overview?.length > 200 && (
                  <button
                    onClick={() => setShowFullOverview(!showFullOverview)}
                    className={styles.overviewToggle}
                  >
                    {showFullOverview ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>

              <div className={styles.actions}>
                <Button variant="primary" size="lg" style={{ boxShadow: '0 0.25rem 1rem rgba(139, 92, 246, 0.3)' }}>
                  <Play className="w-5 h-5" style={{ fill: 'currentColor' }} />
                  Watch Trailer
                </Button>
                <Button variant="secondary" size="lg">
                  <Heart className="w-5 h-5" />
                  Add to Favorites
                </Button>
                <Button variant="secondary" size="lg">
                  <BookmarkPlus className="w-5 h-5" />
                  Add to Watchlist
                </Button>
                <Button variant="ghost" size="lg">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.trailerSection}>
            <TrailerSection trailerUrl={movie.trailer} title={movie.title} />
          </div>

          <div className={styles.castSection}>
            <h3 className={styles.castTitle}>Cast</h3>
            <div className={styles.castList}>
              {movie.cast?.map((actor, index) => (
                <CastCard key={actor.id} actor={actor} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
