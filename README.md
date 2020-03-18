# monkeyify
Monkey patch factory

## API
**By monkeyify the atob function let atob support base64 url**
```javascript
window.atob = monkeyify(window.atob, {

// bind a caller, the default is the caller when the monkeyify function is called
  caller: window,

  // true(To monkeyify a monkeyifyed function is allowed)
  // 'return old monkey'(Return the first monkeyifyed function when you want to monkeyify a monkeyifyed function)
  allowMonkeyInMonkey: 'return old monkey';

  // monkey patch function. caller, args array and the original function
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
