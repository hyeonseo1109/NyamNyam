import './App.css'
import { Information } from './components/Information'
import MapView from './components/Map'
import { Nav } from './components/Nav'
import { useDetailPage, useLikeId } from './store'
import { LoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const libraries = ["places"];

function MainPage() {
  const isDetailPage = useDetailPage((s)=>s.isDetailPage);

  const setLikedId = useLikeId((s) => s.setLikedId); 

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;  

    const fetchLikedPlaces = async () => {
      try {
        const res = await axios.get("http://3.35.209.203:3000/api/places/like", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // 서버에서 { restaurantIds: [...] } 형식으로 내려옴
        setLikedId(res.data.restaurantIds);
      } catch (err) {
        console.error("찜 목록 불러오기 실패:", err);
      }
    };

    fetchLikedPlaces();
  }, [token]);


  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries} language="ko">
      <div className='border flex flex-col p-5 gap-5 rounded-[0.4rem]  shadow-[0_0_1rem_#aaaaaa7f] m-10'>
        <Nav/>
        <div className='flex justify-center'>
          <div className='w-[40rem] h-[60rem] border-gray-400 border relative'>
            <MapView/>
            { isDetailPage &&
              <div className="absolute bottom-0 z-10">
                <Information />
              </div>
            }
          </div>
        </div>
      </div>
    </LoadScript>
  )
}

export default MainPage
