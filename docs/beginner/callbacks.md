# Callbacks

> **WARNING:** This functionality is not directly supported.  Use at your own risk.

Using `.run()`, plain callbacks can be used to control Nightmare:

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
  .run(function(error, result) {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
```

## References
- [Runnable callback examples](https://github.com/rosshinkley/nightmare-examples/tree/master/examples/beginner/callbacks)
- [Nightmare #516](https://github.com/segmentio/nightmare/issues/516) - much of the content here was borrowed from [@Mr0grog](https://github.com/Mr0grog)'s excellent explanation.
