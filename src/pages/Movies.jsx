import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieGrid } from '../components/movie';
import { CategoryTabs } from '../components/layout';
import { EmptyState } from '../components/ui';
import { getMoviesByCategory, categories } from '../data/movies';
import styles from './Movies.module.css';

const Movies = () => {
  const { category: urlCategory } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const activeCategory = urlCategory || 'popular';

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setMovies(getMoviesByCategory(activeCategory));
      setLoading(false);
    };

    loadMovies();
  }, [activeCategory]);

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {currentCategory?.name || 'Movies'}
          </h1>
          <p className={styles.subtitle}>
            Explore our collection of {activeCategory.replace('_', ' ')} movies
          </p>
        </div>

        <div className={styles.tabsWrapper}>
          <CategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={() => {}}
          />
        </div>

        {loading ? (
          <div className={styles.loadingGrid}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={styles.loadingItem}>
                <div className={styles.loadingPoster} />
                <div className={styles.loadingContent}>
                  <div className={styles.loadingTitle} />
                  <div className={styles.loadingText} />
                </div>
              </div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <MovieGrid 
            movies={movies} 
            title={`${currentCategory?.name || 'Movies'}`}
          />
        ) : (
          <EmptyState message="No movies found in this category" />
        )}
      </div>
    </div>
  );
};

export default Movies;
