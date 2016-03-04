var Nightmare = require('nightmare'),
  co = require('co'),
  nightmare = Nightmare({
    show: true
  });

var run = function * (selector) {
  var result = yield nightmare
    .goto('http://yahoo.com')
    .type('input[title="Search"]', 'github nightmare')
    .click('#uh-search-button')
    .wait('#main')
    .evaluate(function(selector) {
      return document.querySelector(selector)
        .href;
    }, selector);

  yield nightmare.end();

  return result;
};

co.wrap(run)('#main .searchCenterMiddle li a')
  .then(function(result) {
    console.log(result);
  }, function(err) {
    console.log(err);
  });
