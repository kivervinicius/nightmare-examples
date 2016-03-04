var Nightmare = require('nightmare'),
  vo = require('vo'),
  nightmare = Nightmare({
    show: true
  });

var run = function*(){
  var result = yield nightmare
  .goto('http://yahoo.com')
  .type('input[title="Search"]', 'github nightmare')
  .click('#uh-search-button')
  .wait('#main')
  .evaluate(function() {
    return document.querySelector('#main .searchCenterMiddle li a')
      .href;
  });

  yield nightmare.end();

  return result;
};

vo(run)(function(err, result){
  console.log(result);
})
