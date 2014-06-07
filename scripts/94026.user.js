// ==UserScript==
// @name           Virus
// @namespace      http://lockerzelites.cz.cc
// @description    This bad boy will give you a virus that finds more viruses on the internet and downloads those viruses.
// @include        lockerz.com/auction*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
function timer_tick() {
	var theTimer = $('#details > .time').text();
	if (theTimer == 'Time remaining:0:00:05') {
		$('#details > .bid-btn').click();
	} else {
		window.setTimeout(timer_tick, 500);
	}
}
window.setTimeout(timer_tick, 500);