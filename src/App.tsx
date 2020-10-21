import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import GoogleListOfEstablishmentsService, {
  CoffeeShop,
} from './services/GoogleListOfEstablishments';

const App: React.FC = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState<CoffeeShop[]>([]);

  async function setCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        alert('Sem a sua localização este app é inútil.');
      },
    );
  }

  async function loadCoffeeShops() {
    const response = await GoogleListOfEstablishmentsService.index({
      latitude,
      longitude,
    });

    setLocations(response);
  }

  useEffect(() => {
    setCurrentLocation();
  }, []);

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      loadCoffeeShops();
    }
  }, [latitude, longitude]);

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100vw' }}
          zoom={15}
          center={{ lat: latitude, lng: longitude }}
        >
          {locations.map((location, index) => {
            return (
              <Marker
                key={index}
                title={location.name}
                animation="4"
                position={{
                  lat: location.geometry.location.lat,
                  lng: location.geometry.location.lng,
                }}
                icon="/images/coffee-pin.png"
              />
            );
          })}
          <Marker
            key="userLocation"
            title="Sua localização"
            animation="2"
            position={{ lat: latitude, lng: longitude }}
            icon="/images/my-location-pin.png"
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default App;
