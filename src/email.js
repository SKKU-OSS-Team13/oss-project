import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import Crontab from 'reactjs-crontab'

const Email = (weather) => {

  

  const sendEmail = () => {
    let _temp = 0;
    for(let i = 0; i < 10; i++){
      _temp += parseInt(weather.weather[i].temp);
    }
    _temp /= 10;
    const templateParams = {
      send_to: 'sc4259@naver.com',
      temp: _temp,
      maxTemp: weather.weather[0].maxTemp,
      minTemp: weather.weather[0].minTemp
    };

    emailjs.send('service_wsqmop6', 'template_2ac43s5', templateParams, 'user_P8At5ZwI7nBdgmsHR2CU7')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const tasks = React.useMemo(
    () => [
      {
        fn: sendEmail,
        config: '* 9 * * *'
        // this runs everyday 9:00AM
      }
    ],
    []
  )
  return (
    <div>
      <Crontab
        tasks={tasks}
        timeZone='JST'
        // timezone is UTC timezone.
        dashboard={{
          hidden: false
          // if true, dashboard is hidden
        }}
     />
     <button onClick={sendEmail}>send</button>
    </div>
  );
};

export default Email;