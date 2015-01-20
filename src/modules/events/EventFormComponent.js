var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");
var CalendarComponent = require('../calendar/CalendarComponent');
var moment = require('moment');

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
    var errors = this.state.errors && <ul>
          {this.state.errors.map(function(error){
            return <li>{error.varName} - {error.type}</li>
          })}
        </ul>;
    return (
      <form className="User">
        {errors}
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