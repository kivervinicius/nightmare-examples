# `then...catch`
The internal `.then()` method to Nightmare does not work precisely like native Promise `.then()`, instead _always_ opting to take the success and rejection callback for the promise.  This was probably done in an effort to ensure `vo`, `co`, and possibly `mocha-generators` would work nicely with Nightmare.

Consider the following example:

```js
var Nightmare = require('nightmare'),
    vo = require('vo');

function * run() {
    var nightmare = new Nightmare({
        show: false,
    });

    yield nightmare
        .goto('http://example.com')
        .wait('body')
        .evaluate(function(){
            throw new Error('uh oh');
        });

    yield nightmare.end();
}

vo(run)(function(err) {
    if (err) {
        console.dir(err);
    }
    console.log('done');
});
```

Out of the box, `vo` runs the promise and passes internal methods to `fulfill` and `reject` as prescribed by [the native promise documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).  If you remove the `.catch()` call from Nightmare under `.then()`, the above example will not work with neither `vo` nor `co`.

Unfortunately, the current implementation means that a `.catch()` call for a promise chain using Nightmare will not work.  Consider:

```js
var Nightmare = require('nightmare'),
var nightmare = Nightmare();
nightmare
  .goto('http://example.com')
  .wait('body')
  .evaluate(function() {
    throw new Error('uh oh');
  }).then(function(){
    console.log('done');
  }).catch(function(err){
    console.dir(err);
  });
```

The `.catch()` call will never be executed under the current implementation.

## Solution
Although no PR has been submitted, @rosshinkley put together [a proposed solution](https://github.com/rosshinkley/nightmare/blob/527/lib/nightmare.js#L321-L343).

## References
- [Nightmare #527](https://github.com/segmentio/nightmare/issues/527) - discusses how `.then()` in Nightmare doesn't exactly match Promise's `.then()`
- [MDN Promise documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
