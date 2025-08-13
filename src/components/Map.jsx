import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useLocationStore } from '../store';
import { useEffect } from 'react';


const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

function MapView() {
  const {currentLocation, fetchCurrentLocation} = useLocationStore();

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={currentLocation}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={15}
      >
        {/* 마커, 기타 컴포넌트는 여기 안에 추가 */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
