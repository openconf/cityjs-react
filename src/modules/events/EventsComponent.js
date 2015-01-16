var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");
var DocumentTitle = require('react-document-title');
var moment = require('moment');

require('./events-component.scss');

module.exports = React.createClass({
  mixins: [Navigation, ContextMixin],
  displayName: "EventsComponent",
  getInitialState: function(){
    return {events: this.context.stores.EventsStore.get()};
  },
  componentDidMount: function() {
    this.context.stores.EventsStore.on('change', this.onEventsChage);
  },
  onEventsChage: function(events){
    if(!this.isMounted()) return;
    this.setState({events:events});
  },  
  render: function () {
    return (
    	<DocumentTitle title = {'Events: CityJs'}>
        <ul className="list-unstyled events-component">
          {this.state.events.map(EventItem)}
        </ul>
      </DocumentTitle>
    );
  }
});

function EventItem(event){
  return  (<li >
      <div className="row event-item">
        <div className="col-sm-2 event-logo">
          <img src={event.logo} className="face" alt={event.name}/> 
        </div>
        <div className="col-sm-4 event-details">
          <h3 className="mui-font-style-subhead-1">{event.name}</h3>
          <h4 className="mui-font-style-subhead-1">{moment(event.date).format('DD MMM YYYY')}</h4>
          <p>{event.description}</p>
        </div>
      </div>
      
      
    </li>);
          
}