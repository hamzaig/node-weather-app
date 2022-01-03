const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=68fe3b769f10c49779b046439672950a`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.cod == 400) {
      callback("Unable to find location");
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forcast;