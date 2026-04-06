import { categories } from '../../data/movies';
import { Flame, Trophy, Calendar, Play } from 'lucide-react';
import styles from './CategoryTabs.module.css';

const CategoryTabs = ({ activeCategory, onCategoryChange, className = "" }) => {
  const getIcon = (categoryId) => {
    switch (categoryId) {
      case 'popular':
        return <Flame className={styles.icon} />;
      case 'top_rated':
        return <Trophy className={styles.icon} />;
      case 'upcoming':
        return <Calendar className={styles.icon} />;
      case 'now_playing':
        return <Play className={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`${styles.tab} ${activeCategory === category.id ? styles.tabActive : ''}`}
        >
          {getIcon(category.id)}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
