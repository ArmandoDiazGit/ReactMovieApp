import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = ({ initialValue = "", placeholder = "Search movies...", className = "" }) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${className}`}>
      <div className={styles.inputWrapper}>
        <Search className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={styles.input}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {isFocused && query && (
        <div className={styles.suggestion}>
          <div className={styles.suggestionInner}>
            <p className={styles.suggestionText}>
              Press Enter to search for "<span className={styles.suggestionHighlight}>{query}</span>"
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
