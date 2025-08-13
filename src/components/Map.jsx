import { GoogleMap, LoadScript } from '@react-google-maps/api';

const center = {
  lat: 37.4979, // 위도 
  lng: 127.0276, // 경도
};

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
console.log(apiKey);

const MapView = () => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={center}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={15}
      >
        {/* 마커, 기타 컴포넌트는 여기 안에 추가 */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
