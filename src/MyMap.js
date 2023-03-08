import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";

import { React, useState, useRef } from "react";
import DestinationForm from "./DestinationForm";

export default function MyMap(props) {
  const mapRef = useRef(null);

  const [coords, setCoords] = useState(null);

  const [markers, setMarkers] = useState(
    JSON.parse(localStorage.getItem("markers"))
  );

  function handleClick(crds) {
    setCoords(crds);
  }

  const handleFly = (coords) => {
    mapRef.current.flyTo(coords, 13);
  };
  return (
    <div className="MyMap my-6 flex gap-16 ">
      <DestinationForm
        coords={coords}
        markers={markers}
        setMarkers={setMarkers}
        setCoords={setCoords}
        handleFly={handleFly}
      />
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "800px", width: "1000px" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker changeCoords={handleClick} markers={markers} />
      </MapContainer>

    </div>
  );
}
