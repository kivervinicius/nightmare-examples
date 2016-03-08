var Nightmare = require('nightmare'),
  co = require('co'),
  nightmare = Nightmare({
    show: true
  });

nightmare
  .goto('http://yahoo.com')
  .type('input[title="Search"]', 'github nightmare')
  .click('#uh-search-button')
  .wait('#main')
  .evaluate(function() {
    return document.querySelector('#main .searchCenterMiddle li a')
      .href;
  })
  .end()
  .run(function(error, result) {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
