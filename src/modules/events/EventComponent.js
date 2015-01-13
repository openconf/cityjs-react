var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");

module.exports = React.createClass({
  mixins: [Navigation, ContextMixin],
  displayName: "EventComponent",
  render: function () {
    return (
      <div >
      	<div>BACKGROUND</div>
        <div>DATE</div>
        <div>NAME</div>
        <div>LOGO</div>
        <div>DESCRIPTION</div>
      </div>
    );
  }
});