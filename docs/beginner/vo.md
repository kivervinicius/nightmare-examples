# Using `vo`

[`vo`](https://github.com/lapwinglabs/vo) is a small flow library.  With Nightmare, you can use it to `yield` call chains.  Consider the Yahoo example:

```js
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
});
```

Nightmare internally (partially) implements promises by exposing `.then()`.  This allows it to be `yield`able for use under `vo`.

## Parameters
Pass parameters before the `vo` callback.  The following example is the same as above, with the selector for the link `href` passed in.  This also shows how to pass parameters from the parent Nightmare process to the child Electron process through `.evaluate()`:

```js
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
});
```

## References
- [vo](https://github.com/lapwinglabs/vo)
- [Original Yahoo example](https://github.com/segmentio/nightmare#examples)
- [Runnable `vo` examples](https://github.com/rosshinkley/nightmare-examples/examples/beginner/vo)
- [MDN `function*` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [MDN `yield` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)
