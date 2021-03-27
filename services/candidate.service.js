const axios = require("axios");
// const provider = require("./provider.service");
const redisClient = require("./redisClient.service");

class CandidateService {
  //should moved to env vars specially host url
  candidateApiUrl = "http://ct-profileGenApi:3000/candidates";

  /**
   * This will call ct-candidate-generatorApi and persist data into redis
   */
  async getCandidate() {
    try {
      const result = await axios.get(this.candidateApiUrl);
      const profiles = result.data;
      /** Here iterate over profiles and persist each profile individually ,
       *  better we should use zset for this kind of data ( Not used due to lack of time) */
      profiles.forEach((profile) => {
        try {
          redisClient.hset("profile", profile.email, JSON.stringify(profile));
          redisClient.expire(profile.email, 5000); //set expiry date for that particular email
        } catch (error) {
          console.error("Error while saving data to redis", { error });
        }
      });
    } catch (error) {
      // I should have used logger and use that everywhere in code
      // but at first i forget and later on it was too time taking to introduce
      console.log("failed to fetch candidate  profile", error);
    }
  }
}
const candidateService = new CandidateService();
module.exports = candidateService;
