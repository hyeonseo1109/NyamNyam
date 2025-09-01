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
  likedId: [],
  setLikedId: (likedId)=>set({likedId}),
}))

// 찜한 가게들 상세정보 핀
export const useLikedIdResult = create((set)=> ({
  likedIdResult: [], 
  setLikedIdResult: likedIdResult=> set({likedIdResult}),
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


// 리뷰 조건
export const useSortReviewFirst = create((set)=> ({
  reviewFirst: false,
  setReviewFirst: (reviewFirst)=>set({reviewFirst}),
}));

export const useSortReviewSecond = create((set)=> ({
  reviewSecond: false,
  setReviewSecond: (reviewSecond)=>set({reviewSecond}),
}));

export const useSortRatingFirst = create((set)=> ({
  ratingFirst: false,
  setRatingFirst: (ratingFirst)=>set({ratingFirst}),
}));

export const useSortRatingSecond = create((set)=> ({
  ratingSecond: false,
  setRatingSecond: (ratingSecond)=>set({ratingSecond}),
}))

export const useSortIsOpen = create((set)=> ({
  sortIsOpen: false,
  setSortIsOpen: (sortIsOpen)=>set({sortIsOpen}),
}))