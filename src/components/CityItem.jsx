import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  return (
    // <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
    <Link to={`${id}`} className={styles.cityItem}>
      <div className={styles.emoji}>{emoji}</div>
      <div className={styles.name}>{cityName}</div>
      <div className={styles.date}>({formatDate(date)})</div>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  );
}

export default CityItem;
