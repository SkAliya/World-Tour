import { Link, useParams } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import Message from "./Message";
// import { useEffect, useState } from "react";

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
  const { deleteCity, isLoading, errMessage, currentCity } = useCitiesContext();
  const { urlId } = useParams();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  // useEffect(
  //   function () {
  //     if (urlId) setCurrCityId(Number(urlId));
  //   },
  //   [urlId]
  // );
  {
    /* <Link to={`${id}`} className={styles.cityItem}> */
  }
  if (isLoading) return <Spinner />;
  if (errMessage) return <Message message={errMessage} />;
  return (
    <Link
      to={`${id}?lat=${lat}&lng=${lng}`}
      className={`${styles.cityItem} ${
        id === currentCity ? styles["cityItem--active"] : ""
      }`}
    >
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
