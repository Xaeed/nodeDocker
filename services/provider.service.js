const scheduler = require("./scheduler.service");
/**
 * A small dummy singleton
 */
class Provider {
  get scheduler() {
    return new scheduler();
  }
}

const provider = new Provider();

module.exports = provider;
