import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import Crontab from 'reactjs-crontab'

const Email = () => {
  const templateParams = {
    send_to: 'sc4259@naver.com',
    temperature: 11
  };

  const sendEmail = () => {
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
        // this runs every minutes
      }
    ],
    []
  )

  return (
    <div>
      <Crontab
        tasks={tasks}
        timeZone='local'
        // timezone is UTC timezone.
        dashboard={{
          hidden: false
          // if true, dashboard is hidden
        }}
     />
    </div>
  );
};

export default Email;