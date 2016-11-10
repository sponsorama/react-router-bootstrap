'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContextUtils = require('react-router/lib/ContextUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // This is largely taken from react-router/lib/Link.

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function createLocationDescriptor(to, query, hash, state) {
  if (query || hash || state) {
    return { pathname: to, query: query, hash: hash, state: state };
  }

  return to;
}

var propTypes = {
  onlyActiveOnIndex: _react2.default.PropTypes.bool.isRequired,
  to: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]).isRequired,
  query: _react2.default.PropTypes.string,
  hash: _react2.default.PropTypes.string,
  state: _react2.default.PropTypes.object,
  action: _react2.default.PropTypes.oneOf(['push', 'replace']).isRequired,
  onClick: _react2.default.PropTypes.func,
  active: _react2.default.PropTypes.bool,
  target: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node.isRequired
};

var contextTypes = {
  router: _react2.default.PropTypes.object
};

var defaultProps = {
  onlyActiveOnIndex: false,
  action: 'push'
};

var LinkContainer = _react2.default.createClass({
  displayName: 'LinkContainer',
  // eslint-disable-line react/prefer-es6-class
  propTypes: propTypes,
  contextTypes: contextTypes,
  mixins: [(0, _ContextUtils.ContextSubscriber)('router')], // eslint-disable-line new-cap
  getDefaultProps: function getDefaultProps() {
    return defaultProps;
  },

  onClick: function onClick(event) {
    var _props = this.props,
        to = _props.to,
        query = _props.query,
        hash = _props.hash,
        state = _props.state,
        children = _props.children,
        onClick = _props.onClick,
        target = _props.target,
        action = _props.action;


    if (children.props.onClick) {
      children.props.onClick(event);
    }

    if (onClick) {
      onClick(event);
    }

    if (target || event.defaultPrevented || isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    event.preventDefault();

    this.context.router[action](createLocationDescriptor(to, query, hash, state));
  },
  render: function render() {
    var router = this.context.router;

    var _props2 = this.props,
        onlyActiveOnIndex = _props2.onlyActiveOnIndex,
        to = _props2.to,
        children = _props2.children,
        props = _objectWithoutProperties(_props2, ['onlyActiveOnIndex', 'to', 'children']);

    props.onClick = this.onClick;

    // Ignore if rendered outside Router context; simplifies unit testing.
    if (router) {
      props.href = router.createHref(to);

      if (props.active == null) {
        props.active = router.isActive(to, onlyActiveOnIndex);
      }
    }

    return _react2.default.cloneElement(_react2.default.Children.only(children), props);
  }
});

exports.default = LinkContainer;
module.exports = exports['default'];