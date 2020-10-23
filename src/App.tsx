import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import GoogleListOfEstablishmentsService from './services/GoogleListOfEstablishments';
import { EstablishmentProps } from './services/GoogleEstablishmentService';
import Establishment from './components/Establishment';
import NearestCoffees from './components/NearestCoffees';

const App: React.FC = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState<EstablishmentProps[]>([]);
  const [selected, setSelected] = useState<EstablishmentProps | undefined>(
    undefined,
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        alert('Sem a sua localização este app é inútil.');
      },
    );
  }, []);

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      GoogleListOfEstablishmentsService.index({
        latitude,
        longitude,
      }).then(response => setLocations(response));
    }
  }, [latitude, longitude]);

  const handleMarkerClick = useCallback(
    (place: EstablishmentProps) => {
      if (selected?.place_id === place.place_id) {
        setSelected(undefined);
      } else {
        setSelected(place);
      }
    },
    [selected],
  );

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100vw' }}
          zoom={15}
          center={{ lat: latitude, lng: longitude }}
        >
          {locations.map((place, index) => {
            return (
              <Marker
                key={index}
                title={place.name}
                animation={4}
                position={place.geometry!.location}
                icon="/images/coffee-pin.png"
                onClick={() => handleMarkerClick(place)}
              />
            );
          })}
          {selected && <Establishment place={selected} />}
          <Marker
            key="userLocation"
            title="Sua localização"
            animation={2}
            position={{ lat: latitude, lng: longitude }}
            icon="/images/my-location-pin.png"
          />
          {latitude !== 0 && longitude !== 0 && (
            <NearestCoffees
              latitude={latitude}
              longitude={longitude}
              handleMarkerClick={handleMarkerClick}
              establishments={locations}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default App;
