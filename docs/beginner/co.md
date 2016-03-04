# Using `co`

[`co`](https://github.com/tj/co) is a flow library allowing for non-blocking code.  With Nightmare, you can use it to `yield` call chains.  Consider the Yahoo example:

```js
var Nightmare = require('nightmare'),
  co = require('co'),
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

co(run).then(function(result){
  console.log(result);
}, function(err){
  console.log(err);
});
```

Nightmare internally (partially) implements promises by exposing `.then()`.  This allows it to be `yield`able for use under `co`.

## Parameters
Parameters in `co` are most easily dealt with by using `co.wrap()`.  The following example is the same as above, with the selector for the link `href` passed in.  This also shows how to pass parameters from the parent Nightmare process to the child Electron process through `.evaluate()`:

```js
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
```

## References
- [co](https://github.com/tj/co)
- [Original Yahoo example](https://github.com/segmentio/nightmare#examples)
- [Runnable `co` examples](https://github.com/rosshinkley/nightmare-examples/examples/beginner/co)
- [MDN `function*` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [MDN `yield` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)
