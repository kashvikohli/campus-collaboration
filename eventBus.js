const EventEmitter = require("events");
const eventBus = new EventEmitter();

eventBus.on("message:created", (message) => {
  console.log(`Message created in group ${message.group}`);
});

module.exports = eventBus;
