import './App.css';
import {useState} from 'react';
import Header from './Components/Header';
import Searchmodal from './Components/Searchmodal';
import Footer from './Components/Footer';
function App() {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('검색창을 눌러 주소를 입력해주세요');
  const hadleClick = () => {
    setShow(true);
  }
  return (
    <div className="main-page">
      <Header></Header>
      <div id="main-wrapper">
      <div id="main-searchbar" onClick={hadleClick}>&nbsp;&nbsp;&nbsp;현재 위치&nbsp;&nbsp;|&nbsp;&nbsp;{address}</div>
        <Searchmodal show={show} setShow={setShow} setAddress={setAddress}></Searchmodal>
        <div id="main-container">
          <div id="main-weather">
          </div>
          <div id="main-clothes">
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
