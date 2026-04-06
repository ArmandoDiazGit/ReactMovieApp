import styles from './TrailerSection.module.css';

const TrailerSection = ({ trailerUrl, title }) => {
  if (!trailerUrl) return null;

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(trailerUrl);

  if (!videoId) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Trailer</h3>
      <div className={styles.videoWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={`${title} Trailer`}
          className={styles.video}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerSection;
