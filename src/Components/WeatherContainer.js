import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

// 날씨 아이콘
import sun from '../Image/sun.png';
import cloudy from '../Image/cloudy.png';
import more_cloudy from '../Image/more_cloudy.png';
import cloudy_rain from '../Image/cloudy_rain.png';
import rain from '../Image/rain.png';
import rainsnow from '../Image/rainsnow.png';
import snow from '../Image/snow.png';

function WeatherContainer({ lat, lng }) {
  const [weather, setWeather] = useState('');

  // 강수량
  const precipitation = (pcp) => {
    if (pcp === '1.0mm 미만' || !pcp) {
      return ' - ';
    } else {
      return pcp;
    }
  };

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

  useEffect(() => {
    console.log('날씨 부분 생성');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON.stringify({
        lat: lat,
        lng: lng,
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
  }, []);

  return (
    <div className="weather_container">
      <div className="result">
        <Table className="weather__table">
          <TableHead>
            <TableRow>
              <TableCell align="center">날짜</TableCell>
              <TableCell align="center">시간</TableCell>
              <TableCell align="center">기온</TableCell>
              <TableCell align="center">날씨</TableCell>
              <TableCell align="center">강수 확률</TableCell>
              <TableCell align="center">강수량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weather
              ? weather.map((c, index) => {
                  if (index > 10) return null;
                  if (Object.keys(c).length !== 0) {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          {c.date.slice(4, 6) + ' / ' + c.date.slice(6, 8)}
                        </TableCell>
                        <TableCell align="center">
                          {c.time.slice(0, 2) + ' : ' + c.time.slice(2, 4)}
                        </TableCell>
                        <TableCell align="center">{c.temp} &deg;C</TableCell>
                        <TableCell align="center">
                          <img
                            src={selectIcon(c.sky, c.pty)}
                            alt="날씨 아이콘"
                            width="20"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {c.precipitation ? c.precipitation : ' - '}
                        </TableCell>
                        <TableCell align="center">
                          {precipitation(c.pcp)}
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return null;
                  }
                })
              : '날씨 불러오는 중 ...'}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default WeatherContainer;
