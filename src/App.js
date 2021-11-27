import './App.css';
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import Searchmodal from './Components/Searchmodal';
import ClothesViwer from './Components/Clothes-viwer';
import Footer from './Components/Footer';
import Email from './email';
import WeatherComponent from './Components/WeatherComponent';
import CurrentWeatherBlock from './Components/CurrentWeatherBlock';
import axios from 'axios';

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
  };

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

  // 검색한 주소로 위도, 경도 검색
  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
      headers: { Authorization: 'KakaoAK a500b3de2fa1e2a6efd5565a633e1ccb' },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.documents[0]);

        setLocation({
          lat: Number(res.data.documents[0].y),
          lng: Number(res.data.documents[0].x),
        });
      })
      .catch((err) => console.log(err));
  }, [address]);

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
      });
  }, [location, weather.length]);

  return (
    <div className="main-page">
      <Header></Header>
      <div id="main-wrapper">
        <div id="main-top">
          <div id="main-searchbar" onClick={hadleClick} style={{margin: "auto 100px"}}>
            &nbsp;&nbsp;&nbsp;현재 위치&nbsp;&nbsp;|&nbsp;&nbsp;{address}
          </div>
          <div style={{margin: "0 100px"}}>
            <Searchmodal
              show={show}
              setShow={setShow}
              setAddress={setAddress}   
            ></Searchmodal>
          </div>
          
          {console.log(`현재 위치: ${location.lat}, ${location.lng}`)}
          {weather ? (
            <CurrentWeatherBlock weather={weather[0]}></CurrentWeatherBlock>
          ) : (
            '날씨 불러오는 중...'
          )}  
        </div>
        <div id="main-container">
          <div id="main-weather">
            {weather ? (
              <WeatherComponent weather={weather}></WeatherComponent>
            ) : (
              '날씨 불러오는 중...'
            )}
          </div>
          <div id="main-clothes">
            {weather ? (
              <ClothesViwer weather={weather[0]}></ClothesViwer>
            ) : (
              '날씨 불러오는 중...'
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
      <Email></Email>
    </div>
  );
}

export default App;
