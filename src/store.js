import { create } from "zustand";

const center = {
    lat: 37.4979,
    lng: 127.0276,
  }

// 현재 위치 구하기 
export const useLocationStore = create((set) => ({
  currentLocation : center,

  fetchCurrentLocation: () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        set({
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        });
      },
      (error) => {
        console.log("에러:", error)
        set({currentLocation: center});
      }
    );
    } else {
      set({ currentLocation: center })
    }
  }
}))

// text search 검색어 관리
export const useSearch = create((set)=> ({
  searchContent: '',
  setSearchContent: (searchContent) => set({searchContent}),
}))

// text search 검색 결과
export const useSearchResult = create((set)=>({
  searchResult: [],
  setSearchResult: (searchResult) => set({searchResult}),
}))

// 상세 정보 
export const useDetailResult = create((set)=>({
  detailResult: {},
  setDetailResult: (detailResult)=> set({detailResult}),
}))

// 상세 정보 페이지 띄울 것인지
export const useDetailPage = create((set)=>({
  isDetailPage: false,
  setIsDetailPage: (isDetailPage)=> set({isDetailPage}),
}))

// 상세 정보 가게 아이디 
export const useDetailPlaceId = create((set)=>({
  detailPlaceId: null,
  setDetailPlaceId: (detailPlaceId)=> set({detailPlaceId}),
}))

// 찜 상태
export const useLike = create((set)=> ({
  liked: false,
  setLiked: liked => set({ liked }),
}))

// 찜한 가게아이디
export const useLikeId = create((set)=>({
  likedId: null,
  setLikedId: (likedId)=>set({likedId}),
}))

// 메뉴 켤지
export const useMenu = create((set)=> ({
  isMenu: false,
  setIsMenu: isMenu => set({ isMenu }),
}))

// 마이페이지 켤지
export const useMyPage = create((set)=> ({
  isMyPage: false,
  setIsMyPage: isMyPage => set({ isMyPage }),
}))