import './Clothes-viwer.css';
import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function ClothesViwer() {
  const [style, setStyle] = useState(1);
  let clothes, clothesText;
  const selectClothes = () => {
    let temp = 10;
    if(temp<=4){
      clothes = 1;
      clothesText = "패딩, 두꺼운 코드, 목도리, 기모 제품";
    }
    else if(temp<=8){
      clothes = 2;
      clothesText = "코트, 가죽 자켓, 니트, 레깅스";
    }
    else if(temp<=11){
      clothes = 3;
      clothesText = "자켓, 트렌치코트, 니트, 청바지, 스타킹";
    }
    else if(temp<=16){
      clothes = 4;
      clothesText = "자켓, 가디건, 야상, 청바지, 면바지";
    }
    else if(temp<=19){
      clothes = 5;
      clothesText = "얇은 니트, 맨투맨, 가디건, 청바지";
    }
    else if(temp<=22){
      clothes = 6;
      clothesText = "얇은 가디건, 긴팔, 면바지, 청바지";
    }
    else if(temp<=27){
      clothes = 7;
      clothesText = "반팔, 얇은 셔츠, 반바지, 면바지";
    }
    else{
      clothes = 8;
      clothesText = "민소매, 반팔, 반바지, 원피스";
    }
  }
  const makeComment = () => {
    let high_temp=15;
    let low_temp=5;
    let precipitation=50;
    let comment1 = "";
    if(high_temp - low_temp >= 10){
        comment1 += "일교차가 크니 겉옷을 챙기세요.\n"
    }
    if(precipitation >= 50){
        comment1 += "비가 올 수 있으니 우산을 챙기세요.\n"
    }
    return comment1;
  }
  const loadClothesImage = () => {
    let source = "/img/clothes/" + clothes + ".jpg";
    return <img src={source} style={{width:"250px", height:"90px"}}></img>
  }
  const loadStyleImage = () => {
    let source = "/img/style/" + clothes + "/" + style + ".jpg";
    return <img src={source} style={{width: "380px", height:"570px"}}></img>
  }
  const handleClick = () => {
    if(style === 5) setStyle(1);
    else setStyle(style + 1);
  }

  selectClothes();
  return (
    <div className="clothes-container">
      <div className="clothes-left">
        <div><h4>오늘은 어떻게 입어야 할까요?</h4></div>
        <div id="clothes-comment">{makeComment()}</div>
        <div id="clothes-clothes">
          {loadClothesImage()}
          {clothesText}
        </div>
      </div>

      <div id="clothes-style">
        {loadStyleImage()}
        <button onClick={handleClick}>New Style</button>
      </div>
    </div>
  );
}
  
export default ClothesViwer;