import './App.css'
import { Information } from './components/Information'
import MapView from './components/Map'
import { Nav } from './components/Nav'
import { useDetailPage } from './store'
import { LoadScript } from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const libraries = ["places"];

function MainPage() {
  const isDetailPage = useDetailPage((s)=>s.isDetailPage);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries} language="ko">
      <div className='border flex flex-col p-5 gap-5 '>
        <Nav/>
        <div className='flex justify-center'>
          <div className='w-[40rem] h-[40rem] border-gray-400 border relative'>
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
