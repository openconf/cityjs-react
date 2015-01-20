var moment = require('moment');

function _getDaysByBounds(start, end){
	var currentDay = start.clone();
	var month = [];

  while (currentDay < end) {
    month.push(currentDay.clone());
    currentDay.add(1, 'd');
  }
  return month;
}

function getMonthDays(d){
	var firstOfMonth = d.clone().startOf('month');
  var lastOfMonth = d.clone().endOf('month');
  return getDaysByBounds(firstOfMonth, lastOfMonth);
}

function getMonthDaysWeekFull(d){
	var firstOfMonthWeekFull = d.clone().startOf('month').startOf('week');
  var lastOfMonthWeekFull = d.clone().endOf('month').endOf('week');
  return getDaysByBounds(firstOfMonthWeekFull, lastOfMonthWeekFull);
}

module.exports = {
	getMonthDays: getMonthDaysWeekFull
}


function getDaysByBounds( first, last ){
    if (!getDaysByBounds.cache) {
        getDaysByBounds.cache = {};
    }
    var param = [first.toString(),last.toString()].join("&&")
    if (!getDaysByBounds.cache[param]) {
        var result = _getDaysByBounds.apply(this, arguments); //custom function
        getDaysByBounds.cache[param] = result;
    }
    return getDaysByBounds.cache[param];
}