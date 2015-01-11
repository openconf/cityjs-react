var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var ContextMixin = require("../../lib/grailjs/ContextMixin");
var PromisePiper = require("../../lib/grailjs/PromisePiper");

module.exports = React.createClass({
  mixins: [Navigation, ContextMixin],
  displayName: "AppComponent",
  render: function () {
    return (
      <div className="container">
        
      </div>
    );
  }
});
