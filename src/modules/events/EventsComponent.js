var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");

module.exports = React.createClass({
  mixins: [Navigation, ContextMixin],
  displayName: "EventsComponent",
  render: function () {
    return (
      <div >
        Events-b
      </div>
    );
  }
});