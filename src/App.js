import './App.css';
import {useState, useEffect} from 'react';
import Header from './Components/Header';
import Searchmodal from './Components/Searchmodal';
import WeatherComponent from './Components/WeatherComponent';
import CurrentWeatherBlock from './Components/CurrentWeatherBlock';
import Clothes from './Components/Clothes';
import Footer from './Components/Footer';
function App() {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('검색창을 눌러 주소를 입력해주세요');
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [weather, setWeather] = useState('');
  const hadleClick = () => {
    setShow(true);
  }
  
  // 현재 위치 저장
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

  // 날씨 호출 API
  // 위도, 경도 값이 바뀔때마다 호출?
  useEffect(() => {
    console.log('날씨 부분 생성');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON.stringify({
        lat: location.lat,
        lng: location.lng,
      }),
    };
    console.log(requestOptions);
    fetch('/api/weather', requestOptions)
      .then((res) => res.json()) // Result를 JSON으로 받습니다.
      .then((res) => {
        console.log(res); // 결과를 console창에 표시합니다.
        setWeather(res);
        console.log('set weather: ' + weather.length);
      });
  }, [location, weather.length]);

  return (
    <div className="main-page">
      <Header></Header>
      <div id="main-wrapper">
      <div id="main-searchbar" onClick={hadleClick}>&nbsp;&nbsp;&nbsp;현재 위치&nbsp;&nbsp;|&nbsp;&nbsp;{address}</div>
        <Searchmodal show={show} setShow={setShow} setAddress={setAddress}></Searchmodal>
        {weather ? (
          <CurrentWeatherBlock weather={weather[0]}></CurrentWeatherBlock>
        ) : (
          '현재 날씨 불러오는 중...'
        )}
        <div id="main-container">
          <div id="main-weather">
            {weather ? (
                <WeatherComponent weather={weather}></WeatherComponent>
              ) : (
                '날씨 불러오는 중...'
              )}
          </div>
          <div id="main-clothes">
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
