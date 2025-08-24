import { create } from "zustand";

const center = {
    lat: 37.4979,
    lng: 127.0276,
  }

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

export const useSearch = create((set)=> ({
  searchContent: '',
  setSearchContent: (searchContent) => set({searchContent}),
}))

export const useSearchResult = create((set)=>({
  searchResult: [],
  setSearchResult: (searchResult) => set({searchResult}),
}))