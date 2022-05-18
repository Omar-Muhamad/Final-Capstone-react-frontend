import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import history from './utils/history';
import { checkAuth } from './redux/Auth/auth';
import { fetchRooms } from './redux/Room/room';
import { fetchHotels } from './redux/Hotel/hotel';
import './App.css';

import Splash from './components/Splash/Splash';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/HeaderContainer';
import AddHotel from './components/Hotels/AddHotel';
import Hotels from './components/Hotels/Hotels';
import HotelDetails from './components/Hotels/HotelDetails';

const App = () => {
  // const router = useHistory();
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(fetchRooms());
    dispatch(checkAuth());
  }, []);

  return (
    <>
      {isAuthorized && (
        <div className="grid sm:grid-cols-5 w-full overflow-none">
          {isAuthorized && <Header />}
          <div className="sm:col-span-4 col-span-full w-full h-hero sm:h-full sm:w-auto mt-16 sm:mt-0">
            <Routes history={history}>
              <Route path="/" element={<Hotels />} />
              <Route path="/hotels/add" element={<AddHotel />} />
              <Route path="/hotels/:id" element={<HotelDetails />} />
              {/* <Route path="/splash" element={<Splash />} /> */}
              {/* <Route path="/addReservation" element={<AddReservation />} />
          <Route path="/reservaions" element={<MyReservations />} />
          <Route path="/delHotel" element={<DelHotel />} /> */}
            </Routes>
          </div>
        </div>
      )}
      {!isAuthorized && (
        <Routes history={history}>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Splash />} />
        </Routes>
      )}
    </>
  );
};

export default App;
