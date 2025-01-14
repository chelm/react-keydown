(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../lib/listeners'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../lib/listeners'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.listeners);
    global.method_decorator = mod.exports;
  }
})(this, function (exports, module, _libListeners) {
  /**
   * @module methodWrapper
   *
   */
  'use strict';

  /**
   * methodWrapper
   *
   * @access public
   * @param {object} args All arguments necessary for wrapping method
   * @param {object} args.target The decorated class
   * @param {object} args.descriptor Method descriptor
   * @param {array} args.keys The array of keys bound to the given method
   * @return {object} The method descriptor
   */
  function methodWrapper(_ref) {
    var target = _ref.target;
    var descriptor = _ref.descriptor;
    var keys = _ref.keys;

    // if we haven't already created a binding for this class (via another
    // decorated method), wrap these lifecycle methods.
    if (!(0, _libListeners.getBinding)(target)) {
      (function () {
        var componentDidMount = target.componentDidMount;
        var componentWillUnmount = target.componentWillUnmount;

        target.componentDidMount = function () {
          (0, _libListeners.onMount)(this);
          if (componentDidMount) return componentDidMount.call(this);
        };

        target.componentWillUnmount = function () {
          (0, _libListeners.onUnmount)(this);
          if (componentWillUnmount) return componentWillUnmount.call(this);
        };
      })();
    }

    // add this binding of keys and method to the target's bindings
    (0, _libListeners.setBinding)({ keys: keys, target: target, fn: descriptor.value });

    return descriptor;
  }

  module.exports = methodWrapper;
});