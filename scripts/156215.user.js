// ==UserScript==
// @name        League of Legends Tribunal Remove Stuff
// @namespace   LoLTRT
// @description Removes the timer, sometimes the first case is more then enough
// @include     http://*.leagueoflegends.com/tribunal/*/review*
// @include     http://*.leagueoflegends.com/tribunal/*/guidelines*
// @include     http://*.leagueoflegends.com/tribunal/*/finished*
// @version     1.0.4
// @require     http://keith-wood.name/js/jquery.countdown.js
// @grant       none
// ==/UserScript==

var getBody = document.getElementsByTagName("body")[0];
function calcTime(offset) {
	d = new Date();
	utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	nd = new Date(utc + (3600000*offset));
	return nd;
}
getBody.onload = function () {
	$.each($('#clock'), function(index, value) {
		value.innerHTML = 0;
	});
	$.each($('#guidelines_buttons'), function(index, value) {
		value.children[1].click();
	});
	$.each($('#finished_info_text > p'), function(index, value) {
		var offset = -8;
		var d = calcTime(offset);
		var year = d.getFullYear(); var month = d.getMonth(); var day = d.getDate();
		$(value).countdown({
			until: new Date(year,month,day+1),
			timezone: -8,
			layout: 'Vote again in <b>{hnn}{sep}{mnn}{sep}{snn}</b>'
			});
	});
}