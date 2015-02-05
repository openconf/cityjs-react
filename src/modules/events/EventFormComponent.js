var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");
var CalendarComponent = require('../calendar/CalendarComponent')(dayItem);
var moment = require('moment');


function dayItem(day){
  // TODO: performance degradation
  if(this.props.events){
    var dayEvents = this.props.events.reduce(function(events, event){
      if(day.isSame(moment(event.date).startOf('day'))) events.push(event);
      return events;
    },[]);
  }
  return <div>
    <span className="date">
      {day.date()}
    </span>
    {dayEvents.map(function(event){
      return <div className="event text-right">{event.name}</div>
    })}
  </div>
}

function formErrors(errors){
  if(!errors) return;
  if(Array.isArray(errors)) {
    return <ul>
          {errors.map(function(error){
            return <li>{error.message}</li>
          })}
        </ul>
  }
  if(errors.message){
    return <ul>
        <li>{errors.message}</li>
      </ul>
  }
}

module.exports = React.createClass({
  displayName: "EventFormComponent",
  mixins: [ require("../../../lib/grailjs/LinkDataStateMixin"),  Navigation, ContextMixin],
  getInitialState: function(){
    var state = this.context.stores.EventFormStore.get();
    state.events = this.context.stores.EventsStore.get();
    return state;
  },
  componentDidMount: function() {
    this.context.stores.EventFormStore.on('change', this.change);
    this.context.stores.EventsStore.on('change', this.change);
  },    
  change: function(){
    if(!this.isMounted()) return;
    var state = this.context.stores.EventFormStore.get();
    state.events = this.context.stores.EventsStore.get();    
    this.replaceState(state);
  },
  submit: function(){
    this.context.doAction('submit:newEvent', this.state.data);
  },
  render: function () {

    return (
      <form className="User">
        {formErrors(this.state.errors)}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" valueLink={this.linkDataState('name')} placeholder="name" />
        </div>        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" name="description" className="form-control" valueLink={this.linkDataState('description')} placeholder="description" />
        </div>           
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <CalendarComponent valueLink={this.linkDataState('date')} events={this.state.events}/>
        </div>                  
        
        <input type="button" className="btn btn-default" value="Create" onClick={this.submit}/>
      </form>
    );
  }
});