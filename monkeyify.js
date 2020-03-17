/* ZenWANG@zenw.org 12/Mar/2020 */
;
(function (global, factory) {
  var monkeyify = factory();
  if (typeof exports === 'object' && typeof module !== 'undefined') module.exports = monkeyify;
  if (typeof define === 'function' && define.amd) define([], function MonkeyifyAMDModuleFactory() {
    return monkeyify;
  });
  if (typeof define === 'function' && define.cmd) define(function  MonkeyifyCMDModuleFactory(cmdRequire, cmdExports, cmdModule) {
    cmdModule.exports = monkeyify;
  });
  global = global || self, global.monkeyify = monkeyify;
  if ('undefined' !== typeof window) window.monkeyify = monkeyify;
})(this, function MonkeyifyDefinition() {
  'use strict';

  function _isFunction(func) {
    return 'function' === typeof func;
  }

  function _parseValueForAllowMonkeyInMonkey(value) {
    return ('' + value).replace(/\s/g, '').toLowerCase();
  }

  var KEY__MONKEY_MARK = 'I am a monkey ⊂((≧⊥≦))⊃～';
  var VALUE__RETURN_OLD_MONKEY = _parseValueForAllowMonkeyInMonkey('return old monkey');

  var KEY__ALLOW_MONKEY_IN_MONKEY = 'allowMonkeyInMonkey';

  function monkeyify(originalFunction, patchOpt) {
    if (!_isFunction(originalFunction)) throw new Error('Cannot monkeyify a non-function variable! ⊂((≧⊥≦))⊃～');
    if ('function' === typeof patchOpt) patchOpt = { monkey: patchOpt };
    var hasCaller = Object.prototype.hasOwnProperty.call(patchOpt, 'caller');
    var _patchFunc = patchOpt.monkey;
    var _allowMonkeyInMonkey = patchOpt[KEY__ALLOW_MONKEY_IN_MONKEY];
    var generation = parseInt(originalFunction[KEY__MONKEY_MARK], 10) || 0;
    var isMonkey = generation > 0;
    if (isMonkey) {
      if (_parseValueForAllowMonkeyInMonkey(_allowMonkeyInMonkey) === VALUE__RETURN_OLD_MONKEY) return originalFunction;
      if (_allowMonkeyInMonkey !== true) throw new Error('Cannot put a monkey into another monkey if without allowMonkeyInMonkey argument! ⊂((≧⊥≦))⊃～');
    }

    function monkeyFunction() {
      var thisWhenCallMonkey = this;
      var _caller = hasCaller ? patchOpt.caller : thisWhenCallMonkey;
      return _patchFunc.call(
        _caller,
        _caller, Array.prototype.slice.call(arguments), originalFunction, generation,
      );
    }
    monkeyFunction[KEY__MONKEY_MARK] = generation + 1;
    return monkeyFunction;
  }
  monkeyify.KEY__MONKEY_MARK = KEY__MONKEY_MARK;
  monkeyify.VALUE__RETURN_OLD_MONKEY = VALUE__RETURN_OLD_MONKEY;
  
  return monkeyify;
});
