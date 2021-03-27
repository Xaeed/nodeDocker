const candidateService = require("../services/candidate.service");

describe("Candidate fetch service", () => {
  it("It should call ct-candidate-Api and persist data to redis", async () => {
    const spy = jest.spyOn(candidateService, "getCandidate");
    await candidateService.getCandidate();
    expect(spy).toHaveBeenCalled();
  });
});
