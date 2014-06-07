// ==UserScript==
// @name			Rise of Europe Gametime
// @author			Astinox
// @version			1.0
// @namespace		http://fabito.net/scripts/
// @description		Script which outputs the current game time of Rise of Europe
// @include			http://s1.riseofeurope.com/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	var timer = '.top-center'

	var generateDate = function() {
		var date = new Date();
		date.setTime(date.getTime() + (120 * 1000 * 60));

		if(date.getUTCHours() < 9) {
			var hours = "0" + date.getUTCHours();
		} else {
			var hours = date.getUTCHours();
		}
		if(date.getUTCMinutes() < 9) {
			var minutes = "0" + date.getUTCMinutes();
		} else {
			var minutes = date.getUTCMinutes();
		}
		if(date.getUTCSeconds() < 9) {
			var seconds = "0" + date.getUTCSeconds();
		} else {
			var seconds = date.getUTCSeconds();
		}
		$(timer).html('<div id="gametimer" style="color:#fff;padding-top:6px;"> ' + date.getUTCDate() + '.' + date.getUTCMonth() + '.' + date.getUTCFullYear() + ' ' + hours + ':' + minutes + ':' + seconds + '</div>');
	};
	setInterval(generateDate, 1000);
});