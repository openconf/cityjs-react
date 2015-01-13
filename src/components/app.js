var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var ContextMixin = require("../../lib/grailjs/ContextMixin");
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({
  mixins: [Navigation, ContextMixin],
  displayName: "AppComponent",
  render: function () {
    return (
      <DocumentTitle title={'CityJs'}>
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand" >CityJs</Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/events" className="navbar-brand">Events</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <RouteHandler/>
      </div>
      </DocumentTitle>
    );
  }
});
