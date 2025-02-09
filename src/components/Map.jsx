import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import useUrlPosition from "../hooks/useUrlPosition";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Map() {
  const [mapCoords, setMapCoords] = useState([40, -5]);

  const { cities } = useCitiesContext();

  // when city clicked store coords into url
  const [lat, lng] = useUrlPosition();
  useEffect(
    function () {
      if (lat && lng) setMapCoords([lat, lng]);
    },
    [lat, lng]
  );

  // get the coords of our by clicking the btn of map
  const { isLoading, position, getPosition } = useGeolocation();

  useEffect(
    function () {
      if (position) setMapCoords([position.lat, position.lng]);
    },
    [position]
  );

  const city = cities.map((city) => {
    return {
      pos: city.position,
      notes: city.notes,
      emoji: city.emoji,
      cityName: city.cityName,
    };
  });
  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button type="position" handleFunc={getPosition}>
          {isLoading ? "Loading..." : "Get Your Location"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapCoords}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {city.map((c, i) => (
          <Marker position={[c.pos.lat, c.pos.lng]} key={i}>
            <Popup>
              <span>{c.emoji}</span> <span>{c.cityName}</span>
              {/* <p className="leaflet-popup">
                {c.notes ? c.notes : "Nice Place 😊"}
              </p>
              </div> */}
            </Popup>
          </Marker>
        ))}
        <ChangeMarkerLocation position={mapCoords} />
        <ClickMapEvent />
      </MapContainer>
    </div>
  );
}

function ChangeMarkerLocation({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function ClickMapEvent() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
