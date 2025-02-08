import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <div className={styles.map}>map</div>
    </div>
  );
}

export default Map;
