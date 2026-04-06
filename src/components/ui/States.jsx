import { Star, AlertCircle, Search, Film } from 'lucide-react';
import styles from './States.module.css';

export const ErrorState = ({ message = "Something went wrong", onRetry, children }) => {
  return (
    <div className={styles.errorState}>
      <div className={styles.iconWrapper}>
        <AlertCircle className={styles.icon} />
      </div>
      <h3 className={styles.title}>Oops! Something went wrong</h3>
      <p className={styles.message}>{message}</p>
      {children ? (
        children
      ) : onRetry ? (
        <button 
          onClick={onRetry}
          className={styles.retryButton}
        >
          Try Again
        </button>
      ) : null}
    </div>
  );
};

export const EmptyState = ({ message = "No results found", query }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIconWrapper}>
        {query ? (
          <Search className={styles.emptyIcon} />
        ) : (
          <Film className={styles.emptyIcon} />
        )}
      </div>
      <h3 className={styles.emptyTitle}>
        {query ? `No results for "${query}"` : message}
      </h3>
      <p className={styles.emptyMessage}>
        {query 
          ? "Try searching with different keywords or check your spelling."
          : "There are no movies to display at the moment."}
      </p>
    </div>
  );
};

export const LoadingState = ({ count = 6 }) => {
  return (
    <div className={styles.loadingGrid}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={styles.loadingItem}>
          <div className={styles.loadingPoster} />
          <div className={styles.loadingContent}>
            <div className={styles.loadingTitle} />
            <div className={styles.loadingText} />
            <div className={styles.loadingText} />
          </div>
        </div>
      ))}
    </div>
  );
};
