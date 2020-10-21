import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const App: React.FC = () => {
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);
  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100vw' }}
          zoom={15}
          center={{ lat: -21.7768606, lng: -41.3109657 }}
        ></GoogleMap>
      </LoadScript>
    </>
  );
};

export default App;
