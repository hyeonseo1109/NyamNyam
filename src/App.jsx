import './App.css'
import { Information } from './components/Information'
import MapView from './components/Map'
import { Nav } from './components/Nav'
import { useDetailPage } from './store'

function App() {
  const isDetailPage = useDetailPage((s)=>s.isDetailPage);

  return (
    <>
    <div className='border flex flex-col p-5 gap-5'>
      <Nav/>
      <div className='w-[50rem] h-[50rem] border-gray-400 border relative'>
        <MapView/>
        { isDetailPage &&
          <div className="absolute bottom-0 z-10">
            <Information />
          </div>
        }
      </div>
    </div>
    </>
  )
}

export default App
