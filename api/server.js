const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('../build'));
app.use('/api/main', require('./main'));
app.use('/api/weather', require('./weather'));
app.listen(port, function(){
  console.log(`Express server has started on port ${port}`);
})