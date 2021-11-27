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

![init](https://user-images.githubusercontent.com/71871348/143668929-c9028ead-d357-4e84-bb46-c99a640c80fe.PNG)

### 위치 검색을 통해 특정 지역의 날씨 정보와 옷차림 추천

![search](https://user-images.githubusercontent.com/71871348/143668934-6faf7afe-8c55-4be8-a9e6-6347de8b19eb.PNG)
![search-result](https://user-images.githubusercontent.com/71871348/143668936-2d06e869-f538-4366-99fb-7cedffc36549.PNG)
![search-result2](https://user-images.githubusercontent.com/71871348/143668939-891f5e03-2b99-4d3d-935d-2679b5a5299e.PNG)

### 이메일 받기

## demo video

## API reference

- [기상청 단기예보 조회 서비스](https://www.data.go.kr/data/15084084/openapi.do)
- [다음 위치 검색 API](https://postcode.map.daum.net/guide)
- [Kakao developers 로컬 API](https://developers.kakao.com/docs/latest/ko/local/common)
- [EmailJS](https://www.emailjs.com/)

## Releases (versions)

## License

This project is licensed under the terms of the MIT license.

## Code of Conduct

• Safe work environments  
• Mutual respect  
• Empathy and kindness  
• Constructive feedback

---
