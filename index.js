const GET_FISH_TOKEN = "ZWgsFJJiQnJPdZXnKoqCM+6kFE9ncZOlSlaUF2Qv3Q0ODDiO3HAHnMLLXD3Imamm+Rjyg8rwOSw="
const CLAIM_TOKEN = ["ZWgsFJJiQnJPdZXnKoqCM+6kFE9ncZOlSlaUF2Qv3Q0ODDiO3HAHnMLLXD3Imamm+Rjyg8rwOX1vkmjg+6G9kaWj/dFRS49L+Cr4oyUfRBxnaXeYvk+m2l8GNCA="]
const FEED_TOKEN= ["ZWgsFJJiQnJPdZXnKoqCM+6kFE9ncZOlSlaUF2Qv3Q0ODDiO3HAHnMLLXD3Imamm+Rjyg8rwOX1vkmjg+6G9kaWj/dFRS49L+Cr4oyUfRBxnaXeYvk+m2l8GNHFxuiTHGkJP8kjMEsY="];

const axios = require("axios");
const {
  differenceInMilliseconds,
  addHours,
  addMilliseconds,
} = require("date-fns");

const BASE_URL = "https://api.fishytank.io/rpc";

let currentRun = null;

let fishes = [];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function routine(claim = true, fishIndex) {
  console.log("[INFO] Running routine");
  if (claim) {
    //await axios.post(BASE_URL, { data: CLAIM_TOKEN[fishIndex], name: "claim_reward" });
    await axios.post("https://apius.reqbin.com/api/v1/requests",  {"id":"0","name":"","errors":"","json":`{\"method\":\"POST\",\"url\":\"https://api.fishytank.io/rpc\",\"apiNode\":\"US\",\"contentType\":\"JSON\",\"content\":\"{\\\"name\\\":\\\"claim_reward\\\",\\\"data\\\":\\\"${CLAIM_TOKEN[fishIndex]}\\\"}\",\"headers\":\"\",\"errors\":\"\",\"curlCmd\":\"\",\"codeCmd\":\"\",\"auth\":{\"auth\":\"noAuth\",\"bearerToken\":\"\",\"basicUsername\":\"\",\"basicPassword\":\"\",\"customHeader\":\"\",\"encrypted\":\"\"},\"compare\":false,\"idnUrl\":\"https://api.fishytank.io/rpc\"}`,"deviceId":"b95a14cd-7165-49f8-9e9f-7a63e11e690eR"}, {
      headers:{
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 OPR/79.0.4143.73",
      'Accept-Language': 'en'
    }});
    await wait(5000);
  }
  //await axios.post(BASE_URL, { data: FEED_TOKEN[fishIndex], name: "feed_for_fish" });
  await axios.post("https://apius.reqbin.com/api/v1/requests",  {"id":"0","name":"","errors":"","json":`{\"method\":\"POST\",\"url\":\"https://api.fishytank.io/rpc\",\"apiNode\":\"US\",\"contentType\":\"JSON\",\"content\":\"{\\\"name\\\":\\\"feed_for_fish\\\",\\\"data\\\":\\\"${FEED_TOKEN[fishIndex]}\\\"}\",\"headers\":\"\",\"errors\":\"\",\"curlCmd\":\"\",\"codeCmd\":\"\",\"auth\":{\"auth\":\"noAuth\",\"bearerToken\":\"\",\"basicUsername\":\"\",\"basicPassword\":\"\",\"customHeader\":\"\",\"encrypted\":\"\"},\"compare\":false,\"idnUrl\":\"https://api.fishytank.io/rpc\"}`,"deviceId":"b95a14cd-7165-49f8-9e9f-7a63e11e690eR"}, {
      headers:{
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 OPR/79.0.4143.73",
      'Accept-Language': 'en'
    }});
  fishes[fishIndex].running = false
  await startup();
}

function prepareRun(fishIndex, when){
  fishes[fishIndex].running = true
  fishes[fishIndex].currentRun = setTimeout(async () => {
        await routine(true, fishIndex);
      }, when);
}

async function startup() {
    // const { data } = await axios.post(BASE_URL, {
    //   data: GET_FISH_TOKEN,
    //   name: "get_fish_in_tank",
    // }, {
    //   headers:{
    //   origin: "https://app.fishytank.io",
    //   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 OPR/79.0.4143.73",
    //   'Accept-Language': 'en'
    // }});

const {data} = await axios.post("https://apius.reqbin.com/api/v1/requests",  {"id":"0","name":"","errors":"","json":"{\"method\":\"POST\",\"url\":\"https://api.fishytank.io/rpc\",\"apiNode\":\"US\",\"contentType\":\"JSON\",\"content\":\"{\\\"name\\\":\\\"get_fish_in_tank\\\",\\\"data\\\":\\\"ZWgsFJJiQnJPdZXnKorQZ8/yE0kxc5P1THHGQmR7oQoNCUmLqnchvOC8CDbJvval/h+Ahsr+OSw=\\\"}\",\"headers\":\"\",\"errors\":\"\",\"curlCmd\":\"\",\"codeCmd\":\"\",\"auth\":{\"auth\":\"noAuth\",\"bearerToken\":\"\",\"basicUsername\":\"\",\"basicPassword\":\"\",\"customHeader\":\"\",\"encrypted\":\"\"},\"compare\":false,\"idnUrl\":\"https://api.fishytank.io/rpc\"}","deviceId":"b95a04cc-7065-49f9-9e9f-6a63e11e690eR"}, {
      headers:{
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 OPR/79.0.4143.73",
      'Accept-Language': 'en'
    }});
   
  const jsonResponse = JSON.parse(data.Content)

  jsonResponse.data.forEach(async (fish, index, arr) => {
    if(fishes.length < arr.length){
      fishes.push({name: fish.name, running: false});
    }
    
    if(fishes[index].running){
      return
    }
    
    if (!fish.feed) {
      return await routine(false, index);
    }
    const currentDate = new Date();
    const lastFeed = new Date(fish.feed.createdAt);
    const nextFeed = addHours(lastFeed, 1);

    const diff =
      differenceInMilliseconds(nextFeed, currentDate) +
      randomInteger(60000, 180000);

    if (diff > 0) {
      console.log(
        `Fish: ${fish.name}\nNext run: ${addMilliseconds(new Date(), diff)}`
      );
      if (fishes[index].currentRun) {
        clearTimeout(fishes[index].currentRun);
      }

      prepareRun(index, diff)
      return;
    }
    return await routine(true, index);
  });
}

startup();
