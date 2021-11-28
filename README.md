# 오늘 뭐 입지?

현재 날씨에 따른 옷차림을 추천해주는 웹 페이지 입니다.

## A brief overview

Our web page("오늘 뭐 입지?") recommends clothes based on weather. After receiving the user's location and current time automatically,  
it shows :

1. the weather from now to after 10 hours, and recommended clothes accordingly.(The user can also set the location through regional search)

2. the recommended clothes according to the temperature as the most basic clothing image and text.
3. the recommendation text to pack umbrellas or outerwear depending on the probability of precipitation and daily temperature difference.

4. a full-body coordination picture that people wear at the current temperature, and show another recommended coordination picture when clicking the button.

Also, the weather and recommended clothes are sent to the user's e-mail every morning if user wants.

## Installation

```
git clone https://github.com/SKKU-OSS-Team13/oss-project.git

npm install

npm start
```

## How to use

1. 홈페이지에 접속한다.
2. 처음 접속하면 현재 위치를 기반으로 날씨 정보와 옷차림을 추천하여 보여준다.
3. 위치 검색을 통해 특정 지역을 검색하여 옷차림을 추천받을 수 있다.
4. 사진 하단의 **New Style** 버튼을 클릭해서 다양한 옷차림 예시를 볼 수 있다.

## screenshots

### 현재 위치 기반 날씨 정보와 옷차림 추천

![init](https://user-images.githubusercontent.com/71871348/143726144-ed494398-251b-4116-ad47-5ca903a1131b.PNG)

### 위치 검색을 통해 특정 지역의 날씨 정보와 옷차림 추천

![search](https://user-images.githubusercontent.com/71871348/143726147-d5f79ac8-caea-415a-8e77-9c550d9669f1.PNG)
![search-result](https://user-images.githubusercontent.com/71871348/143726155-c470ea21-aa3e-4df3-8168-49b45e8322c8.PNG)
![search-result2](https://user-images.githubusercontent.com/71871348/143726156-116a3abe-de24-4c42-b9d7-3be872f0ce2d.PNG)

### 다양한 스타일 보기

![newstyle](https://user-images.githubusercontent.com/71871348/143726149-11326a18-58aa-43ec-8eb6-286f997b514d.gif)

### 이메일 받기

## demo video


https://user-images.githubusercontent.com/71871348/143726164-f46c890e-9970-4d0d-a2e7-58226c200663.mp4


## API reference

- [기상청 단기예보 조회 서비스](https://www.data.go.kr/data/15084084/openapi.do)
- [다음 위치 검색 API](https://postcode.map.daum.net/guide)
- [Kakao developers 로컬 API](https://developers.kakao.com/docs/latest/ko/local/common)
- [EmailJS](https://www.emailjs.com/)

## License

This project is licensed under the terms of the MIT license.

## Code of Conduct

• Safe work environments  
• Mutual respect  
• Empathy and kindness  
• Constructive feedback

---
