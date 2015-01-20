var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");
var Calendar = require("./Calendar");
var moment = require('moment');
require('./calendar-component.scss');


module.exports = React.createClass({
  mixins: [Navigation, ContextMixin],
  displayName: "EventComponent",
  getInitialState: function(){
  	return {focusedDay: this.props.value 
  		 || (this.props.valueLink && this.props.valueLink.value) 
  		 || moment().startOf('day')}
  },
  focusDay : function(evt){
  	var newDay = evt.target.getAttribute('data-date');
  	if(!newDay) return;
  	this.setState({focusedDay:moment(newDay)});
  	if(this.props.valueLink) this.props.valueLink.requestChange(moment(newDay));
  },
  nextMonth: function(){
  	this.setState({focusedDay: this.state.focusedDay.add(1, 'months')});
  },
  prevMonth: function(){
  	this.setState({focusedDay: this.state.focusedDay.subtract(1, 'months')});
  },  
  render: function () {
  	var days = Calendar.getMonthDays(this.state.focusedDay);
    return (
    	<div className = "calendar-component">
    		<h4 className="text-center">
    			<a onClick={this.prevMonth} className="left-chevron">
	    			
    			</a>
    			{moment.months()[this.state.focusedDay.month()]}
    			<a onClick={this.nextMonth}  className="right-chevron">
    				
    			</a>
    		</h4>
    		{[0,1,2,3,4,5,6].map(weekDays)}
	      <div>
	      	{days.map(dayItem.bind(this))}
	      </div>
      </div>
    );
  }
});

function weekDays(i){
	return <div className="month-day text-center">{moment.weekdaysShort(i)}</div>
}

function dayItem(day){
	var className = "day month-day";
	if(this.state.focusedDay.month() != day.month()) className+= " other-month";
	if(this.state.focusedDay.isSame(day)) className+= " focused";
	return <div className={className} data-date={day.toString()} onClick={this.focusDay}>
	{day.date()}
	</div>
}
