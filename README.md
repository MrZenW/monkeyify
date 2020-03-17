# monkeyify
Monkey patch factory

## API
**By monkeyify the atob function let atob support base64 url**
```javascript
window.atob = monkeyify(window.atob, {
  caller: {name: 'I am the caller, I will be given in the first argument in monkey function'},
  allowMonkeyInMonkey: 'return old monkey'; // true or 'return old monkey'
  monkey: function (caller, args, original) {
    var base64url = args[0];
    var d = 4 - base64url.length % 4;
    while (d-->0) {
      base64url += '=';
    }
    args[0] = base64url
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    return original.apply(caller, args);
  }
});
// or
window.atob = monkeyify(window.atob, function () {
// your code
});
```
