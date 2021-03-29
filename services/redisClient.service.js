const redis = require("redis");

const redisClient = () => {
  try {
    return redis.createClient({ host: "redis-srever", port: 6379 });
  } catch (error) {
    console.error("Error while creating redisClient", { error });
  }
};


module.exports = redisClient();
