import './Header.css'
import moment from 'moment';
import {useInterval} from 'react-use';
import {useState} from 'react';

function Header(props) {

    let [count, setCount] = useState(0);
    useInterval(() => {
        setCount(count + 1);
    }, 1000);
    const now = moment().format('MMM DD (ddd) HH:mm:ss');

    return (
      <div className="header-container">
        <div>오늘 뭐 입지</div>
        <div className="clock">{now}</div>
      </div>
    );
  }
  
  export default Header;