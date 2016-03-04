var Nightmare = require('nightmare'),
  vo = require('vo'),
  nightmare = Nightmare({
    show: true
  });

var run = function*(selector){
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

vo(run)('#main .searchCenterMiddle li a', function(err, result){
  console.log(result);
})
