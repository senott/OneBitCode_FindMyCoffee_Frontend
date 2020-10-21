import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const App: React.FC = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        alert('Sem a sua localização este app é inútil.');
      },
    );
  }

  useEffect(() => {
    setCurrentLocation();
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100vw' }}
          zoom={15}
          center={{ lat: latitude, lng: longitude }}
        ></GoogleMap>
      </LoadScript>
    </>
  );
};

export default App;
