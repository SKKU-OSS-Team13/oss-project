# 오늘 뭐 입지?

현재 날씨에 따른 옷차림을 추천해주는 웹 페이지 입니다.

## A brief overview

저희 웹사이트는 날씨에 따라 옷을 추천합니다. 사용자의 위치와 현재 시간을 자동으로 수신한 후,
다음 내용들을 표시합니다.

1. 현재 시간부터 10시간 후까지 1시간 마다의 날씨(사용자는 지역 검색을 통해 위치를 다른 곳으로도 설정할 수 있습니다.)
2. 기온에 따라 추천된 가장 기본적인 옷의 이미지와 텍스트.
3. 강수 확률과 10시간 동안의 온도차에 따라 우산이나 겉옷을 챙기라고 추천하는 문구
4. 현재 온도에서 착용할만한 전신 코디 사진, (버튼을 클릭 시 다른 추천 코디 사진이 표시됩니다.)

또한 사용자가 원할 경우 매일 아침 날씨와 추천 옷차림을 사용자의 이메일로 전송합니다.

## Installation

```
git clone https://github.com/SKKU-OSS-Team13/oss-project.git

npm install

npm start
```

## How to use

1. "git clone https://github.com/SKKU-OSS-Team13/oss-project.git" 명령어로 repository 내용을 로컬에 가져온다.
3. "cd oss-project" 명령어로 oss-project디렉토리에 들어가 "npm install" 명령어를 입력한다.
4. "npm start" 명령어로 홈페이지에 접속한다.
5. 처음 접속하면 현재 위치를 기반으로 날씨 정보와 옷차림을 추천하여 보여준다.
6. 위치 검색을 통해 특정 지역을 검색하여 옷차림을 추천받을 수 있다.
7. 사진 상단의 **New Style** 버튼을 클릭해서 다양한 옷차림 예시를 볼 수 있다.

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

이 프로젝트는 MIT 라이센스 조항에 따라 라이센스가 부여됩니다.

## Code of Conduct

• 안전한 작업 환경  
• 존중  
• 공감과 친절  
• 건설적인 피드백  

---
