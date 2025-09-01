import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDetailPage, useDetailPlaceId, useDetailResult, useLikedIdResult, useLikeId, useLocationStore, useMyPage, useSearch, useSearchResult, useSortIsOpen } from "../store";
import { useEffect, useRef, useState } from "react";
import { Sort } from "./Sort";


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

  const likedId = useLikeId((s)=> s.likedId);
  const likedIdResult = useLikedIdResult((s)=>s.likedIdResult);
  const setLikedIdResult = useLikedIdResult((s)=>s.setLikedIdResult);

  const sortIsOpen = useSortIsOpen(s=>s.sortIsOpen);
  // const setSortIsOpen = useSortIsOpen(s=>s.setSortIsOpen);

  const isMyPage = useMyPage((s)=> s.isMyPage);

  const [map, setMap] = useState(null);
  const serviceRef = useRef(null);

  
  const sortedSearchResult = Sort(searchResult);
  const sortedLikedIdResult = Sort(likedIdResult);

  const isOpenSortSearchResult = sortIsOpen
  ? sortedSearchResult.filter((res) => res.opening_hours?.open_now === true)
  : sortedSearchResult;

  const isOpenSortLikedIdResult = sortIsOpen
  ? sortedLikedIdResult.filter((res) => res.opening_hours?.open_now === true)
  : sortedLikedIdResult;

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

  //찜리스트에서 가게Id로 검색해서 정보 가져오기
  useEffect(() => {
    if ( !isMyPage && likedId?.length === 0) return;

    const fetchDetails = async () => {
      const results = [];

      for (const id of likedId) {
        const detailRequest = {
          placeId: id,
          fields: [
            "place_id", "name", "types","rating","reviews", "user_ratings_total","formatted_address","opening_hours","photos","utc_offset_minutes","geometry"
          ],
        };

        await new Promise((resolve) => {
          serviceRef.current.getDetails(detailRequest, (result, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              results.push(result);
            } else {
              console.error("상세 정보 요청 실패:", status);
            }
            resolve();
          });
        });
      }

      setLikedIdResult(results);
    };

    fetchDetails();
  }, [likedId, setLikedIdResult, isMyPage]);

  useEffect(()=>{
    console.log("찜한 가게 상세정보 목록:", likedIdResult);
  }, [likedIdResult])

  return (
    <GoogleMap
      center={currentLocation}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={15}
      onLoad={onMapLoad}
    >
      {/* 검색 결과 마커 */}
      {!isMyPage ? isOpenSortSearchResult.map((place) => {
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
              scaledSize: new window.google.maps.Size(60, 60),
            }}
            onClick={() => {
              setDetailPlaceId(place.place_id);
              setIsDetailPage(true);
            }}
          />
        );
      })
    :
    isOpenSortLikedIdResult.map((place) => {
        if (!place.geometry?.location) return null;
        return (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
              scaledSize: new window.google.maps.Size(60, 60),
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
