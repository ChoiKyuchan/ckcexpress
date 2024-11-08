const express = require("express");
const axios = require("axios");
const app = express();

const postAPI = async () => {
  let response;
  try {
    response = await axios.post("https://kyma-oasis-api-sample.c-9786f9e.kyma.ondemand.com/service/sample", {}, {})
  } catch (error) {
    //console.log(error);
    console.log("****** post api error ******");
  }
  return response;
};

app.listen(() => {
  postAPI().then((response) => {
    console.log(response.data);
    process.exit();
  });
});