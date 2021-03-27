"use strict";

const express = require("express");
var cors = require("cors");
const redisClient = require("./services/redisClient.service");
const provider = require("./services/provider.service");
const shuffleArray = require("./util/shuffling");

const app = express();
app.use(cors());
require("dotenv").config("config/development.env");

const HOST = process.env.HOST;
const PORT = process.env.PORT;
provider.scheduler.startScheduels();

app.get("/", async (req, res) => {
  try {
    // this logic could be refacor more and put in some persistance service to save/get data/
    const redisResult = new Promise((resolve, reject) => {
      redisClient.HGETALL("profile", (err, res) => {
        if (err) {
          console.log("Error while fetching result from redis", { err });
          reject(err);
        } else {
          const profiles = Object.values(res).map((profile) =>
            JSON.parse(profile)
          );
          const shuffle = shuffleArray(profiles).slice(
            0,
            Math.floor(Math.random() * 10) + 1
          );
          resolve(shuffle);
        }
      });
    });

    res.send(await redisResult);
  } catch (error) {
    console.error("Error on fetching candidate....", error);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

process.on("SIGTERM", () => {
  scheduler.stopSchedules();
});
