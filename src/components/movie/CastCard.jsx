import { User } from 'lucide-react';
import styles from './CastCard.module.css';

const CastCard = ({ actor, index = 0 }) => {
  return (
    <div 
      className={styles.castCard}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={styles.avatar}>
        <User className={styles.avatarIcon} />
        <div className={styles.avatarOverlay} />
      </div>
      <h4 className={styles.name}>{actor.name}</h4>
      <p className={styles.character}>{actor.character}</p>
    </div>
  );
};

export default CastCard;
