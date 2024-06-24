const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 4000;
let token = '';

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:8080", credential: true })); // 본인 프로젝트 포트번호로 변경

const api_url = `https://api.test.us20.dmc.cloud.sap/`;

const getAPI = async (request) => {
  console.log('** getAPI api  = ' + request.url);
  console.log('** getAPI api_url = ' + api_url);
  console.log('** getAPI request api  = ' + request.query.api);
  console.log('** getAPI request body = ' + JSON.stringify(request.query));

  let reqUrl = request.url;

  reqUrl = reqUrl.substr(reqUrl.indexOf('&')+1); // 첫번째값은 api 라우터이므로 제외
  
  const callUrl = api_url + request.query.api + '?' + reqUrl;

  console.log('** url = ' + callUrl);

  let response;
  try {
    // response = await axios.get(callUrl, { headers: { Authorization : 'Bearer '+'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vY2xvdWQtcGxhdGZvcm0taW50ZWdyYXRpb24tcGFydG5lci1wMzAwMDA1LXFoemFncHE5LmF1dGhlbnRpY2F0aW9uLnVzMjAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS00N2VkNTQ0NmY1IiwidHlwIjoiSldUIiwiamlkIjogIkJLejdpSlcwcDJCRmh5R0tyd3V3ckw4U0dneUtkZmtOOHpwTXBKQXpLcmM9In0.eyJqdGkiOiI0ZDViNWVlNzgwNTQ0MTRkOWQyMDQ4NzEyZmYyMzkyZCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyYzM1ZGIxOC0zNmQ1LTQwZmMtYmE2Yy1mMWRiYjgzOTIxYjMiLCJ6ZG4iOiJjbG91ZC1wbGF0Zm9ybS1pbnRlZ3JhdGlvbi1wYXJ0bmVyLXAzMDAwMDUtcWh6YWdwcTkiLCJzZXJ2aWNlaW5zdGFuY2VpZCI6ImRhM2QxMjczLWMwODUtNGY0ZS05YTE5LWM5YzUxMzE2MWFhYyJ9LCJ1c2VyX3V1aWQiOiI0ZGQ3ZTg3OS1kZjExLTQ1YWQtYjdlZC1mODJmNzU1NDliMGIiLCJ4cy51c2VyLmF0dHJpYnV0ZXMiOnt9LCJ4cy5zeXN0ZW0uYXR0cmlidXRlcyI6eyJ4cy5yb2xlY29sbGVjdGlvbnMiOlsiU3ViYWNjb3VudCBTZXJ2aWNlIEFkbWluaXN0cmF0b3IiLCJETV9URVNUIiwiRGVzdGluYXRpb24gQWRtaW5pc3RyYXRvciIsIkJ1c2luZXNzX0FwcGxpY2F0aW9uX1N0dWRpb19FeHRlbnNpb25fRGVwbG95ZXIiLCJCdXNpbmVzc19BcHBsaWNhdGlvbl9TdHVkaW9fRGV2ZWxvcGVyIiwiQnVzaW5lc3NfQXBwbGljYXRpb25fU3R1ZGlvX0FkbWluaXN0cmF0b3IiLCJTdWJhY2NvdW50IEFkbWluaXN0cmF0b3IiLCJDbG91ZCBDb25uZWN0b3IgQWRtaW5pc3RyYXRvciIsIkNvbm5lY3Rpdml0eSBhbmQgRGVzdGluYXRpb24gQWRtaW5pc3RyYXRvciJdfSwiZ2l2ZW5fbmFtZSI6Ikt5dWNoYW4iLCJmYW1pbHlfbmFtZSI6IkNob2kiLCJzdWIiOiI0ODYxNGM4Ny1lMjg2LTRlNzctODZiNC05OTVkYzljN2RkNjAiLCJzY29wZSI6WyJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LnBrZy5leCIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcuZGVtYW5kLnIiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LnByb2R1Y3QuciIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcuc3RnLm0iLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LmRjLnIiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LmRjLm0iLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LmFtLmkiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3Lmludl9yIiwiZG1jLXNlcnZpY2VzLXF1YWxpdHkhYjI1Ny5wZS5leCIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcuY2Fycmllcl9yIiwiZG1jLXNlcnZpY2VzLXF1YWxpdHkhYjI1Ny5pbnZfbWRfciIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcud2kuciIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcucGxhbnQuciIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcucHJvZHVjdGlv'+
    // 'bi5leCIsIm9wZW5pZCIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcuaW50LmV4IiwidWFhLnVzZXIiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LndzLnIiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LnN0Zy5leCIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcuZXNjLmUiXSwiY2xpZW50X2lkIjoic2ItZGEzZDEyNzMtYzA4NS00ZjRlLTlhMTktYzljNTEzMTYxYWFjIWIxNTk5MHxkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3IiwiY2lkIjoic2ItZGEzZDEyNzMtYzA4NS00ZjRlLTlhMTktYzljNTEzMTYxYWFjIWIxNTk5MHxkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3IiwiYXpwIjoic2ItZGEzZDEyNzMtYzA4NS00ZjRlLTlhMTktYzljNTEzMTYxYWFjIWIxNTk5MHxkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3IiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9pZCI6IjQ4NjE0Yzg3LWUyODYtNGU3Ny04NmI0LTk5NWRjOWM3ZGQ2MCIsIm9yaWdpbiI6InNhcC5kZWZhdWx0IiwidXNlcl9uYW1lIjoia3l1Y2hhbjEuY2hvaUBkb25na3VrLmNvbSIsImVtYWlsIjoia3l1Y2hhbjEuY2hvaUBkb25na3VrLmNvbSIsImF1dGhfdGltZSI6MTcxOTEyODQwOCwicmV2X3NpZyI6IjFiNTQ2NTFmIiwiaWF0IjoxNzE5MTI4NDA4LCJleHAiOjE3MTkyMTQ4MDgsImlzcyI6Imh0dHBzOi8vY2xvdWQtcGxhdGZvcm0taW50ZWdyYXRpb24tcGFydG5lci1wMzAwMDA1LXFoemFncHE5LmF1dGhlbnRpY2F0aW9uLnVzMjAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIyYzM1ZGIxOC0zNmQ1LTQwZmMtYmE2Yy1mMWRiYjgzOTIxYjMiLCJhdWQiOlsiZG1jLXNlcnZpY2VzLXF1YWxpdHkhYjI1Ny5lc2MiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LnByb2R1Y3QiLCJvcGVuaWQiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LmludCIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcuZGVtYW5kIiwic2ItZGEzZDEyNzMtYzA4NS00ZjRlLTlhMTktYzljNTEzMTYxYWFjIWIxNTk5MHxkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3IiwiZG1jLXNlcnZpY2VzLXF1YWxpdHkhYjI1Ny5hbSIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcucHJvZHVjdGlvbiIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTciLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LnBlIiwiZG1jLXNlcnZpY2VzLXF1YWxpdHkhYjI1Ny5wbGFudCIsInVhYSIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcud2kiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LnBrZyIsImRtYy1zZXJ2aWNlcy1xdWFsaXR5IWIyNTcuZGMiLCJkbWMtc2VydmljZXMtcXVhbGl0eSFiMjU3LndzIiwiZG1jLXNlcnZpY2VzLXF1YWxpdHkhYjI1Ny5zdGciXX0.H1Yz1Fbf1JbgvGWhi-GjCyurzgIPHyLtXTUgp8hAHlVxyUSzgviL4Q5rHTLEFygOgJb0g5Afm_HmWt5wY_X1e-YV5ek-QgPAVh6GmKUFRdVP97SgHH2CUEVqOILWE4ceC78DX9LRPZS2Xyw7C2PEFZA9DEL5IodCOy8NUGl_O-xZauUtTND3tL1c4n4G0RwGUSj6wHA1CJTrYPEBzpTsIxpwy3YlfLfy8jS8lzp1MbLnpu9WHzlPRF__7oCpTyjz7V3EKRGrPmRpAuoXC16Xx5C8qXPvygykdiXChZD2E2DU2lpiaYLeZCaXOGgzm5iRCpanMlCQX0lk8lBgPunKlA'
    // }})
    response = await axios.get(callUrl, { headers: { Authorization : 'Bearer '+token }})
  } catch (error) {
    console.log(error);
  }
  return response;
};

const postAPI = async (request) => {
  console.log('** postAPI api = ' + request.url);
  console.log('** postAPI api_url = ' + api_url);
  console.log('** postAPI request api  = ' + request.body.api);
  console.log('** postAPI request body = ' + JSON.stringify(request.body));
  
  const callUrl = api_url + request.body.api;

  console.log('** url = ' + callUrl);

  let response;
  try {
    response = await axios.post(callUrl, request.body, { headers: { Authorization : 'Bearer '+token }})
  } catch (error) {
    console.log(error);
  }
  return response;
};

app.get("/", (req, res) => {
  console.log('* get call');
  console.log('* req.url = ' + req.url);
  console.log('* req.api = ' + req.query.api);
  
  getAPI(req).then((response) => {
    //console.log('* response.data = ' + JSON.stringify(response.data));
    console.log('* getAPI reponse success');
    res.json(response.data);
  });
});

app.post("/", (req, res) => {
  console.log('* post call');
  console.log('* req.url = ' + req.url);
  console.log('* req.api = ' + JSON.stringify(req.body.api));
  
  postAPI(req).then((response) => {
    //console.log('* response.data = ' + JSON.stringify(response.data));
    console.log('* postAPI reponse success');
    res.json(response.data);
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  getToken().then((response) => {
    console.log('** getToken success');
    token = response;
  });
})


const getToken = async () => {
  // Client ID와 Client Secret
  const clientId = '';
  const clientSecret = '';
  const tokenUrl = '';
    try {
        const response = await axios.post(tokenUrl, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: clientId,
                password: clientSecret
            },
            params: {
                grant_type: 'client_credentials'
            }
        });

        const token = response.data.access_token;
        //console.log('Bearer ' + token);
        return token;
    } catch (error) {
        console.error('Error fetching token:', error.response.data);
    }
};
