// ==UserScript==
// @name           Team Salary
// @namespace      http://goallinebliz.com
// @description    Adds a team's total salary and daily salary costs to the Team Roster page
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// ==/UserScript==

Number.prototype.formatMoney = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "." : d, t = t == undefined ? "," : t, s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function getSalaries() {
	// get player salaries //
	var salaryEls = document.getElementsByClassName('player_salary');
	var salaryTotal = 0;
	for (var i = 0; i < salaryEls.length; i++) {
		salaryTotal += parseInt(salaryEls[i].innerHTML.replace('$', '').replace(',', ''), 10);
	}
	
	return salaryTotal;
}

function printSalaries() {
	var teamSalary = getSalaries();
	
	// get the starting location //
	var roster_title = document.getElementsByClassName('medium_head')[0];
	
	var div = document.createElement('div');
	div.className = 'small_head';
	div.innerHTML = 'Team Salary: $' + teamSalary.formatMoney() + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Daily Salary: $' + (getSalaries() / 40).formatMoney();
	
	roster_title.parentNode.insertBefore(div, roster_title);
}

var fn = function() {
	printSalaries();
}

window.setTimeout(fn, 1);