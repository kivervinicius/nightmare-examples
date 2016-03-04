# Using Promises
Native promises are the preferred method for using Nightmare.

```js
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
  .end()
  .then(function(result) {
    console.log(result);
  })
```

## Running multiple steps
Promises are useful for chaining multiple steps together using `.then()`.  Say we wanted to modify the Yahoo example to get the first link from the first _and_ second result page:

```js
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
  });
```

Note that the Nightmare instance is getting returned.  Again, Nightmare exposes an internally defined version of `.then()` that can be leveraged to get the desired behavior.

## References
- [Runnable `Promise` examples](https://github.com/rosshinkley/nightmare-examples/examples/beginner/promises)
- [`then...catch` issues](https://github/com/rosshinkley/nightmare-examples/docs/known-ssues/then-catch.md)
- [Original Yahoo example](https://github.com/segmentio/nightmare#examples)
- [MDN Promise documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
