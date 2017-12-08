module.exports = function (wallaby) {
  return {
    files: [
      'src/components/weather-forecast/*.vue'
    ],
    tests: [
      'test/**/*Spec.js'
    ],
    debug: true
  };
};
