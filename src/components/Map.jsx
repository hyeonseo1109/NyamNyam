import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useLocationStore, useSearch, useSearchResult } from "../store";
import { useEffect } from "react";
import { useState } from "react";
import { Marker } from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const libraries = ["places"];

function MapView() {
  const { currentLocation, fetchCurrentLocation } = useLocationStore();
  const searchContent = useSearch((state) => state.searchContent);
  const [map, setMap] = useState(null);
  const searchResult = useSearchResult((s) => s.searchResult);
  const setSearchResult = useSearchResult((s) => s.setSearchResult);

  //현재 사용자 위치 가져오기
  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  //검색 입력어 들어오면 검색 요청함
  useEffect(() => {
    if (!map) return;
    if (!searchContent || searchContent.trim() === "") return;
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      query: searchContent,
      fields: ["name", "geometry", "formatted_address", "rating"],
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSearchResult(results);
        // console.log('텍스트 검색 결과:', results);
      } else {
        console.error("검색 실패:", status);
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

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <GoogleMap
        center={currentLocation}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={15}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {searchResult.map((place) => {
          if (!place.geometry || !place.geometry.location) return null;

          return (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              icon={{
                url: "/restaurantLocation.PNG",
                scaledSize: new window.google.maps.Size(90, 90), // 크기 조절
              }}
            />
          );
        })}
        {/* 마커, 기타 컴포넌트는 여기 안에 추가 */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;
