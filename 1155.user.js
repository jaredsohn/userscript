// This has been tested very limitedly. I wrote this only because it was a request on the greasemonkey scripts wiki.
// I do not usually use LJ so if you run into any issues with it, please email me with as much detail as possible at zan.loy@gmail.com

// ==UserScript==
// @name		LiveJournal: time updater
// @version	1.0
// @namespace	http://antihero.cc/scripts/greasemonkey/
// @description	Sets a timer for every 10 seconds to update the time when you are adding a journal entry.
// @include	http://www.livejournal.com/update.bml
// ==/UserScript==

( function() {
	var interval = 10000;
	
	function update_time() {
		var d = new Date();
		
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var year = d.getFullYear();
		
		var hour = d.getHours();
		var min = d.getMinutes();
		
		document.updateForm.date_ymd_mm.value = month;
		document.updateForm.date_ymd_dd.value = day;
		document.updateForm.date_ymd_yyyy.value = year;
		document.updateForm.hour.value = hour;
		document.updateForm.min.value = min;
	}
	
	setInterval(update_time, interval);
})();