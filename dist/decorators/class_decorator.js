(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react', '../lib/listeners'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'), require('../lib/listeners'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React, global.listeners);
    global.class_decorator = mod.exports;
  }
})(this, function (exports, module, _react, _libListeners) {
  /**
   * @module componentWrapper
   *
   */
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  /**
   * componentWrapper
   *
   * @access public
   * @param {object} WrappedComponent React component class to be wrapped
   * @param {array} [keys] The key(s) bound to the class
   * @return {object} The higher-order function that wraps the decorated class
   */
  function componentWrapper(WrappedComponent) {
    var keys = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var KeyBoardHelper = (function (_React$Component) {
      _inherits(KeyBoardHelper, _React$Component);

      function KeyBoardHelper(props) {
        _classCallCheck(this, KeyBoardHelper);

        _get(Object.getPrototypeOf(KeyBoardHelper.prototype), 'constructor', this).call(this, props);
        this.state = {
          event: null
        };
      }

      _createClass(KeyBoardHelper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          (0, _libListeners.onMount)(this);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          (0, _libListeners.onUnmount)(this);
        }
      }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
          var _this = this;

          // to simulate a keypress, set the event and then clear it in the callback
          this.setState({ event: event }, function () {
            return _this.setState({ event: null });
          });
        }
      }, {
        key: 'render',
        value: function render() {
          return _React['default'].createElement(WrappedComponent, _extends({}, this.props, { keydown: this.state }));
        }
      }]);

      return KeyBoardHelper;
    })(_React['default'].Component);

    (0, _libListeners.setBinding)({ keys: keys, fn: KeyBoardHelper.prototype.handleKeyDown, target: KeyBoardHelper.prototype });

    return KeyBoardHelper;
  }

  module.exports = componentWrapper;
});