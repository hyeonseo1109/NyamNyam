import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import { SignInPage } from './components/SignInPage';
import PrivateRoute from './privateRoute';

function App() {

  return (
    <Routes>
      <Route path="/" element={<SignInPage/>} />
      <Route path="/map" element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>} />
    </Routes>
  )
}

export default App;
