import './App.css';
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import Searchmodal from './Components/Searchmodal';
import Footer from './Components/Footer';
import WeatherContainer from './Components/WeatherContainer';
function App() {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('검색창을 눌러 주소를 입력해주세요');
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const hadleClick = () => {
    setShow(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          `latitude: ${position.coords.latitude}, longtitude: ${position.coords.longitude}`
        );
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="main-page">
      <Header></Header>
      <div id="main-wrapper">
        <div id="main-searchbar" onClick={hadleClick}>
          &nbsp;&nbsp;&nbsp;현재 위치&nbsp;&nbsp;|&nbsp;&nbsp;{address}
        </div>
        <Searchmodal
          show={show}
          setShow={setShow}
          setAddress={setAddress}
        ></Searchmodal>
        <div id="main-container">
          <div id="main-weather">
            {location.lat !== 0 && location.lng !== 0 ? (
              <WeatherContainer
                lat={location.lat}
                lng={location.lng}
              ></WeatherContainer>
            ) : null}
          </div>
          <div id="main-clothes"></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
