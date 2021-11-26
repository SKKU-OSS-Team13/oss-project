const express = require('express'); // express 불러오기
const weather = require('./weather.js');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; // 서버는 5000번 포트를 연다.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/weather', (req, res) => {
  console.log(req.body.lat, req.body.lng);
  new weather(req.body.lat, req.body.lng).weatherAPI().then((r) => {
    res.send(r);
    console.log('\n\n--result--\n', r);
  });
});

// 5000번 포트에서 서버가 동작중이라는 메시지를 출력
app.listen(port, () => console.log(`Listening on port ${port}`));
