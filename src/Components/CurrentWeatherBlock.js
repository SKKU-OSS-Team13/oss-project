import React from 'react';
// 날씨 아이콘
import sun from '../Image/sun.png';
import cloudy from '../Image/cloudy.png';
import more_cloudy from '../Image/more_cloudy.png';
import cloudy_rain from '../Image/cloudy_rain.png';
import rain from '../Image/rain.png';
import rainsnow from '../Image/rainsnow.png';
import snow from '../Image/snow.png';

function CurrentWeatherBlock(weather) {
  const selectIcon = (sky, pty) => {
    if (pty) {
      switch (pty) {
        case '비 없음':
          return cloudy_rain;
        case '비':
        case '소나기':
          return rain;
        case '비와 눈':
          return rainsnow;
        case '눈':
          return snow;
        default:
          break;
      }
    } else {
      switch (sky) {
        case '맑음':
          return sun;
        case '흐림':
          return more_cloudy;
        case '구름많음':
          return cloudy;
        default:
          break;
      }
    }
  };

  return (
    <div className="weather__block">
      <img
        src={selectIcon(weather.weather.sky, weather.weather.pty)}
        alt="날씨 아이콘"
        width="50"
      />
      <p>현재 온도: {weather.weather.temp} &deg;C</p>
      <p>
        최저: {weather.weather.minTemp} &deg;C / 최고: {weather.weather.maxTemp}{' '}
        &deg;C
      </p>
    </div>
  );
}

export default CurrentWeatherBlock;
