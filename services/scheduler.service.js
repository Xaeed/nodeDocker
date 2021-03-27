const candidateService = require("./candidate.service");
var cron = require("node-cron");
/**
 * Schdeduled fetch candidate service
 */
const fetchCandidateschedule = cron.schedule(
  "* * * * *",
  async () => {
    await candidateService.getCandidate();
  },
  {
    scheduled: false,
  }
);

// ToDo: this can be more refactor by placing cron defination in a separate file and export
const schedules = [fetchCandidateschedule];

/**
 * It starts/stop cron schedules.
 */
class Scheduler {
  startScheduels() {
    try {
      console.log("starting scheduler");
      schedules.map((schedule) => schedule.start());
    } catch (error) {
      console.error("Failed to start schedul", { error });
    }
  }
  stopSchedules() {
    try {
      schedules.map((schedule) => schedule.destroy());
    } catch (error) {
      console.error("Error occured while stoping schedules", { error });
    }
  }
}

module.exports = Scheduler;
