import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import Message from "./Message";

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
  const [deleteCity, isLoading, errMessage] = useCitiesContext();

  function handleDelete() {
    deleteCity(id);
  }

  {
    /* <Link to={`${id}`} className={styles.cityItem}> */
  }
  if (isLoading) return <Spinner />;
  if (errMessage) return <Message message={errMessage} />;
  return (
    <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
      <div className={styles.emoji}>{emoji}</div>
      <div className={styles.name}>{cityName}</div>
      <div className={styles.date}>({formatDate(date)})</div>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
