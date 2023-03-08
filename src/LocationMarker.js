import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function LocationMarker(props) {
  const [position, setPosition] = useState(null);

  // const [markers, setMarkers] = useState();
  const map = useMapEvents({
    click(e) {
      handleClick(e);
    },
    locationfound(e) {
      //   console.log("HEY");
      setPosition(props.coords);
      //   map.flyTo(props.coords, map.getZoom());
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        map.flyTo([pos.coords.latitude, pos.coords.longitude], map.getZoom());
        let markers = JSON.parse(localStorage.getItem("markers"));
        if (markers === null) {
          localStorage.setItem(
            "markers",
            JSON.stringify([[pos.coords.latitude, pos.coords.longitude]])
          );
        }

        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, [map]);

  function handleClick(e) {
    setPosition([e.latlng.lat, e.latlng.lng]);
    props.changeCoords(position);
  }

  return (
    <div>
      {position === null ? null : (
        <Marker position={position}>
          <Popup>You are here!</Popup>
        </Marker>
      )}
      {props.markers?.flatMap((m) => (
        <Marker key={uuidv4()} position={m}>
          <Popup>You are here!</Popup>
        </Marker>
      ))}
    </div>
  );
}

export default LocationMarker;
