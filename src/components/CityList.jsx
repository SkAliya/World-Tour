import styles from "./CityList.module.css";
import Message from "./Message";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import { useCitiesContext } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCitiesContext();
  if (isLoading) return <Spinner />;
  if (!cities?.length) return <Message message={"Add cities to your list"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
