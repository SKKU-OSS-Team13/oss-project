const http = require('http');
const fs = require('fs'); // 파일 접근 라이브러리

const apiData = fs.readFileSync('./apiKey.json');
const parsedData = JSON.parse(apiData);

const SERVICE_KEY = parsedData.APIkey_Encoding;

/* 위도, 경도를 GridX, GridY로 변환 */
const RE = 6371.00877; // 지구 반경(km)
const GRID = 5.0; // 격자 간격(km)
const SLAT1 = 30.0; // 투영 위도1(degree)
const SLAT2 = 60.0; // 투영 위도2(degree)
const OLON = 126.0; // 기준점 경도(degree)
const OLAT = 38.0; // 기준점 위도(degree)
const XO = 43; // 기준점 X좌표(GRID)
const YO = 136; // 기준점 Y좌표(GRID)
//
// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
//

function dfs_xy_conv(code, v1, v2) {
  let DEGRAD = Math.PI / 180.0;
  let RADDEG = 180.0 / Math.PI;

  let re = RE / GRID;
  let slat1 = SLAT1 * DEGRAD;
  let slat2 = SLAT2 * DEGRAD;
  let olon = OLON * DEGRAD;
  let olat = OLAT * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  let rs = {};

  let ra;
  let theta;

  if (code === 'toXY') {
    rs['lat'] = v1;
    rs['lng'] = v2;
    ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    rs['x'] = v1;
    rs['y'] = v2;
    let xn = v1 - XO;
    let yn = ro - v2 + YO;
    ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) ra = -ra;
    let alat = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) theta = -theta;
      } else theta = Math.atan2(xn, yn);
    }
    let alon = theta / sn + olon;
    rs['lat'] = alat * RADDEG;
    rs['lng'] = alon * RADDEG;
  }
  return rs;
}

module.exports = class WeatherApiHandler {
  constructor(lat, lng) {
    this.gridX = dfs_xy_conv('toXY', lat, lng).x;
    this.gridY = dfs_xy_conv('toXY', lat, lng).y;
  }

  getBaseTime = () => {
    // 0200 0500 0800 1100 1400 1700 2000 2300

    // 00 ~ 02시: 전날 2300
    // 03 ~ 05시: 당일 0200
    // 06 ~ 08시: 당일 0500
    // 09 ~ 11시: 당일 0800
    // 12 ~ 14시: 당일 1100
    // 15 ~ 17시: 당일 1400
    // 18 ~ 20시: 당일 1700
    // 21 ~ 23시: 당일 2000 (23:59까지)

    let date = new Date();
    let year = date.getFullYear();
    let month = ('0' + (1 + date.getMonth())).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let dateAndTime = {};

    console.log(
      `현재시간: ${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`
    );

    if (hours < 3) {
      // 전날 2300 데이터
      let yesterday = new Date(date.setDate(date.getDate() - 1));
      year = yesterday.getFullYear();
      month = ('0' + (1 + yesterday.getMonth())).slice(-2);
      day = ('0' + date.getDate()).slice(-2);

      dateAndTime['date'] = year + month + day;
      dateAndTime['time'] = '2300';
      console.log('날짜와 시간: ' + dateAndTime.date + ', ' + dateAndTime.time);
    } else if (hours < 6) {
      // 0200
      dateAndTime['date'] = year + month + day;
      dateAndTime['time'] = '0200';
      console.log('날짜와 시간: ' + dateAndTime.date + ', ' + dateAndTime.time);
    } else if (hours < 9) {
      // 0500
      dateAndTime['date'] = year + month + day;
      dateAndTime['time'] = '0500';
      console.log('날짜와 시간: ' + dateAndTime.date + ', ' + dateAndTime.time);
    } else if (hours < 12) {
      // 0800
      dateAndTime['date'] = year + month + day;
      dateAndTime['time'] = '0800';
      console.log('날짜와 시간: ' + dateAndTime.date + ', ' + dateAndTime.time);
    } else if (hours < 15) {
      // 1100
      dateAndTime['date'] = year + month + day;
      dateAndTime['time'] = '1100';
      console.log('날짜와 시간: ' + dateAndTime.date + ', ' + dateAndTime.time);
    } else if (hours < 18) {
      // 1400
      dateAndTime['date'] = year + month + day;
      dateAndTime['time'] = '1400';
      console.log('날짜와 시간: ' + dateAndTime.date + ', ' + dateAndTime.time);
    } else if (hours < 21) {
      // 1700
      dateAndTime['date'] = year + month + day;
      dateAndTime['time'] = '1700';
      console.log('날짜와 시간: ' + dateAndTime.date + ', ' + dateAndTime.time);
    } else if (hours < 24) {
      // 2000
      dateAndTime['date'] = year + month + day;
      dateAndTime['time'] = '2000';
      console.log('날짜와 시간: ' + dateAndTime.date + ', ' + dateAndTime.time);
    }
    return dateAndTime;
  };

  // API request
  createRequestUrl = (x, y) => {
    const { date, time } = this.getBaseTime();
    return (
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=' +
      SERVICE_KEY +
      '&pageNo=1&numOfRows=300&dataType=JSON&base_date=' +
      date +
      '&base_time=' +
      time +
      '&nx=' +
      x +
      '&ny=' +
      y
    );
  };

  // TODO: 최고, 최저기온 발표 시간은 정해져있으므로 거기서 따와야함
  // 최저: 당일 0600
  // 최고: 당일 1500
  parsingJSON = (json) => {
    try {
      let data = json.response.body.items.item;
      console.log('\nparsing: ', data.length);
      let weather = [];
      let info = {};

      // 날짜 관련
      let date = new Date();
      let year = date.getFullYear();
      let month = ('0' + (1 + date.getMonth())).slice(-2);
      let day = ('0' + date.getDate()).slice(-2);

      let baseDate = year + month + day; // 호출 날짜
      let requestHour = date.getHours(); // API를 호출한 시간대
      let fcstTime = data[0].fcstTime;

      // 받아온 시간동안 온도 저장할 배열 (여기서 최저, 최고 뽑기)
      let temp = [];

      for (let i = 0; i < data.length; i++) {
        let item = data[i];

        // 동일한 날짜에 이른 시각의 값이 넘어오면 skip
        if (
          baseDate === item.fcstDate &&
          Number(item.fcstTime.slice(0, 2)) < requestHour
        ) {
          fcstTime = item.fcstTime;
          continue;
        }

        if (fcstTime !== item.fcstTime) {
          if (Object.keys(info).length !== 0) {
            weather.push(info);
          }
          info = {};
          fcstTime = item.fcstTime;
        }
        switch (item.category) {
          case 'TMP':
            info.temp = item.fcstValue;
            // 출력하는 데이터만큼의 온도만 저장
            if (temp.length < 10) {
              temp.push(Number(item.fcstValue));
            }
            break;
          case 'TMN':
            info.minTemp = item.fcstValue;
            break;
          case 'TMX':
            info.maxTemp = item.fcstValue;
            break;
          case 'POP':
            info.precipitation = item.fcstValue + '%'; // %값
            break;
          case 'SKY':
            let cloudy = parseInt(item.fcstValue);
            if (cloudy === 4) {
              info.sky = '흐림';
            } else if (cloudy === 3) {
              info.sky = '구름많음';
            } else if (cloudy === 1) {
              info.sky = '맑음';
            }
            break;
          case 'PTY': // 강수 형태
            let rainy = parseInt(item.fcstValue);
            if (rainy === 1) {
              info.pty = '비 없음';
            } else if (rainy === 1) {
              info.pty = '비';
            } else if (rainy === 2) {
              info.pty = '비와 눈';
            } else if (rainy === 3) {
              info.pty = '눈';
            } else if (rainy === 4) {
              info.pty = '소나기';
            }
            break;
          case 'PCP': // 1시간 강수량 (1mm)
            info.pcp = item.fcstValue;
            // 1mm 미만과 강수 없음은 동일표기
            break;
          default:
            break;
        }
        info.date = item.fcstDate;
        info.time = item.fcstTime;
      }
      weather.push(info);
      console.log('온도 배열: ' + temp);
      weather[0].minTemp = Math.min.apply(null, temp);
      weather[0].maxTemp = Math.max.apply(null, temp);
      // weather.push({
      //   minTemp: Math.min.apply(null, temp),
      //   maxTemp: Math.max.apply(null, temp),
      // });
      return weather;
    } catch (err) {
      console.log(err);
      return '데이터가 없음';
    }
  };

  weatherAPI = () => {
    return new Promise((resolve, reject) => {
      const url = this.createRequestUrl(this.gridX, this.gridY);
      console.log('위도와 경도: ', this.gridX, this.gridY);
      console.log('weatherAPI() ', url);
      http.get(url, (res) => {
        var json = '';
        res.on('data', (chunk) => {
          json += chunk;
        });
        res.on('end', () => {
          resolve(this.parsingJSON(JSON.parse(json)));
        });
      });
    });
  };
};
