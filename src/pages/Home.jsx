import { useState, useEffect } from 'react';
import { HeroSlider, MovieGrid } from '../components/movie';
import { CategoryTabs } from '../components/layout';
import { HeroSkeleton } from '../components/ui';
import { getFeaturedMovies, getTrendingMovies, getMoviesByCategory } from '../data/movies';
import styles from './Home.module.css';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFeaturedMovies(getFeaturedMovies());
      setTrendingMovies(getTrendingMovies());
      setCategoryMovies(getMoviesByCategory(activeCategory));
      
      setLoading(false);
    };

    loadData();
  }, [activeCategory]);

  return (
    <div className={styles.page}>
      {loading ? (
        <HeroSkeleton />
      ) : (
        <HeroSlider movies={featuredMovies} />
      )}

      <div className={styles.container}>
        <MovieGrid 
          movies={trendingMovies} 
          title="Trending Now" 
          viewAllLink="/movies/popular"
        />

        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>
            Browse by Category
          </h2>
          <CategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
          />
        </div>

        <MovieGrid 
          movies={categoryMovies} 
          title={
            activeCategory === 'popular' ? 'Popular Movies' :
            activeCategory === 'top_rated' ? 'Top Rated Movies' :
            activeCategory === 'upcoming' ? 'Upcoming Movies' :
            'Now Playing Movies'
          }
          viewAllLink={`/movies/${activeCategory}`}
        />
      </div>
    </div>
  );
};

export default Home;
