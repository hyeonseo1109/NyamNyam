import './App.css'
import MapView from './components/Map'
import { Nav } from './components/Nav'

function App() {


  return (
    <>
    <div className='border flex flex-col p-5 gap-5'>
      <Nav/>
      <div className='w-[50rem] h-[50rem] border'>
        <MapView />
      </div>
    </div>
    </>
  )
}

export default App
