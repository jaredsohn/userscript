// ==UserScript==
// @name Google Calendar Day-of-Year
// @author Stephen Paul Weber
// @namespace http://singpolyma.net/
// @version 0.1
// @description Displays days of year in Google Calendar
// @include http://*.google.*/calendar*
// ==/UserScript==

if(typeof(unsafeWindow) == 'undefined') {
	this.unsafeWindow = window;
}

Date.prototype.getDOY = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((this - onejan) / 86400000);
}

function month_number(s) {
	var months = [/Jan/i, /Feb/i, /Mar/i, /Apr/i, /May/i, /Jun/i, /Jul/i, /Aug/i, /Sept/i, /Oct/i, /Nov/i, /Dec/i];
	for(var i in months) {
		if((''+s).match(months[i])) return i;
	}
	return NaN;
}

var lock = false;
function init() {
	if(lock) return;
	lock = true;
	var days = document.getElementsByClassName('st-dtitle');
	var month = document.getElementById('dateunderlay');
	if(days.length < 1 || !month) {
		setTimeout(init, 1000);
		return;
	}
	var year = month.textContent.match(/\d+/);
	month = month_number(month.textContent.match(/^\S+/));
	for(var i = 0; i < days.length; i++) {
		if(days[i].className.match(/nonmonth/)) continue;
		var day = days[i].textContent.match(/\d+/);
		var dt = new Date(year, month, day);
		days[i].textContent = day + ' (' + dt.getDOY() + ')';
	}
	lock = false;
}

unsafeWindow.addEventListener('DOMNodeInserted', init, false);
