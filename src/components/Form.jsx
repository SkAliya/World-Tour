// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import { useCitiesContext } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import Message from "./Message";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCitiesContext();

  const [isGeocodeLoading, setIsGeocodeLoading] = useState(false);
  const [GeocodeErr, setGeocodeErr] = useState("");
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getCity() {
        try {
          setIsGeocodeLoading(true);
          setGeocodeErr("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          setCountry(data.countryName);
          setCityName(data.city || data.locaity || "");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (e) {
          setGeocodeErr(e.message);
        } finally {
          setIsGeocodeLoading(false);
        }
      }
      getCity();
    },
    [lat, lng]
  );

  async function handleAddCity(e) {
    e.preventDefault();
    if (!cityName && !date) return;

    const newCity = {
      cityName,
      emoji,
      country,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }
  if (isGeocodeLoading) return <Spinner />;
  if (!lat && !lng) return <Message message="start click on map" />;
  if (GeocodeErr) <Message message={GeocodeErr} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""} `}
      onSubmit={handleAddCity}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" handleFunc={() => handleAddCity()}>
          &#43; Add
        </Button>
        <Button
          type="back"
          handleFunc={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
        {/* <button>Add</button>
        <button>&larr; Back</button> */}
      </div>
    </form>
  );
}

export default Form;
