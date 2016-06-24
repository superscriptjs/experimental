
var facts           = require("sfacts");

var data = [
  './facts/test.top'
];

facts.load(data, 'testfacts', function(err, factSystem) {
  factSystem.conceptToList('foods', function(err, res) {
    console.log(err, res);
  })
});