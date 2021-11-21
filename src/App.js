import './App.css';
import {useState} from 'react';
import Header from './Components/Header';
import Searchmodal from './Components/Searchmodal';
function App() {
  const [show, setShow] = useState(false);
  const hadleClick = () => {
    setShow(true);
  }
  return (
    <div className="main-page">
      <Header></Header>
      <div id="main-wrapper">
      <div id="main-searchbar" onClick={hadleClick}>location</div>
        <Searchmodal show={show} setShow={setShow}></Searchmodal>
        <div id="main-container">
          main-container
        </div>
      </div>
    </div>
  );
}

export default App;
