var Nightmare = require('nightmare'),
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
  .then(function(result) {
    console.log(result);
  })
  .then(function() {
    return nightmare
      .click('.next')
      .evaluate(function() {
        return document.querySelector('#main .searchCenterMiddle li a')
          .href;
      })
  })
  .then(function(result) {
    console.log(result);
    return nightmare.end();
  })
  .then(function() {
    console.log('done');
  })
  .catch(function(error){
    console.error('an error has occurred: ' + error);
  });
