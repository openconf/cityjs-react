var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");
var Calendar = require("./Calendar");
var moment = require('moment');
require('./calendar-component.scss');


module.exports = function(dayItemTemplate){
	dayItemTemplate = dayItemTemplate || function(day){return <span>{day.date()}</span>}
	return React.createClass({
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
	  	var weeksToShow = Array.apply(null, {length: days.length/7}).map(Number.call, Number)
	    return (
	    	<div className = "calendar-component">
	    		<h4 className="text-center">
	    			<a onClick={this.prevMonth} className="left-chevron">
		    			
	    			</a>
	    			{moment.months()[this.state.focusedDay.month()]}
	    			<a onClick={this.nextMonth}  className="right-chevron">
	    				
	    			</a>
	    		</h4>
	    		<table>
	    			<thead><tr>{[0,1,2,3,4,5,6].map(weekDays)}</tr></thead>
		      	<tbody>
		      	{weeksToShow.map(function renderWeek(weekNum){
		      		var start = (weekNum - 1)*7;
		      		return <tr>
		      			{days.slice(start, start + 7).map(dayItem.bind(this))}
		      		</tr>
						}.bind(this))}
						</tbody>
		      </table>
	      </div>
	    );
	  }
	});




	function weekDays(i){
		console.log(moment.weekdaysShort(i), i)
		return <th className="month-day text-center">{moment.weekdaysShort(i)}</th>
	}

	function dayItem(day){
		var className = "day month-day";
		if(this.state.focusedDay.month() != day.month()) className+= " other-month";
		if(this.state.focusedDay.isSame(day)) className+= " focused";

		return <td className={className} data-date={day.toString()} onClick={this.focusDay}>
		{dayItemTemplate.bind(this)(day)}
		</td>
	}

	
}