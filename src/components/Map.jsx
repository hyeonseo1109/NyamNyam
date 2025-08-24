import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useLocationStore, useSearch } from '../store';
import { useEffect } from 'react';
import { useState } from 'react';


const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const libraries = ['places'];

function MapView() {
  const {currentLocation, fetchCurrentLocation} = useLocationStore();
  const searchContent = useSearch(state => state.searchContent);
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  useEffect(() => {
    if (!map) return; 
    if (!searchContent || searchContent.trim() === "") return;
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      query: searchContent,
      fields: ['name', 'geometry', 'formatted_address', 'rating'],
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log('텍스트 검색 결과:', results);
      } else {
        console.error('검색 실패:', status);
      }
    });

    // const request = {
    //   placeId: 'ChIJu8mHzu6YfDURG6hntI150iA', // textSearch로 받은 장소 ID
    //   fields: ['name', 'rating', 'reviews', 'formatted_address'],
    // };

    // service.getDetails(request, (place, status) => {
    //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //     console.log('상세 정보:', place);
    //     if (place.reviews) {
    //       console.log('리뷰:', place.reviews);
    //     } else {
    //       console.log('리뷰 없음');
    //     }
    //   } else {
    //     console.error('상세 정보 요청 실패:', status);
    //   }
    // });

  }, [map, searchContent]);

  

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      libraries={libraries}
    >
      <GoogleMap
        center={currentLocation}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={15}
        onLoad={mapInstance => setMap(mapInstance)}
      >
        {/* 마커, 기타 컴포넌트는 여기 안에 추가 */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
