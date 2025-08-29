import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDetailPage, useDetailPlaceId, useDetailResult, useLocationStore, useSearch, useSearchResult } from "../store";
import { useEffect, useRef, useState } from "react";

function MapView() {
  const { currentLocation, fetchCurrentLocation } = useLocationStore();
  const searchContent = useSearch((state) => state.searchContent);
  const searchResult = useSearchResult((s) => s.searchResult);
  const setSearchResult = useSearchResult((s) => s.setSearchResult);
  const setDetailResult = useDetailResult((s) => s.setDetailResult);
  // const detailResult = useDetailResult((s) => s.detailResult);
  const setIsDetailPage = useDetailPage((s) => s.setIsDetailPage);
  const detailPlaceId = useDetailPlaceId((s)=> s.detailPlaceId);
  const setDetailPlaceId = useDetailPlaceId((s)=> s.setDetailPlaceId);

  const [map, setMap] = useState(null);
  const serviceRef = useRef(null);

  // 현재 사용자 위치
  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  // 맵 로드 시 서비스 초기화
  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
    serviceRef.current = new window.google.maps.places.PlacesService(mapInstance);
  };

  // 검색
  useEffect(() => {
    if (!map || !searchContent?.trim()) return;
    if (!serviceRef.current) return;

    const request = { query: searchContent };
    serviceRef.current.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSearchResult(results);
        console.log(results);
      } else {
        console.error("검색 실패:", status);
      }
    });
  }, [map, searchContent, setSearchResult]);

  // 상세검색
  useEffect(() => {
    if (!serviceRef.current || !detailPlaceId) return;

    const detailRequest = {
      placeId: detailPlaceId,
      fields: ["place_id", "name", "types", "rating", "reviews", "user_ratings_total", "formatted_address", "opening_hours", "opening_hours", "photos", "utc_offset_minutes"],
    };

    serviceRef.current.getDetails(detailRequest, (result, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setDetailResult(result);
      } else {
        console.error("상세 정보 요청 실패:", status);
      }
    });
  }, [detailPlaceId, setDetailResult]);

  return (
    <GoogleMap
      center={currentLocation}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={15}
      onLoad={onMapLoad}
    >
      {/* 검색 결과 마커 */}
      {searchResult.map((place) => {
        if (!place.geometry?.location) return null;
        return (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(70, 70),
            }}
            onClick={() => {
              setDetailPlaceId(place.place_id);
              setIsDetailPage(true);
            }}
          />
        );
      })}

      {/* 사용자 현재 위치 마커 */}
      <Marker
        position={{
          lat: Number(currentLocation.lat),
          lng: Number(currentLocation.lng),
        }}
        icon={{
          url: "/redDot.PNG",
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />
    </GoogleMap>
  );
}

export default MapView;
