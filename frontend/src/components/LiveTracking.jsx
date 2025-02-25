import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customMarker = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 28.6139, lng: 77.209 });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    };

    const error = (err) => {
      console.error("Geolocation Error:", err);
      setError("Unable to retrieve location");
    };

    navigator.geolocation.getCurrentPosition(success, error);

    const watchId = navigator.geolocation.watchPosition(success, error);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="map-container" style= {{zIndex: 1}}>
      <MapContainer 
        center={currentPosition} 
        zoom={15} 
        style={{ height: "70vh", width: "100%"}}
        zoomControl={false}
      >
        <TileLayer
          url={"https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?&apiKey=27b7cbb023874d59bbcbed87306935f1"}
          attribution=""
        />
        <Marker position={currentPosition} icon={customMarker}>
          <Popup>Your location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LiveTracking;