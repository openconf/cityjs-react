var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({
  mixins: [Navigation, ContextMixin],
  displayName: "EventsComponent",
  render: function () {
    return (
    	<DocumentTitle title = {'Events: CityJs'}>
	      <div >
	        <div>DATE</div>
	        <div>NAME</div>
	        <div>LOGO</div>
	        <div>DESCRIPTION</div>
	      </div>
      </DocumentTitle>
    );
  }
});