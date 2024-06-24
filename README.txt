1)
.git 다운로드 후에 index.js. 파일 아래 부분 작성필요

  const clientId = '';
  const clientSecret = '';
  const tokenUrl = '';

index.js 내  app.use(cors({ origin: "http://localhost:8080", credential: true })); => 개발 프로젝트 포트번호로 변경


2) 개발 프로젝트 api 호출부 수정 필요
BaseController.js 아래 소스 추가

        getLocal: function (api, params) {
          return new Promise((resolve, reject) => {
            const paramData = {'api':api};
            const mergeData = {...paramData,...params};
            const data = {...mergeData, 'plant':'P_SECT'}; // plant 수정

            $.ajax({
              url: 'http://localhost:4000/',
              method: "GET",
              data: data,
              success: resolve,
              error: reject,
            });
          });
        },

        postLocal: function (api, params) {
          return new Promise((resolve, reject) => {
            const paramData = {'api':api};
            const mergeData = {...paramData,...params};
            const data = {...mergeData, 'plant':'P_SECT'}; // plant 수정

            $.ajax({
              url: 'http://localhost:4000/',
              method: "POST",
              contentType: "application/x-www-form-urlencoded",
              data: data,
              success: resolve,
              error: reject,
            });
          });
        },

MainView.controller.js 내 this.get / this.post 수정필요 => this.getLocal / this.postLocal


3) 실행방법
node index.js