import styles from './Skeleton.module.css';

const Skeleton = ({ className = "", variant = "default" }) => {
  const variantClass = {
    default: styles.default,
    card: styles.card,
    text: styles.text,
    title: styles.title,
    circle: styles.circle,
  }[variant];

  return (
    <div className={`${styles.skeleton} ${variantClass} ${className}`} />
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton variant="card" />
      <div className={styles.cardContent}>
        <Skeleton variant="title" className={styles.cardTitle} />
        <Skeleton variant="text" className={styles.cardText} />
        <div className={styles.cardTags}>
          <Skeleton variant="text" className={styles.tag} />
          <Skeleton variant="text" className={styles.tag} />
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className={styles.heroSkeleton}>
      <Skeleton className="absolute inset-0" variant="default" />
      <div className={styles.heroContent}>
        <Skeleton variant="title" className={styles.heroTitle} />
        <Skeleton variant="text" className={`${styles.heroText} ${styles.heroTextHalf}`} />
        <Skeleton variant="text" className={styles.heroText} />
        <div className={styles.heroButtons}>
          <Skeleton className={styles.heroButton} />
          <Skeleton className={styles.heroButton} />
        </div>
      </div>
    </div>
  );
};

export const CastSkeleton = () => {
  return (
    <div className={styles.castList}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={styles.castItem}>
          <Skeleton variant="circle" className={styles.castCircle} />
          <Skeleton variant="text" className={styles.castText} />
          <Skeleton variant="text" className={styles.castTextHalf} />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
