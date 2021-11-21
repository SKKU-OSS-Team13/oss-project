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
        <div id="header-title">오늘 뭐 입지</div>
        <div id="header-clock">{now}</div>
        <div id="header-weather">현재 날씨</div>
      </div>
    );
  }
  
  export default Header;