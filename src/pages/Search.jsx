import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieGrid } from '../components/movie';
import { SearchBar } from '../components/layout';
import { EmptyState } from '../components/ui';
import { searchMovies } from '../data/movies';
import styles from './Search.module.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query) {
        setResults([]);
        return;
      }
      
      setIsSearching(true);
      const searchResults = searchMovies(query);
      setResults(searchResults);
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Search <span className={styles.titleHighlight}>Movies</span>
          </h1>
          
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <SearchBar 
              initialValue={searchQuery}
              placeholder="Search by title, genre, or description..."
              className={styles.searchBar}
            />
          </form>
        </div>

        {query && (
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              {isSearching ? (
                'Searching...'
              ) : (
                <>
                  Found <span className={styles.resultsCount}>{results.length}</span> results for "{query}"
                </>
              )}
            </h2>
          </div>
        )}

        {isSearching ? (
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
        ) : query && results.length > 0 ? (
          <MovieGrid 
            movies={results} 
            title={`Search Results for "${query}"`}
          />
        ) : query ? (
          <EmptyState query={query} />
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyCard}>
              <div className={styles.emptyIconWrapper}>
                <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>Start Searching</h3>
              <p className={styles.emptyText}>Enter a movie title, genre, or keyword to find your favorite films.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
