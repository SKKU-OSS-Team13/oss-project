import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Email = () => {
  const templateParams = {
    send_to: 'sc4259@naver.com',
    reply_to: 'st42597@gmail.com',
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

  return (
    <div>
      <button
        onClick = {() => sendEmail()}
      >
        SendEamil
      </button>
    </div>
  );
};

export default Email;